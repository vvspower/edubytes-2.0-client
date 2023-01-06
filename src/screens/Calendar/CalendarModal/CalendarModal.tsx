import * as React from 'react';
import { useEffect } from "react"
import { ChangeEvent, useReducer, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './calendarmode.module.sass'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Planner from '../../../ApiManager/api/planner';
import axios from 'axios';
import loader from '../../../assets/loading.gif'


import { useRef } from 'react';
import { AxiosResponse } from 'axios';
import { DefaultResponse, ReturnedPlanner, ReturnedPlannerResponse, ReturnedPlannerResponseMultiple } from '../../../ApiManager/interface/Interfaces';

interface Props {
    type: "study" | "exam"
    mode: "create" | "edit"
    planner?: ReturnedPlanner
}



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "12px",

};

export default function CalendarModal(props: Props) {
    const plannerApi = new Planner()


    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const [file, setFile] = useState<File[]>([]);
    const [fileURL, setFileURL] = useState<string[]>([]);

    const [fileFormData, setFileFormData] = useState<FormData[]>([]);

    const [saved, setsaved] = useState(true)
    const [links, setlinks] = useState<string[]>([])
    const [link, setlink] = useState("")
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [uploading, setuploading] = useState(false)
    const [deleting, setdeleting] = useState(false)


    const [randPlaceholder, setrandPlaceholder] = useState(["study Maths Chapter 5 for 2 hours", "Revise using quick notes", "Watch Physics lecture link attatched", "Review english assignment"])



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (props.planner !== undefined) {
            settitle(props.planner.title)
            setdescription(props.planner.description)
            setStartDate(new Date(props.planner.due_date))
            setlinks(props.planner.attatchments.links)
            setFileURL(props.planner.attatchments.files)
        }
    }, [])




    const onSaveLink = () => {
        let newlinks = links
        newlinks.push(link)
        setlinks(links)
        setlink("")
    }




    // TODO: FIX : FORMDATA IS EMPTY, UNABLE TO UPLOAD FILE AGAIN ONCE ONE IS UPLOADED

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files instanceof FileList) {
            let newFiles = []
            newFiles = file!
            newFiles.push(e.target.files[0]!)
            setFile(newFiles)
            forceUpdate()
            forceUpdate()
        } else {
            console.log("exception")
        }
    }


    const uploadFile = async () => {

        setuploading(true);
        if (file.length !== 0) {
            (async function (next) {
                file.map((item, i) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(item!)
                    reader.onload = async function (e) {
                        let rawLog = (reader?.result as string).split(",")[1]!; //extract only the file data part
                        let dataSend = {
                            dataReq: { data: rawLog, name: item!.name, type: item!.type },
                            fname: "uploadFilesToGoogleDrive",
                        };
                        const response: AxiosResponse<any> = await axios.post("https://script.google.com/macros/s/AKfycbzV9a3N1hN-5BZOgA8ngiQXXflR2o9gLgKgofK5gLAtmlcWvEGgirpSnk2Lo3rmjL70ug/exec", JSON.stringify(dataSend))
                        let newFileURL = fileURL
                        newFileURL.push(response.data.url)
                        forceUpdate()
                        next()
                    };
                })
            }(function () {
                props.mode === "create" ? savePlanner() : updatePlanner()
            }))
        } else {
            props.mode === "create" ? savePlanner() : updatePlanner()
        }

    }

    const updatePlanner = async () => {
        const planner = {
            title,
            description,
            "due_date": startDate.toString(),
            "attatchments": {
                "links": links,
                "files": fileURL
            }
        }
        const response: AxiosResponse<DefaultResponse> = await plannerApi.updatePlanner(planner, props.planner?._id!)
        location.reload()
        handleClose()

    }


    const savePlanner = async () => {

        const planner = {
            title,
            description,
            "due_date": startDate.toString(),
            "completed": false,
            "type": props.type,
            "attatchments": {
                "links": links,
                "files": fileURL
            }
        }

        const response: AxiosResponse<ReturnedPlannerResponse> = await plannerApi.createPlanner(planner)
        handleClose()
        location.reload()
    }

    const deletePlanner = async (id: string) => {
        setdeleting(true)
        const response: AxiosResponse<DefaultResponse> = await plannerApi.deletePlanner(id)
        location.reload()
    }


    return (
        <div>
            {props.mode === "create" ? <button className={styles.button} onClick={handleOpen}>Create</button> : null}
            {props.mode === "edit" ? <button style={{ fontSize: "12px", backgroundColor: "#f1f3f5", color: "#868e96", border: "1px solid #ced4da", margin: "0px" }} onClick={handleOpen}>Edit</button> : null}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div style={{ cursor: uploading ? "not-allowed" : "auto" }} className={styles.container}>
                        <div style={{ display: "flex", gap: "50px" }}>
                            <div className={styles.header}>
                                <div>
                                    <input className={styles.title} value={title} onChange={(e) => settitle(e.target.value)} placeholder={props.type === "study" ? randPlaceholder[Math.floor(Math.random() * randPlaceholder.length)] + "..." : "Add an Exam"} />
                                    <div className={styles.desc}>
                                        <p>Description</p>
                                        <textarea value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Add a Description . . .' />
                                    </div>
                                </div>
                                <div className={styles.datepicker} >
                                    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                                </div>
                            </div>
                            {props.type !== "exam" ? <div className={styles.attatchments}>
                                <h3>Attatchments</h3>
                                {links.map((item, i) => {
                                    return <p>• {item.substring(0, 35)}{item.length > 35 ? "..." : null}</p>
                                })}
                                <p>•{props.mode === "edit" ? file.length + fileURL.length : file.length} attatchments</p>
                                {saved ? <div>
                                    <button onClick={() => setsaved(false)} >Attatch a link</button>
                                    <button onClick={() => hiddenFileInput.current!.click()}>Upload your own</button>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        id="upload-file-button"
                                        hidden
                                        onChange={handleFileChange}
                                        ref={hiddenFileInput}
                                    />
                                </div> : <div>
                                    <input value={link} onChange={(e) => setlink(e.target.value)} placeholder='enter a link here' />
                                    <button onClick={() => { setsaved(true); onSaveLink() }}>Save</button>
                                    <button onClick={() => { setsaved(true) }}>Cancel</button>
                                </div>}
                            </div> : null}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <button className={styles.save_button} onClick={uploadFile}>Save</button>
                            {props.mode === "edit" ? <button style={{}} className={styles.save_button} onClick={() => deletePlanner(props.planner?._id!)}>Delete</button> : null}
                            {deleting ? <img width="30px" src={loader} /> : null}


                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}