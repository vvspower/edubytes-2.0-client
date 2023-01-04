import React, { useState, useEffect, useReducer, } from 'react'
import { useNavigate } from 'react-router-dom'

import * as timeago from "timeago.js"
import { AxiosResponse } from 'axios'
import styles from './resource.module.sass'
import Resource from '../../../ApiManager/api/resources'
import { ReturnedResource } from '../../../ApiManager/interface/Interfaces'
import { ReturnedResourceResponse } from '../../../ApiManager/interface/Interfaces'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import pdfimage from '../../../assets/pdf.png'

// import Resource from '../../../ApiManager/api/resources'

const boards = [
    "All Boards",
    "A Level",
    "O Level",
    "ECAT-MDCAT",
    "Intermediate",
    "Matric"
]

const alevelsubjects = [
    "all",
    "Accounting - 9706",
    "Afrikaans - 9679",
    "Afrikaans - Language (AS Level only) - 8679",
    "Arabic - 9680",
    "Arabic - Language (AS Level only) - 8680",
    "Art & Design - 9479",
    "Biblical Studies (9484) New",
    "Biology - 9700",
    "Business (9609)",
    "Chemistry - 9701",
    "Chinese - Language & Literature (A Level only) - 9868 New",
    "Chinese - Language (AS Level only) - 8681",
    "Chinese (A Level only) - 9715",
    "Chinese Language (AS Level) - 8238 New",
    "Classical Studies - 9274",
    "Computer Science - 9618",
    "Design & Technology - 9705",
    "Design & Textiles - 9631",
    "Digital Media & Design - 9481",
    "Divinity (A Level only) - 9011",
    "Divinity (AS Level only) - 8041",
    "Drama - 9482",
    "Economics - 9708",
    "English - Language and Literature (AS Level only) - 8695",
    "English - Literature - 9695",
    "English General Paper (AS Level only) - 8021",
    "English Language - 9093",
    "Environmental Management (AS only) - 8291",
    "French - Language (AS Level only) - 8682",
    "French (A Level only) - 9716",
    "French Language & Literature - 9898",
    "French Language (AS Level) - 8028",
    "Geography - 9696",
    "German - 9897",
    "German - Language (AS Level only) - 8683",
    "German - Language (AS Level) - 8027",
    "German (A Level only) - 9717",
    "Global Perspectives & Research - 9239",
    "Hindi - Language (AS Level only) - 8687",
    "Hindi - Literature (AS Level only) - 8675",
    "Hindi (A Level only) - 9687",
    "Hinduism - 9487",
    "History - 9489",
    "Information Technology - 9626",
    "Islamic Studies - 9488",
    "Japanese Language (AS Level only) - 8281",
    "Law - 9084",
    "Marine Science - 9693",
    "Mathematics - 9709",
    "Mathematics - Further - 9231",
    "Media Studies - 9607",
    "Music - 9483",
    "Physical Education - 9396",
    "Physics - 9702",
    "Portuguese - Language (AS Level only) - 8684",
    "Portuguese (A Level only) - 9718",
    "Psychology - 9990",
    "Sociology - 9699",
    "Spanish - First Language (AS Level only) - 8665",
    "Spanish - Language & Literature (A Level only) - 9844 New",
    "Spanish - Language (AS Level only) - 8685",
    "Spanish - Literature (AS Level only) - 8673",
    "Spanish (A Level only) - 9719",
    "Spanish Language (AS Level) - 8022 New",
    "Sport & Physical Education (AS Level only) (8386) New",
    "Tamil - 9689",
    "Tamil - Language (AS Level only) - 8689",
    "Thinking Skills - 9694",
    "Travel & Tourism - 9395",
    "Urdu - Language (AS Level only) - 8686",
    "Urdu - Pakistan only (A Level only) - 9686",
    "Urdu (A Level only) - 9676",
]

const olevelsubjects = [
    "all",
    "Accounting - 7707",
    "Agriculture - 5038",
    "Arabic - 3180",
    "Art & Design - 6090",
    "Bangladesh Studies - 7094",
    "Bengali - 3204",
    "Biblical Studies - 2035 New",
    "Biology - 5090",
    "Business Studies - 7115",
    "Chemistry - 5070",
    "Commerce - 7100",
    "Computer Science - 2210",
    "Design & Technology - 6043",
    "Economics - 2281",
    "English Language - 1123",
    "Environmental Management - 5014",
    "Fashion & Textiles - 6130",
    "Food & Nutrition - 6065",
    "French - 3015",
    "Geography - 2217",
    "Global Perspectives - 2069",
    "Hinduism - 2055",
    "History - 2147",
    "Islamic Studies – 2068",
    "Islamiyat - 2058",
    "Literature in English - 2010",
    "Marine Science - 5180",
    "Mathematics - Additional - 4037",
    "Mathematics (Syllabus D) - 4024",
    "Pakistan Studies - 2059",
    "Physics - 5054",
    "Religious Studies - 2048",
    "Science - Combined - 5129",
    "Setswana - 3158",
    "Sinhala - 3205",
    "Sociology - 2251",
    "Statistics - 4040",
    "Tamil - 3226",
    "Travel & Tourism - 7096",
    "Urdu - First Language - 3247",
    "Urdu - Second Language - 3248"]


const ecatsubjects = [
    "all",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English"
]

const Resources = () => {
    const navigate = useNavigate()
    const [notes, setNotes] = useState<ReturnedResource[]>([])
    const [board, setBoard] = useState<string>(boards[0])
    const [subject, setSubject] = useState<string>("all")
    const [search, setsearch] = useState<string>("all")
    const [loading, setloading] = useState<boolean>(true)
    const [ignored, forceUpdate] = useReducer((x: number) => x + 1, 0);



    const resourceApi = new Resource()

    useEffect(() => {
        getResources()
    }, [])

    const Search = async () => {
        setloading(true)
        const response: AxiosResponse<ReturnedResourceResponse> = await resourceApi.searchResources(board === "All Boards" ? "all" : board, subject, search === "" ? "all" : search)
        setNotes(response.data.data)
        setloading(false)
    }

    const getResources = async () => {
        const response: AxiosResponse<ReturnedResourceResponse> = await resourceApi.getResources()
        setNotes(response.data.data)
        setloading(false)
    }


    return (
        <div className={styles.container}>
            <div className={styles.right}>
                <div className={styles.filter}>
                    <div>
                        <select onChange={(e) => { setBoard(e.target.value), setSubject("all") }} name="board" >
                            {boards.map((item, i) => {
                                return <option value={item}>{item}</option>
                            })}
                        </select>

                        {board === "O Level" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                            {olevelsubjects.map((item, i) => {
                                return <option value={item}>{item}</option>
                            })}

                        </select> : null}
                        {board === "ECAT-MDCAT" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                            {ecatsubjects.map((item, i) => {
                                return <option value={item}>{item}</option>
                            })}

                        </select> : null}
                        {board === "A Level" ?
                            <select onChange={(e) => { setSubject(e.target.value) }} name="subject">
                                {
                                    alevelsubjects.map((item, i) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </select>
                            : null}

                    </div>
                    <div className={styles.search}>
                        <div>
                            <input onChange={(e) => setsearch(e.target.value)} placeholder='Search' />
                        </div>
                        <div>
                            <button onClick={Search} >Search</button>
                        </div>
                    </div>
                </div>
                {!loading ? <div className={styles.notes} >
                    {notes.length != 0 ? notes.map((item, i) => {
                        return <div key={i} onClick={() => navigate(`/resources/view/${item._id}`)} className={styles.note}>
                            <div>
                                {item.preview_image != "" ? <img src={item.preview_image} /> : <img src={pdfimage} />}
                                <h6>{item.resource_title.substring(0, 40)}{item.resource_title.length > 40 ? "..." : null}</h6>
                                <div className={styles.details}>
                                    <span>{item.subject}</span>
                                    <span>{item.board}</span>
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <p>{timeago.format(parseInt(item.created + "000"))}</p>
                                </div>
                            </div>
                            <div>
                                <div className={styles.user}>
                                    <img src={item.user_pfp} />
                                    <span>{item.username}</span>
                                </div>
                            </div>
                        </div>
                    }) : <p>No results</p>}
                </div> : <Box sx={{ display: 'flex', margin: "0 auto", }}>
                    <CircularProgress />
                </Box>}
            </div>
        </div>
    )
}

export default Resources