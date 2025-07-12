import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { formFields } from './Fields.js';
import { coffee } from '../../../../services/data.services';
import Socials from './Socials.js';

const ContactForm = () => {
    const initialFormData = formFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            await coffee(formData);
            setSubmissionStatus('success');
            setFormData(initialFormData);
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
        // Clear submission status after a delay
        setTimeout(() => {
            setSubmissionStatus(null); // Clear status after a while    
        }, 3000); // Clear status after 3 seconds
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Let's Connect.</h2>
            <p className={styles.sectionSubtitle}>
                Have a question/suggestion, or just want to say hi?
            </p>
            <div className={styles.container}>

                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div className={styles.formGroup} key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={field.rows}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                    style={{ resize: 'none' }}
                                ></textarea>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submissionStatus === 'success' && (
                        <p className={styles.submissionSuccess}>
                            Message sent successfully! I'll get back to you soon.
                        </p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className={styles.submissionError}>
                            Oops! Something went wrong. Please try again.
                        </p>
                    )}
                </form>

                <Socials />

                <div className={styles.contactIllustration}>
                    <svg
                        className={styles.abstractLineArt}
                        width="100%"
                        height="100%"
                        viewBox="0 0 200 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 50 C 40 20, 160 20, 190 50 S 160 80, 10 80"
                            stroke="#00FFC0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="100" cy="50" r="5" fill="#00FFC0" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
