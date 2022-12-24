import React from 'react'
import styles from './calendar.module.sass'
import plus from '../../assets/plus.png'
import AttachmentIcon from '@mui/icons-material/Attachment';
// import * as React from 'react';
import { List, arrayMove } from 'react-movable';

const Calendar = () => {
    const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);
    const [exams, setExams] = React.useState(['Item 1', 'Item 2', 'Item 3']);

    return (
        <div className={styles.container}>
            <div className={styles.latest}>
                <div className={styles.current}>
                    <h1>Current</h1>
                    <main>
                        <div className={styles.header}>
                            <div>
                                <h2>Study computer science for two hours</h2>
                                <p>Et deleniti voluptas perferendis et non atque ratione doloribus... </p>

                            </div>
                            <div>
                                <span>Current</span>
                                <span>26th December</span>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <div>
                                <span>
                                    <AttachmentIcon fontSize='small' sx={{ fill: "#868e96" }} />
                                    <p>No Attatchments</p>
                                </span>
                            </div>
                            <div>
                                <button>Complete</button>
                            </div>
                        </div>
                    </main>
                </div>
                <div className={styles.upcoming}>
                    <main>
                        <div className={styles.header}>
                            <div>
                                <h2 style={{ fontSize: "14px" }}>Study computer science for two hours</h2>
                                <p style={{ marginTop: "30px", marginBottom: "20px" }}>No Description</p>
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <span style={{ backgroundColor: "#d0ebff", color: "#4dabf7" }}>Upcoming</span>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <div>
                                <span>
                                    <AttachmentIcon fontSize='small' sx={{ fill: "#868e96" }} />
                                    <p>No Attatchments</p>
                                </span>
                            </div>
                            <div>
                                {/* <button>Complete</button> */}
                            </div>
                        </div>
                    </main>

                </div>
            </div>
            <div className={styles.table_view}>
                <div className={styles.table_planner}>
                    <List
                        values={items}
                        onChange={({ oldIndex, newIndex }) =>
                            setItems(arrayMove(items, oldIndex, newIndex))
                        }
                        renderList={({ children, props }) => <div className={styles.planner} {...props}>{children}</div>}
                        renderItem={({ value, props }) =>
                            <div className={styles.planner_item} {...props}>
                                <h1>Maths past paper solve 9608</h1>
                                {/* {value} */}
                                <div className={styles.chip}>
                                    <span>Upcoming</span>
                                    <span>Edit</span>
                                </div>
                            </div>}
                    />
                </div>
                <div className={styles.exam_planner}>
                    <List
                        values={exams}
                        onChange={({ oldIndex, newIndex }) =>
                            setExams(arrayMove(exams, oldIndex, newIndex))
                        }
                        renderList={({ children, props }) => <div className={styles.planner} {...props}>{children}</div>}
                        renderItem={({ value, props }) =>
                            <div className={styles.exam_planner_item} {...props}>
                                <h1>Computer Science 9608</h1>
                                <p>16th of December 2021</p>
                                {/* {value} */}
                                <div className={styles.exam_chip}>
                                    <span>Exam</span>
                                    <span>Upcoming</span>
                                    <span>Edit</span>
                                </div>
                            </div>}
                    />

                </div>

            </div>

        </div>
    )
}



export default Calendar