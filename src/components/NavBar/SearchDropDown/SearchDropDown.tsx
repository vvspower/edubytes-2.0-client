import React, { useState, useEffect } from 'react'
import styles from './search.module.sass'

import example_pfp from './../../../assets/example_pfp.jpg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IPost } from '../../../ApiManager/interface/Interfaces';
import { useNavigate } from 'react-router-dom';
import loader from '../../../assets/loading.gif'

interface Props {
    search: string
    posts: IPost[]
    loading: boolean
    setsearch: (s: string) => void
}

const SearchDropDown = (props: Props) => {

    const navigate = useNavigate()

    const Post: JSX.Element = (
        <>{props.posts.map((item, i) => {
            return <div onClick={() => { navigate(`/post/${item._id}`); props.setsearch("") }} className={styles.post}>
                <div className={styles.header}>
                    <img src={item.user_pfp} height={30} width={30} />
                    <p>{item.username}</p>
                </div>
                <div className={styles.main}>
                    <div>
                        <p>{item.content}</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        })}
        </>
    )

    return (
        <div className={styles.container}>
            <span>Search results for "{props.search}" in posts</span>
            <div className={styles.postcontainer} >
                {props.loading === false ? Post : <img src={loader} width="30px" />}
                <KeyboardArrowDownIcon fontSize='large' sx={{ fill: "#adb5bd" }} />
            </div>
            <div className={styles.extra}>
                <span onClick={() => { navigate("/resources"); props.setsearch("") }}>Search results for "{props.search}" in Resources</span>
                <span>Search results for "{props.search}" in Universities</span>
                <span>Search results for "{props.search}" in Bazaar</span>
            </div>
        </div>
    )
}

export default SearchDropDown