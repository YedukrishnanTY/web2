export const formFields = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'John Cena', // Updated placeholder for consistency
        required: true,
    },
    // {
    //     label: 'Email',
    //     name: 'email',
    //     type: 'email',
    //     placeholder: 'you@cant-see.me',
    //     required: true,
    // },
    {
        label: 'Subject',
        name: 'subject',
        type: 'text',
        placeholder: 'lets have a coffee',
        required: true, // Added required for subject as per previous design
    },
    {
        label: 'Message',
        name: 'message',
        type: 'textarea', // Custom type for textarea
        placeholder: 'Tell me everything...',
        rows: 6, // Added rows for textarea
        required: false, // Message is optional
    },
];
