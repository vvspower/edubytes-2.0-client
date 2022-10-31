import React from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import star from '../../../assets/star.png'

import styles from './notes.module.sass'

//? maybe make this its own component instead of putting it in createpostbar


const Notes = () => {
    return (
        <div className={styles.container}>
            <img src={example_pfp} />
            <div className={styles.main} >
                <div>
                    <p style={{ margin: "0px", color: "#69db7c" }}>Mathematics</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <img style={{ height: "12px", width: "12px", margin: "0px" }} src={star} />
                        <span style={{ margin: "0px" }}>4.7</span>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button>View</button>
                </div>
            </div>
        </div>
    )
}

export default Notes