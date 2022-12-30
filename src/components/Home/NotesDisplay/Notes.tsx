import React from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import star from '../../../assets/star.png'
import { useNavigate } from 'react-router-dom'
import pdf from '../../../assets/pdf.png'

import styles from './notes.module.sass'

interface Props {
    id: string
    image: string
    subject: string
    rating: number
    username: string
    user_pfp: string
    title: string
}



//? maybe make this its own component instead of putting it in createpostbar


const Notes = (props: Props) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`/resources/view/${props.id}`)
        }} className={styles.container}>
            <img src={props.image !== "" ? props.image : pdf} />
            <div className={styles.main} >
                <div className={styles.resource}>
                    <p style={{ margin: "0px", color: "#69db7c" }}>{props.subject.substring(0, 19)}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <img style={{ height: "12px", width: "12px", margin: "0px" }} src={star} />
                        <span style={{ margin: "0px" }}>{props.rating}</span>
                    </div>
                </div>
                <div >
                    <p style={{ color: "#343a40" }}>{props.title.length <= 25 ? props.title.substring(0, 25) : props.title.substring(0, 18) + ".."}</p>
                </div>
                <div className={styles.user} >
                    <div >
                        <img src={props.user_pfp} />
                        <p>{props.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes