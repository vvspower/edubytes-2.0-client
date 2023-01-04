import React from 'react'
import example_pfp from '../../../assets/example_pfp.jpg'
import { Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import styles from './suggestedpost.module.sass'
// import { SuggestedPost } from '../../../../ApiManager/api/suggestions'
import { SuggestedPost } from '../../../../ApiManager/interface/Interfaces'

interface Props {
    posts: SuggestedPost[]
}


const SuggestedPosts = (props: Props) => {

    const redirect = (id: string) => {
        navigate(`/post/${id}`)
        window.location.reload()

    }
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <h1>Similar Posts</h1>
            {props.posts.map((item, i) => {
                return <div onClick={() => redirect(item._id)} className={styles.suggested}>
                    <div className={styles.header}>
                        <img src={item.user_pfp} />
                        <p>{item.username}</p>
                    </div>
                    <div className={styles.content}>
                        <p>
                            {item.content}
                        </p>
                    </div>

                    <Chip
                        key={i}
                        sx={{ marginRight: 1, marginTop: 1 }}
                        label={item.tags[0]}
                        size="small"
                    />
                </div>
            })}
        </div>
    )
}

export default SuggestedPosts