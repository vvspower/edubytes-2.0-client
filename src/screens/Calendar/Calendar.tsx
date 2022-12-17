import React from 'react'
import styles from './calendar.module.sass'
import plus from '../../assets/plus.png'

const Calendar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.add_study}>
                <img src={plus} />
                <p>Start organizing your studies</p>
            </div>
        </div>
    )
}

// TODO: first add updating and deleting function to the front end
// TODO: add functionality of opening little  popup from the three dots
// TODO: add search feature
// TODO: complete all these things before moving on to the calendar module

export default Calendar