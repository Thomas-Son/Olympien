import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer>
            <div className={styles.footer}>
                <p>Olympien</p>
                <div className={styles.link}>
                    <FontAwesomeIcon icon={faTwitter} style={{ color: "#6bd3ff", }} />
                    <FontAwesomeIcon icon={faFacebook} style={{ color: "#14346c", }} />
                </div>                
                <p>By Thomas Son - 2023</p>
            </div>
        </footer>
    )
}

export default Footer