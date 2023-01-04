import React, { useState, useEffect, useReducer } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import styles from './friendscreen.module.sass'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import Friend from '../../../ApiManager/api/friend';
import { DefaultResponse, FriendRequest, } from '../../../ApiManager/interface/Interfaces';
import Suggestions from '../../../ApiManager/api/suggestions';
import { ResponseData } from '../../../ApiManager/interface/Interfaces';
import { IDefaultResponse, SuggestedUser } from '../../../ApiManager/interface/Interfaces';
import { ResponseSuggestedUser } from '../../../ApiManager/interface/Interfaces';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Skeleton } from '@mui/material';
import SnackBar from '../../SnackBar/SnackBar';

const FriendScreen = () => {
    const user = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate()

    const [friendReqs, setFriendReqs] = useState<FriendRequest[]>([])
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([])
    const [text, setText] = useState<string>("")
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [success, setSuccess] = useState<boolean>(false)
    const [open, setOpen] = useState(false);

    const friendApi = new Friend()
    const suggestionApi = new Suggestions()

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


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

    const createNewFriendReqArray = (username: string) => {
        let newFR = friendReqs.filter((item) => {
            return item.sender != username
        })
        setFriendReqs(newFR)
    }


    const acceptFriendRequest = async (username: string) => {
        try {
            const response: AxiosResponse<DefaultResponse> = await friendApi.acceptFriendRequest(username)
            setText(response.data.data)
            setOpen(true)
            createNewFriendReqArray(username)

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<IDefaultResponse>
                setText(err.response?.data.data!)
                setOpen(true)
                createNewFriendReqArray(username)

            }
        }
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
            <SnackBar open={open} handleClose={handleCloseSnackBar} text={text} />
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
                                <div onClick={() => { acceptFriendRequest(item.sender) }} style={{ cursor: "pointer", marginRight: "20px" }}>
                                    <AddCircleIcon sx={{ fill: "#339af0" }} />
                                </div>
                            </main>
                        })
                        }
                        </div>
                        {suggestedUsers.length !== 0 ? <h1>Suggested Users</h1> : null}
                        <div>{suggestedUsers.map((item, i) => {
                            return <main style={{ cursor: "pointer" }} onClick={() => navigate(`/u/${item.username}`)} key={i}>
                                <div className={styles.friend_req}>
                                    <img src={item.details.pfp} />
                                    <p>{item.username}</p>
                                </div>

                            </main>
                        })}
                        </div></> : friendStack}
            </div>
        </div >
    )
}

export default FriendScreen