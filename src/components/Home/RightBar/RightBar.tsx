import React, { useState, useEffect } from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import styles from './rightbar.module.sass'
// import { useNavigate } from 'react-router-dom'
import { INotification, NotificationsResponse, ReturnedPlanner } from '../../../ApiManager/interface/Interfaces'
import GitHubIcon from '@mui/icons-material/GitHub';
import Notifications from '../../../ApiManager/api/events'
import pfp from "../../../assets/example_pfp.jpg"
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'



interface Props {
    planner: ReturnedPlanner[]
}

const RightBar = (props: Props) => {
    const [notifs, setnotifs] = useState<INotification[]>([])
    const notificationApi = new Notifications()

    const getLatestNotifications = async () => {
        const response: AxiosResponse<NotificationsResponse> = await notificationApi.getUnReadNotifications()
        setnotifs(response.data.data)
    }

    useEffect(() => {
        getLatestNotifications()
    }, [])

    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div >
                {props.planner.length === 0 ? <div className={styles.study_queue}>
                    <h3>Be on Track </h3>
                    <p>Orgranize your classes, assignments and study routines straight from here</p>
                    <button onClick={() => navigate("/calendar")} >Start</button>
                </div> : null}
                {props.planner.filter((item, i) => {
                    return item.type === "study" && new Date(item.due_date).getDate() === new Date().getDate()
                }).splice(0, 1).map((item, i) => {
                    return <div className={styles.planner}>
                        <h3>{item.title}</h3>
                        <p>{new Date(item.due_date).toDateString()}</p>
                        {<span>Current</span>}
                    </div>
                })}
                {props.planner.filter((item, i) => {
                    return item.type === "study" && new Date(item.due_date).getDate() > new Date().getDate()
                }).splice(0, 1).map((item, i) => {
                    return <div className={styles.planner}>
                        <h3>{item.title}</h3>
                        <p>{new Date(item.due_date).toDateString()}</p>
                        <span style={{ backgroundColor: "#d0ebff", color: "#4dabf7", border: "1px solid #a5d8ff" }}>Upcoming</span>
                    </div>
                })}
                {props.planner.length !== 0 ? <div className={styles.continue_planner}>
                    <p>View Upcoming, and rest on your schedule</p>
                    <button onClick={() => navigate("/calendar")}>Go</button>
                </div> : null}
            </div>
            {notifs.length !== 0 ? <div className={styles.notifications}>
                <p>Notifications</p>
                {notifs.slice(0, 4).map((item, i) => {
                    return <div onClick={() => navigate(item.redirect)} >
                        <img src={item.from.pfp} />
                        <h6>{item.content}</h6>
                    </div>
                })}
            </div> : null}
            <div className={styles.footer}>
                <a href='https://github.com/vvspower'>
                    <p>Website is in Beta. Follow for updates</p>
                    <GitHubIcon />
                </a>
            </div>

        </div >
    )
}

export default RightBar