// Socials.jsx
import styles from './ContactForm.module.css';

// Font Awesome React imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faInstagram,
    faSpotify,
    faDiscord,
    faSnapchatGhost,
    faSteam,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

const socials = [
    {
        href: 'https://twitter.com/yedukrishnan6',
        icon: faTwitter,
        class: 'twitter',
    },
    {
        href: 'https://www.instagram.com/yedu.k_/?hl=en',
        icon: faInstagram,
        class: 'instagram',
    },
    {
        href: 'https://open.spotify.com/user/gx8eagkmtma7rmcalju2o67d9?si=rb_0X-LsRIG_U9aIqFPQBw&utm_source=copy-link',
        icon: faSpotify,
        class: 'spotify',
    },
    {
        href: 'https://discord.com/users/Chandler._bing__#8780',
        icon: faDiscord,
        class: 'discord',
    },
    {
        href: 'https://github.com/YedukrishnanTY',
        icon: faGithub,
        class: 'github',
    },
    {
        href: 'https://www.snapchat.com/add/yedu.k?share_id=v3x_JoyzdtM&locale=en-US',
        icon: faSnapchatGhost,
        class: 'snapchat',
    },
    {
        href: 'https://steamcommunity.com/profiles/76561199139171757/',
        icon: faSteam,
        class: 'steam',
    },
];

export default function Socials() {
    return (
        <div className={styles.socialLinks}>
            <p>Find me elsewhere:</p>
            <div className={styles.socials}>
                {socials.map((social) => (
                    <div key={social.href} style={{zIndex: 2}}>
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles[social.class]} // ✅ Brand class goes here
                        >
                            <FontAwesomeIcon
                                icon={social.icon}
                                style={{ width: '50px' }}
                            />
                        </a>
                    </div>
                ))}

            </div>
        </div>
    );
}
