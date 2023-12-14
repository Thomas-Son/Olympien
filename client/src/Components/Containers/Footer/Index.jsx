import React from 'react'

import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer>
            <div className={styles.footer}>
                <p>Olympien</p>
                <p>twitter facebook</p>
                <p>By Thomas Son - 2023</p>
            </div>
        </footer>
    )
}

export default Footer