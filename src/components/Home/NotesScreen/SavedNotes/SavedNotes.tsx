import React from 'react'
import styles from './savednotes.module.sass'


interface Props {
    userimg: string
    title: string
    images: string[]

}

const SavedNotes = (props: Props) => {
    return (
        <div className={styles.container}>
            <div>
                <img src={props.userimg} />
                <p>{props.title}</p>
            </div>
            <div>
                {props.images.map((item, i) => {
                    return <img src={item} />
                })}
            </div>
        </div>
    )
}

export default SavedNotes