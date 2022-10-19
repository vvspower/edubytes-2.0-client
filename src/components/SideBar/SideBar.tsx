import React from 'react'
import styles from './sidebar.module.sass'
import LeftBar from '../LeftBar/LeftBar'
import Rightbar from '../RightBar/RightBar'


const SideBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <LeftBar />
            </div>
            <div className={styles.right}>
                <Rightbar />
            </div>
        </div>
    )
}

export default SideBar