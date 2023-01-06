import Auth from '../../../../ApiManager/api/auth'
import * as timeago from "timeago.js"
import { AxiosResponse } from 'axios'
import { IGetUserResponse } from '../../../../ApiManager/interface/Interfaces'
import { User } from '../../../../ApiManager/interface/Interfaces'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './userinfo.module.sass'
import VerifiedIcon from '@mui/icons-material/Verified';

interface Props {
    username: string
}

const UserInfo = (props: Props) => {
    const navigate = useNavigate()
    const authApi = new Auth()
    const [user, setuser] = useState<User | null>(null)




    const getUser = async () => {
        const response: AxiosResponse<IGetUserResponse> = await authApi.getUserFromUsername(props.username!);
        setuser(response.data.data)
    };

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className={styles.user}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={user?.details.pfp} />
                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <h2>{user?.username}</h2>
                    {user?.admin ? <VerifiedIcon fontSize="small" sx={{ fill: "#339af0" }} /> : null}
                </div>
            </div>
            <div className={styles.button}>
                <button onClick={() => { navigate(`/u/${props.username}`) }}> Visit Profile</button>
                <button onClick={() => alert("coming soon")}> Message</button>
            </div>
            <div className={styles.userinfo}>
                <div>
                    <p>{user?.details.bio}</p>
                </div>
                <div>
                    <h5>EDUCATION</h5>
                    <p>{user?.education.institute}</p>
                </div>
                <div>
                    <h5>JOINED</h5>
                    <p>{timeago.format(parseInt(user?.created + "000"))}</p>
                </div>

            </div>
        </div>
    )
}

export default UserInfo