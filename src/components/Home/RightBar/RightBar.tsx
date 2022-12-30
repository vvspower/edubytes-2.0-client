import React from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import styles from './rightbar.module.sass'
import { useNavigate } from 'react-router-dom'
import { ReturnedPlanner } from '../../../ApiManager/interface/Interfaces'
import GitHubIcon from '@mui/icons-material/GitHub';



interface Props {
    planner: ReturnedPlanner[]
}

const RightBar = (props: Props) => {
    console.log(props)
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div style={{ borderBottom: "1px solid #ced4da" }}>
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



                {/* 
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
            </div> */}
                {/* <div className={styles.chats}>
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
            </div> */}
            </div>
            <div className={styles.footer}>
                <p>Website is in Beta. Follow for updates</p>
                <GitHubIcon />

            </div>

        </div >
    )
}

export default RightBar