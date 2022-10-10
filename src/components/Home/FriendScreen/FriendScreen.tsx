import React, { useState, useEffect, useReducer } from 'react'
import { AxiosResponse } from 'axios';
import styles from './friendscreen.module.sass'
import example_pfp from '../../../assets/example_pfp.jpg'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import Friend, { FriendRequest } from '../../../ApiManager/friend';
import Suggestions from '../../../ApiManager/suggestions';
import { ResponseData } from '../../../ApiManager/friend';
import { ResponseSuggestedUser, SuggestedUser } from '../../../ApiManager/suggestions';
import { RootState } from '../../../store/store';
import { Stack } from '@mui/system';
import { Skeleton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const FriendScreen = () => {
    const [friendReqs, setFriendReqs] = useState<FriendRequest[]>([])
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([])
    const user = useSelector((state: RootState) => state.user.value);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [success, setSuccess] = useState<boolean>(false)
    const friendApi = new Friend()
    const suggestionApi = new Suggestions()

    const friendStack: JSX.Element = (
        <>
            <Stack
                sx={{ padding: "15px", backgroundColor: "white", borderRadius: "16px", marginTop: "10px", boxShadow: "0 3px 5px rgb(0 0 0 / 0.1)" }}
                spacing={1}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Skeleton variant="circular" width={50} height={50} />
                        <Skeleton variant="text" width={100} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Skeleton variant="circular" width={20} height={20} />
                    </div>
                </div>
            </Stack>
        </>
    );


    const getFriendRequest = async () => {
        const response: AxiosResponse<ResponseData> = await friendApi.getFriendRequests()
        setFriendReqs(response.data.data)
        forceUpdate()
    }

    const getSuggestedUser = async () => {
        const response: AxiosResponse<ResponseSuggestedUser> = await suggestionApi.getSuggestedUsers(user.username)
        setSuggestedUsers(response.data.data)
        forceUpdate()
    }

    const getData = () => {
        getFriendRequest()
        getSuggestedUser()
        setSuccess(true)
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.friend_requests}>
                <h1>Friend Requests</h1>
                {friendReqs.length === 0 ? <span>No friend requests</span> : null}
                {success ?
                    <>
                        <div>{friendReqs.map((item, i) => {
                            return <main key={i}>
                                <div className={styles.friend_req}>
                                    <img src={item.sender_pfp} />
                                    <p>{item.sender}</p>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                    <AddCircleIcon sx={{ fill: "#339af0" }} />
                                </div>
                            </main>
                        })
                        }
                        </div>
                        {suggestedUsers.length !== 0 ? <h1>Suggested Users</h1> : null}
                        <div>{suggestedUsers.map((item, i) => {
                            return <main key={i}>
                                <div className={styles.friend_req}>
                                    <img src={item.details.pfp} />
                                    <p>{item.username}</p>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                    <AddCircleIcon sx={{ fill: "#339af0" }} />
                                </div>
                            </main>
                        })}
                        </div></> : friendStack}
            </div>
        </div >
    )
}

export default FriendScreen