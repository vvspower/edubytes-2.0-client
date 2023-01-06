import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Auth from '../../../ApiManager/api/auth'
import { IDefaultResponse } from '../../../ApiManager/interface/Interfaces'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'



const Verify = () => {
    const token = new URLSearchParams(window.location.search).get("jwt");
    const authApi = new Auth()
    const navigate = useNavigate()

    const verifyUser = async () => {
        const response: AxiosResponse<IDefaultResponse> = await authApi.verifyUser(token!)
        if (response.status === 200) {
            localStorage.setItem("token", response.data.data)
            navigate("/complete")
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])

    return (
        <div>
            <p>verifying</p>
        </div>
    )
}

export default Verify