import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import pdf from '../../../assets/pdf.png'
import { useNavigate } from 'react-router-dom'
import styles from './leftbar.module.sass'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import resource from '../../../assets/resource.png'
import university from '../../../assets/university.png'
import marketplace from '../../../assets/marketplace.png'
import friends from '../../../assets/friends.png'
import star from '../../../assets/star.png'
import book from '../../../assets/book.jpg'
import Rating from '@mui/material/Rating';
import Suggestions from '../../../ApiManager/api/suggestions'
import { AxiosResponse } from 'axios'
import { ResourceResponse, ReturnedResource, ReturnedResourceResponse } from '../../../ApiManager/interface/Interfaces'
import Resource from '../../../ApiManager/api/resources'

interface Props {
    setMode: Dispatch<SetStateAction<"home" | "friends" | "resources">>
}

const LeftBar = ({ setMode }: Props) => {
    const user = useSelector((state: RootState) => state.user.value);
    const [resources, setresources] = useState<ReturnedResource[]>([])
    const suggestionsApi = new Suggestions()
    const navigate = useNavigate()

    const getSuggestedResources = async () => {
        const response: AxiosResponse<ReturnedResourceResponse> = await suggestionsApi.getSuggestedResources()
        setresources(response.data.data)
    }

    useEffect(() => {
        getSuggestedResources()
    }, [])

    console.log(resources)


    return (
        <div className={styles.container}>
            <div>
                <div>
                    <div onClick={() => navigate(`/u/${user.username}`)} className={styles.profile}>
                        <img src={user.details.pfp} />
                        <p>{user.username}</p>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.buttons}>
                            <button onClick={() => navigate("/resources")}>
                                <img src={resource} />
                                <div >Browse Resources</div>
                            </button>
                            <button onClick={() => alert("coming soon")}>
                                <img src={university} />
                                <div>Universities</div>
                            </button>
                            <button onClick={() => alert("coming soon")}>
                                <img src={marketplace} />
                                <div>Bazaar</div>
                            </button>
                            <button onClick={() => { setMode("friends") }}>
                                <img src={friends} />
                                <div >Friends</div>
                            </button>
                            <button onClick={() => alert("coming soon")}>
                                <img src={star} />
                                <div>Starred</div>
                            </button>
                        </div>
                    </div>
                </div>
                {resources.length !== 0 ? <div className={styles.suggested}>
                    <h1>Suggested resources for you</h1>
                    {resources.map((item, i) => {

                        return <div onClick={() => navigate(`/resources/view/${item._id}`)} className={styles.book}>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <img src={item.file_type === "pdf" ? pdf : item.link[0]} />
                                <div>
                                    <h2>{item.resource_title}</h2>
                                    <p>{item.subject}</p>
                                    <button>View</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div> : null}
                {/* suggested notes will be here. according to users subjects  */}
            </div>
            <div className={styles.footer}>
                <p>EduBytes  &copy; 2022</p>
            </div>
        </div>
    )
}

export default LeftBar