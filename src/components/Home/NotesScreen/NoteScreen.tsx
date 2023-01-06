import React, { useState, useEffect, ChangeEvent, useRef, useReducer } from 'react'
import img from '../../../assets/image.png'
import pdfimage from '../../../assets/pdf.png'
import axios, { AxiosResponse } from 'axios';
import styles from './NoteScreen.module.sass'
import Resource from '../../../ApiManager/api/resources';
import * as interfaces from '../../../ApiManager/interface/Interfaces'
import LinearWithValueLabel from '../../LoadingLinear/LinearWithValueLabel';
import { useNavigate } from 'react-router-dom';
import Cloudinary from '../../../ApiManager/cloudinaryApi/cloudinary';


const NoteScreen = () => {
    const resourceApi = new Resource()
    const cloudinaryApi = new Cloudinary()

    const navigate = useNavigate()

    const boards = [
        "A Level",
        "O Level",
        "ECAT/MDCAT",
        "Intermediate",
        "Matric"
    ]

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

    const setboardlogic = (board: string) => {
        if (board === "A Level") {
            setSubject("Accounting - 9706")
        } else if (board === "O Level") {
            setSubject("Accounting - 7707")
        } else {
            setSubject("Mathematics")
        }
    }

    const hiddenImageFileInput = useRef<HTMLInputElement>(null);
    const hiddenPDFFileInput = useRef<HTMLInputElement>(null);

    const [progress, setProgress] = useState<number>(10)
    const [uploading, setUploading] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<string>("0")
    const [board, setBoard] = useState<string>(boards[0])
    const [subject, setSubject] = useState<string>("Accounting - 9706")

    const [visibility, setVisibility] = useState<string>("private")

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const [image, setImage] = useState<string[]>([]);
    const [imageURL, setImageURL] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<Blob[]>([]);

    const [PDF, setPDF] = useState<File>();
    const [pdfURL, setpdfURL] = useState<string[]>([]);


    const [errorText, setErrorText] = useState("")
    const [uploadError, setUploadError] = useState<string>("")

    useEffect(() => {
        setTitle("")
        setPrice("")

    }, [])




    const raiseError = (text: string) => {
        setErrorText(text)
        let timeout = setTimeout(() => setErrorText(""), 1500);
    }

    const createFormData = (imageFile: Blob[], file: Blob) => {
        let formData: FormData | undefined = new FormData();
        if (imageFile !== null) {
            formData.append("file", file);
            formData.append("upload_preset", "mb3hrwz7");
        } else {
            formData = undefined;
        }
        return formData
    }



    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (image.length >= 12) {
                return
            } else {
                let imageNew: string[] = image
                imageNew.push(URL.createObjectURL(event.target.files[0]!))
                setImage(imageNew)
                forceUpdate()
                let imageFileNew: Blob[] = imageFile!
                imageFileNew.push(event.target.files[0])
                setImageFile(imageFileNew);

            }
        }
    }

    const uploadImage = async () => {
        if (checkEmpty()) {
            setUploading(true)
            let loaded = imageFile.length;
            (function (next) {
                imageFile.map(async (file, i) => {
                    let formData = createFormData(imageFile, file)
                    try {
                        const response: string = await cloudinaryApi.uploadImage(formData!)
                        const url = imageURL
                        url.push(response)
                        setImageURL(url)
                        setProgress((loaded / imageURL.length) * 100)
                        forceUpdate()
                        if (imageURL.length == imageFile.length) {
                            next()
                        }
                    } catch (err: any) {
                        if (axios.isAxiosError(err)) {
                            setUploadError(typeof err.response?.data === "string" ? err.response?.data : "Something went wrong")
                        }

                    }
                })
            }(function () {
                uploadResource("image")
            }))
        }
    }

    const handlePDFChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files instanceof FileList
            ? setPDF(e.target.files[0]!) : 'handle exception'
    }


    const uploadPDF = async () => {
        if (checkEmpty()) {
            setUploading(true);

            (async function (next) {
                let reader = new FileReader();
                reader.readAsDataURL(PDF!)
                reader.onload = async function (e) {
                    let rawLog = (reader?.result as string).split(",")[1]!; //extract only the file data part
                    let dataSend = {
                        dataReq: { data: rawLog, name: PDF!.name, type: PDF!.type },
                        fname: "uploadFilesToGoogleDrive",
                    };
                    setProgress(20)
                    const response: AxiosResponse<any> = await axios.post("https://script.google.com/macros/s/AKfycbzahMBn4ZbghLAMQG2zCLMd1f7PuxDDSVOr7DreZ9U1kD4rD48W8oo-nLJVbq7g2eP-bg/exec", JSON.stringify(dataSend))
                    setProgress(50)
                    let newPDF = pdfURL
                    newPDF.push(response.data.url)
                    forceUpdate()
                    next()
                };
            }(function () {
                uploadResource("pdf")
            }))
        }
    }


    const checkEmpty = (): boolean => {
        if (title.length <= 10) {
            raiseError("title should be atleast 10 characters or more")
            return false
        } else {
            return true
        }
    }


    const uploadResource = async (target: string) => {
        if (checkEmpty()) {
            const resource: interfaces.Resource = {
                "resource_title": title,
                "resource_type": target,
                "preview_image": target === "image" ? imageURL[0] : "",
                "rating": 0,
                "file_type": target,
                "board": board,
                "subject": subject,
                "link": target === "image" ? imageURL : pdfURL,
                "visibility": visibility
            }
            try {
                const response: AxiosResponse<interfaces.ResourceResponse> = await resourceApi.uploadResource(resource)
                setProgress(100)

                if (response.status === 200) {
                    let timeout = setTimeout(() => navigate("/resources"), 1000);
                }
            } catch (err: any) {
                if (axios.isAxiosError(err)) {
                    setUploadError(typeof err.response?.data === "string" ? err.response?.data : "Something went wrong")
                }
            }
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.upload}>
                {image.length === 0 && PDF === undefined ? <h2>Contribute by uploading &gt;</h2> : null}
                <div>
                    {image.length === 0 && PDF === undefined ? <div className={styles.input}>
                        <div onClick={() => {
                            hiddenPDFFileInput.current!.click()
                        }}>
                            <img src={pdfimage} />
                            <button>PDF</button>

                        </div>

                        <div onClick={() => {
                            hiddenImageFileInput.current!.click()
                        }}  >
                            <img src={img} />
                            <button>Image</button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-file-button"
                            hidden
                            onChange={handleImageChange}
                            ref={hiddenImageFileInput}
                        />
                        <input
                            type="file"
                            accept="application/pdf"
                            id="upload-file-button"
                            hidden
                            onChange={handlePDFChange}
                            ref={hiddenPDFFileInput}
                        />
                    </div> : PDF === undefined ?
                        <div className={styles.images}>
                            <div className={styles.image}>
                                {image.map((img, i) => {
                                    return <img key={i} src={img} />
                                })}
                            </div>
                            {!uploading ?
                                <>
                                    <div>
                                        <p>Currently you can only add upto 12 images due to long upload times.</p>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            hiddenImageFileInput.current!.click()
                                        }} >Add Images</button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="upload-file-button"
                                            hidden
                                            onChange={handleImageChange}
                                            ref={hiddenImageFileInput}
                                        />
                                    </div>
                                </>
                                : null}
                        </div> : <p style={{ fontSize: "12px", marginTop: "10px" }}>Selected PDF : {PDF!.name}</p>}
                    {image.length !== 0 || PDF ?
                        <>
                            {!uploading ?
                                <div>
                                    <div className={styles.notes_info}>
                                        <div className={styles.inputs_change}>
                                            <div>
                                                <input style={{ maxWidth: "150px" }} onChange={(e) => { setTitle(e.target.value) }} value={title} placeholder='Title' />

                                                <select onChange={(e) => { setBoard(e.target.value), setboardlogic(e.target.value) }} name="subject" >
                                                    {boards.map((item, i) => {

                                                        return <option key={i} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div style={{ maxWidth: "150px" }} >

                                                {board === "O Level" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                                                    {olevelsubjects.map((item, i) => {
                                                        return <option key={i} value={item}>{item}</option>
                                                    })}

                                                </select> : null}
                                                {board === "ECAT/MDCAT" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                                                    {ecatsubjects.map((item, i) => {
                                                        return <option key={i} value={item}>{item}</option>
                                                    })}

                                                </select> : null}
                                                {board === "Intermediate" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                                                    {ecatsubjects.map((item, i) => {
                                                        return <option key={i} value={item}>{item}</option>
                                                    })}

                                                </select> : null}
                                                {board === "Matric" ? <select onChange={(e) => { setSubject(e.target.value) }} name='subject'>
                                                    {ecatsubjects.map((item, i) => {
                                                        return <option key={i} value={item}>{item}</option>
                                                    })}

                                                </select> : null}
                                                {board === "A Level" ?
                                                    <select onChange={(e) => { setSubject(e.target.value) }} name="subject">
                                                        {
                                                            alevelsubjects.map((item, i) => {
                                                                return <option key={i} value={item}>{item}</option>
                                                            })
                                                        }
                                                    </select>
                                                    : null}

                                                <select onChange={(e) => { setVisibility(e.target.value) }} name='visibility'>
                                                    <option value={"private"}>Private</option>
                                                    <option value={"public"}>Public</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: "12px", marginTop: "10px", color: "#ff6b6b" }}>{errorText}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => PDF === undefined ? uploadImage() : uploadPDF()} style={{ margin: "40px" }}>Upload</button>
                                    </div>
                                    {uploadError !== "" ?
                                        <div>
                                            <p>{uploadError!}</p>
                                            <button>Retry</button>
                                        </div>
                                        : null}
                                </div>
                                : null}
                        </>
                        : null}
                    <div>
                        {uploading ? <LinearWithValueLabel value={progress} /> : null}
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div >
    )
}


export default NoteScreen