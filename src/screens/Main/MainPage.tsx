import React from 'react'
import styles from './mainpage.module.sass'
import wave from '../../assets/wave.png'

const MainPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.forum}>
                <div>
                    <h1>Find your  Community</h1>
                    <img src={wave} />
                </div>
                <div className={styles.post}>
                    <p>post</p>

                </div>

            </div>
        </div>
    )
}

export default MainPage