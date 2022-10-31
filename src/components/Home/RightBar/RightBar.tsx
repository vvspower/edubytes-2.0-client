import React from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import styles from './rightbar.module.sass'


const RightBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notes}>
                <div className={styles.head}>
                    <h1>Marketplace</h1>

                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        <img src={example_pfp} />
                    </div>
                    <div className={styles.right}>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <img src={example_pfp} />
                            <span style={{ color: "#adb5bd", fontSize: "12px" }}>username</span>
                        </div>
                        <div>
                            <p>A Level Mathematics Notes (9709)</p>
                            <span>By:</span>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        <img src={example_pfp} />
                    </div>
                    <div className={styles.right}>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <img src={example_pfp} />
                            <span style={{ color: "#adb5bd", fontSize: "12px" }}>username</span>
                        </div>
                        <div>
                            <p>A Level Mathematics Notes (9709)</p>
                            <span>By:</span>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        <img src={example_pfp} />
                    </div>
                    <div className={styles.right}>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <img src={example_pfp} />
                            <span style={{ color: "#adb5bd", fontSize: "12px" }}>username</span>
                        </div>
                        <div>
                            <p>A Level Mathematics Notes (9709)</p>
                            <span>By:</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chats}>
                <h1>Active chats</h1>
                <div >
                    <img src={example_pfp} />
                    <p>username</p>
                </div>
                <div >
                    <img src={example_pfp} />
                    <p>username</p>
                </div>
                <div >
                    <img src={example_pfp} />
                    <p>username</p>
                </div>
            </div>

        </div >
    )
}

export default RightBar