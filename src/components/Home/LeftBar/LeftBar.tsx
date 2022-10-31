import React from 'react'
import styles from './leftbar.module.sass'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import resource from '../../../assets/resource.png'
import university from '../../../assets/university.png'
import marketplace from '../../../assets/marketplace.png'
import friends from '../../../assets/friends.png'
import star from '../../../assets/star.png'
import book from '../../../assets/book.jpg'
import Rating from '@mui/material/Rating';


const LeftBar = () => {
    const user = useSelector((state: RootState) => state.user.value);

    return (
        <div className={styles.container}>
            <div>
                <div>
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
                                <div>Bazaar</div>
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
                </div>
                <div className={styles.suggested}>
                    <h1>Suggested resources for you</h1>
                    <div className={styles.book}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <img src={book} />
                            <div>
                                <h2>Cambridge International AS and A Level Physics Coursebook</h2>
                                <Rating
                                    name="simple-controlled"
                                    value={4}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* suggested notes will be here. according to users subjects  */}
            </div>
            <div className={styles.footer}>
                <p>EduBytes  &copy; 2022</p>
            </div>
        </div>
    )
}

export default LeftBar