import React from 'react'
import styles from './leftbar.module.sass'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import resource from '../../../assets/resource.png'
import university from '../../../assets/university.png'
import marketplace from '../../../assets/marketplace.png'
import friends from '../../../assets/friends.png'
import star from '../../../assets/star.png'






const LeftBar = () => {
    const user = useSelector((state: RootState) => state.user.value);

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <img src={user.details.pfp} />
                <p>{user.username}</p>
            </div>
            <div className={styles.menu}>
                <div className={styles.buttons}>
                    <button>
                        <img src={resource} />
                        <div>Browse Resources</div>
                    </button>
                    <button>
                        <img src={university} />
                        <div>Universities</div>
                    </button>
                    <button>
                        <img src={marketplace} />
                        <div>Marketplace</div>
                    </button>
                    <button>
                        <img src={friends} />
                        <div>Friends</div>
                    </button>
                    <button>
                        <img src={star} />
                        <div>Starred</div>
                    </button>
                </div>
            </div>
            <div>
                <p>suggested books here</p>
            </div>
        </div>
    )
}

export default LeftBar