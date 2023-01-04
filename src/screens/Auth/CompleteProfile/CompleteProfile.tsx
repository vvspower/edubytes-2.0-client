import { Stack, Chip } from '@mui/material';
import { AxiosResponse } from 'axios';
import { url } from 'inspector';
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Auth from '../../../ApiManager/api/auth';
import { IDefaultResponse, IGetUserResponse, User } from '../../../ApiManager/interface/Interfaces';
import { RootState } from '../../../store/store';
import styles from './complete.module.sass'
import { useNavigate } from 'react-router-dom';



const CompleteProfile = () => {
    const alevelsubjects = [
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

    const olevelsubjects = ["Accounting - 7707",
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
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "English",
        "Islamiyat",
        "Urdu",
        "Pakistan Studies"
    ]



    const [college, setcollege] = useState(false)
    // const user = useSelector((state: RootState) => state.user.value);

    const authApi = new Auth()
    const navigate = useNavigate()

    const [university, setuniversity] = useState(false)
    const [userInfo, setuser] = useState<User>()
    const [subjects, setsubjects] = useState<string[]>([])
    const [board, setboard] = useState("")
    const [institute, setinstitute] = useState("")
    const [bio, setbio] = useState("")


    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);


    const getUser = async () => {
        console.log("hello")
        const response: IGetUserResponse = await authApi.getUserFromToken(sessionStorage.getItem("token")!)
        // response.data
        setuser(response.data)
        if (response.data.details.completed === true) {
            navigate("/")
        }
    }


    useEffect(() => {
        getUser()
    }, [])






    const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const subArr = subjects;
        if (subArr.length < 5) {
            subArr.push(event.target.value)
            setsubjects(subArr)
            forceUpdate()
        }
    };


    const handleDelete = (i: number): void => {
        const tags = subjects;
        tags.splice(i, 1);
        setsubjects(tags);
        forceUpdate();
    };

    const checkUpdate = () => {
        if (institute.length > 2 && bio.length !== 0, subjects.length >= 1) {
            return true
        } else {
            return false
        }
    }

    const updateProfile = async () => {

        let details = {
            bio: bio,
            pfp: "https://res.cloudinary.com/disle0uxb/image/upload/v1651950295/hghjdj25ja9u8vjguwhl.jpg",
            completed: true
        }
        let education = {
            institute: institute,
            subjects: subjects
        }
        const response: AxiosResponse<IDefaultResponse> = await authApi.updateUser(details, education)
        if (response.status === 200) {
            navigate("/")
            location.reload()
        }
    }


    return (
        <div className={styles.container}>
            <h1>Complete your profile</h1>
            <div className={styles.inputs}>
                <textarea value={bio} onChange={(e) => { setbio(e.target.value) }} placeholder='bio' />
                <p>You will be able to change your pfp once you complete your profile</p>
                <div>
                    <div className={styles.board_btn}>
                        <button style={{ backgroundColor: board === "ALEVEL" ? "#1971c2" : undefined }} onClick={() => { setboard("ALEVEL"); setsubjects([]) }}>A Level</button>
                        <button style={{ backgroundColor: board === "OLEVEL" ? "#1971c2" : undefined }} onClick={() => { setboard("OLEVEL"); setsubjects([]) }}>O Level</button>
                        <button style={{ backgroundColor: board === "MATRIC/INTER" ? "#1971c2" : undefined }} onClick={() => { setboard("MATRIC/INTER"); setsubjects([]) }}>Matric / Inter</button>
                    </div>
                    <div className={styles.select}>

                        {board === "ALEVEL" ? <div>
                            <input value={institute} onChange={(e) => { setinstitute(e.target.value) }} placeholder='institute; BCCP/Nixor/Cedar etc' />
                            <select onChange={(e) => handleChange(e)} name="subjects" id="forum">
                                {alevelsubjects.map((item, i) => {
                                    return <option value={item}>{item.substring(0, 40)}</option>

                                })}

                            </select>
                        </div> : null}
                        {board === "OLEVEL" ? <div>
                            <input value={institute} onChange={(e) => { setinstitute(e.target.value) }} placeholder='institute; BCCP/Nixor/Cedar etc' />
                            <select onChange={(e) => handleChange(e)} name="subjects" id="forum">
                                {olevelsubjects.map((item, i) => {
                                    return <option value={item}>{item.substring(0, 40)}</option>

                                })}

                            </select>
                        </div> : null}
                        {board === "MATRIC/INTER" ? <div>
                            <input value={institute} onChange={(e) => { setinstitute(e.target.value) }} placeholder='institute; BCCP/Nixor/Cedar etc' />
                            <select onChange={(e) => handleChange(e)} name="subjects" id="forum">
                                {ecatsubjects.map((item, i) => {
                                    return <option value={item}>{item.substring(0, 40)}</option>
                                })}
                            </select>
                        </div> : null}
                    </div>


                    <Stack sx={{ marginBottom: 1, }} direction="row" spacing={1}>
                        <div>
                            {subjects.map((item, i) => {
                                return (
                                    <Chip
                                        key={i}
                                        label={item}
                                        onClick={() => handleDelete(i)}
                                        size="small"
                                    />
                                );
                            })}
                        </div>
                    </Stack>
                    {subjects.length !== 0 ? <p>Click on the subjects to remove them</p> : null}

                </div>
                <div className={styles.continue}>
                    <button style={{ backgroundColor: !(institute.length > 2 && bio.length !== 0 && subjects.length >= 1) ? "#868e96" : undefined }} disabled={!(institute.length > 2 && bio.length !== 0 && subjects.length >= 1)} onClick={updateProfile}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile

