import React, { useEffect, useState } from 'react'
import styles from './notifications.module.sass'
import notif from '../../assets/notif.png'
import example_pfp from '../../assets/example_pfp.jpg'
import { AxiosResponse } from 'axios'
import { NotificationsResponse } from '../../ApiManager/interface/Interfaces'
import { INotification } from '../../ApiManager/interface/Interfaces'
import Notification from '../../ApiManager/api/events'

// todo: process api


const Notifications = () => {
    const [notifs, setNotifs] = useState<INotification[]>([])
    const notificationsApi = new Notification()

    const getNotifications = async () => {
        const response: AxiosResponse<NotificationsResponse> = await notificationsApi.getNotifications()
        setNotifs(response.data.data)
    }


    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <div className={styles.head}>
                    <p>Notifications</p>

                </div>
                <div>
                    {notifs.map((item, i) => {
                        return <div className={styles.notif}>
                            <img src={item.from.pfp} />
                            <p>{item.content}</p>
                        </div>
                    })}
                </div>
            </main>
        </div>
    )
}

export default Notifications