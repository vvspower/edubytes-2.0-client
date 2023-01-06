import React, { useEffect, useReducer, useState } from 'react'
import styles from './calendar.module.sass'
import plus from '../../assets/plus.png'
import AttachmentIcon from '@mui/icons-material/Attachment';
import CalendarModal from './CalendarModal/CalendarModal'
import Planner from '../../ApiManager/api/planner';
import loader from '../../assets/loading.gif'


// import * as React from 'react';
import { List, arrayMove } from 'react-movable';
import { AxiosResponse } from 'axios';
import { DefaultResponse, ReturnedPlanner, ReturnedPlannerResponseMultiple } from '../../ApiManager/interface/Interfaces';
import { Box, CircularProgress } from '@mui/material';


const Calendar = () => {

    interface Attatchments {
        links: string[]
        files: string[]
    }


    const [studyPlanner, setStudyPlanner] = useState<ReturnedPlanner[]>([]);
    const [examPlanner, setExamPlanner] = useState<ReturnedPlanner[]>([]);
    const plannerApi = new Planner()
    const [planners, setplanners] = useState<ReturnedPlanner[]>([])
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [deleting, setdeleting] = useState(false)



    useEffect(() => {
        getPlanners()
    }, [])

    const getPlanners = async () => {
        const response: AxiosResponse<ReturnedPlannerResponseMultiple> = await plannerApi.getPlanner()
        setplanners(response.data.data)
        setStudyPlanner(response.data.data.filter((item, i) => {
            return item.type === "study"
        }))
        setExamPlanner(response.data.data.filter((item, i) => {
            return item.type === "exam"
        }))
        forceUpdate()
    }

    const deletePlanner = async (id: string) => {
        setdeleting(true)
        const response: AxiosResponse<DefaultResponse> = await plannerApi.deletePlanner(id)
        location.reload()

    }

    const openLinks = (item: Attatchments) => {
        item.links.map((link, i) => {
            window.open(link, "_blank")
        })
        item.files.map((link, i) => {
            window.open(link, "_blank")
        })
    }



    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_pc}>
                    <div className={styles.latest}>

                        {planners.filter((item, i) => {
                            return (new Date(item.due_date).getDate() === new Date().getDate() || new Date(item.due_date).getDate() < new Date().getDate()) && item.type === "study"
                        }).splice(0, 1).map((item, i) => {
                            return <div key={i} className={styles.current}>
                                <h1>Current</h1>
                                <main>
                                    <div className={styles.header}>
                                        <div>
                                            <h2>{item.title}</h2>
                                            <p>{item.description.substring(0, 60)}{item.description.length > 60 ? "..." : null}</p>

                                        </div>
                                        <div>
                                            {new Date(item.due_date).getDate() === new Date().getDate() ? <span style={{ backgroundColor: "#fff4e6", color: "#ffa94d", marginLeft: "10px" }}>Current</span> : null}
                                            {new Date(item.due_date).getDate() < new Date().getDate() ? <span style={{ backgroundColor: "#ffe3e3", color: "#ff6b6b", marginLeft: "10px" }}>Due</span> : null}
                                            <span>{new Date(item.due_date).toDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div>

                                            <span onClick={() => { openLinks(item.attatchments) }} style={{ cursor: "pointer" }}>
                                                <AttachmentIcon fontSize='small' sx={{ fill: "#868e96" }} />
                                                <p>{item.attatchments.files.length + item.attatchments.links.length} Attatchments</p>
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <button style={{ cursor: "pointer" }} onClick={() => deletePlanner(item._id)}>Complete</button>
                                            {deleting ? <img src={loader} width="20" /> : null}
                                        </div>
                                    </div>
                                </main>
                            </div>
                        })}
                        {planners.filter((item, i) => {
                            return new Date(item.due_date).getDate() > new Date().getDate() && item.type === "study"
                        }).splice(0, 1).map((item, i) => {
                            return <div key={i} className={styles.upcoming}>
                                {/* <p>hello</p> */}
                                <main>
                                    <div className={styles.header}>
                                        <div>
                                            <h2 style={{ fontSize: "14px" }}>{item.title.substring(0, 30)}{item.title.length > 30 ? "..." : null}</h2>
                                            <p style={{ marginTop: "30px", marginBottom: "20px" }}>{item.description.substring(0, 40)}{item.description.length > 40 ? "..." : null}</p>
                                        </div>
                                        <div style={{ marginLeft: "30px" }}>
                                            <span style={{ backgroundColor: "#d0ebff", color: "#4dabf7" }}>Upcoming</span>
                                        </div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div>
                                            <span>
                                                <p>{new Date(item.due_date).toDateString()}</p>
                                            </span>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        })}
                        {planners.length !== 0 && planners.filter((item, i) => {
                            return new Date(item.due_date).getDate() == new Date().getDate() || new Date(item.due_date).getDate() < new Date().getDate()
                        }).length === 0 ?
                            <div style={{ marginTop: "60px" }} className={styles.current}>
                                <p style={{ color: "#868e96" }}>
                                    No Due
                                </p>
                            </div> : null
                        }

                        {planners.filter((item, i) => {
                            return item.type === "study"
                        }).length === 0 ?
                            <>
                                <div className={styles.current}>
                                    <h1>Current</h1>
                                    <main>
                                        <div className={styles.header}>
                                            <div>
                                                <h2>Start Managing your studies</h2>
                                                <p>Start now by clicking create</p>

                                            </div>
                                            <div>
                                                <span style={{ marginLeft: "20px" }}>{new Date().toDateString()}</span>
                                            </div>
                                        </div>
                                        <div className={styles.footer}>
                                            <div>

                                                <span>
                                                    <AttachmentIcon fontSize='small' sx={{ fill: "#868e96" }} />
                                                    <p>No Attatchments</p>
                                                </span>
                                            </div>

                                        </div>
                                    </main>
                                </div>
                                <div>
                                    <p style={{ fontSize: "16px", color: "#868e96" }}>No upcoming </p>
                                </div>
                            </>
                            : null}





                    </div>
                    <div className={styles.table_view}>
                        <div className={styles.table_planner}>
                            {planners.length === 0 ? <p style={{ marginTop: "10px", color: "#868e96" }}>No planners created</p> : null}
                            <CalendarModal type='study' mode='create' />
                            <List
                                values={studyPlanner}
                                onChange={({ oldIndex, newIndex }) =>
                                    setStudyPlanner(arrayMove(studyPlanner, oldIndex, newIndex))
                                }
                                renderList={({ children, props }) => <div className={styles.planner} {...props}>{children}</div>}
                                renderItem={({ value, props }) =>
                                    <div className={styles.planner_item} {...props}>
                                        <h1>{value.title}</h1>
                                        <p>{new Date(value.due_date).toDateString()}</p>
                                        <div className={styles.chip}>
                                            {/* <span>Exam</span> */}
                                            {new Date(value.due_date).getDate() > new Date().getDate() ? <span>Upcoming</span> : null}
                                            {new Date(value.due_date).getDate() === new Date().getDate() ? <span style={{ backgroundColor: "#fff4e6", color: "#ffa94d" }}>Current</span> : null}
                                            {new Date(value.due_date).getDate() < new Date().getDate() ? <span style={{ backgroundColor: "#ffe3e3", color: "#ff6b6b" }} onClick={() => console.log("hello")}>Due</span> : null}

                                            <CalendarModal planner={value} type='exam' mode='edit' />
                                        </div>
                                    </div>
                                }
                            />

                        </div>
                        <div className={styles.exam_planner}>
                            {planners.filter((item, _) => {
                                return item.type === "exam"
                            }).length === 0 ? <p style={{ marginTop: "10px", color: "#868e96" }}>No exams</p> : null}
                            <CalendarModal type='exam' mode='create' />
                            <List
                                values={examPlanner}
                                onChange={({ oldIndex, newIndex }) =>
                                    setExamPlanner(arrayMove(examPlanner, oldIndex, newIndex))
                                }
                                renderList={({ children, props }) => <div className={styles.planner} {...props}>{children}</div>}
                                renderItem={({ value, props }) =>
                                    <div className={styles.exam_planner_item} {...props}>
                                        <h1>{value.title}</h1>
                                        <p>{new Date(value.due_date).toDateString()}</p>
                                        <div className={styles.exam_chip}>
                                            <span>Exam</span>
                                            {new Date(value.due_date).getDate() > new Date().getDate() ? <span>Upcoming</span> : null}
                                            {new Date(value.due_date).getDate() === new Date().getDate() ? <span style={{ backgroundColor: "#fff4e6", color: "#ffa94d" }}>Current</span> : null}
                                            {new Date(value.due_date).getDate() < new Date().getDate() ? <span style={{ backgroundColor: "#ffe3e3", color: "#ff6b6b" }}>Due</span> : null}

                                            <CalendarModal planner={value} type='exam' mode='edit' />
                                        </div>
                                    </div>}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container_mobile} style={{ textAlign: "center" }} >
                <h3>Planner not yet available on mobile view yet</h3>
                <p>Coming soon</p>
            </div>
        </>
    )
}



export default Calendar