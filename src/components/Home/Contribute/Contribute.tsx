import React from 'react'
import styles from './contribute.module.sass'


const Contribute = () => {
    return (
        <div className={styles.container}>
            <div>
                <h4>Contribute</h4>
            </div>
            <div>
                <p>Contribute by uploading resources and help out the community</p>
                <button>Go</button>
            </div>
        </div>
    )
}

export default Contribute