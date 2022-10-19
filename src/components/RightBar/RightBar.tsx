import React from 'react'
import styles from './RightBar.module.sass'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Rightbar = () => {
    const logged_user = useSelector((state: RootState) => state.user.value);

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <div>
                    <img src={logged_user.details.pfp} />
                    <p>{logged_user.username}</p>
                    <p style={{ fontSize: "12px", color: "#868e96" }}>@{logged_user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Rightbar