import * as React from 'react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { useState, useEffect, useReducer, useRef } from 'react';
import Auth from '../../../ApiManager/api/auth';
import Forum from '../../../ApiManager/api/forum';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './edit.module.sass'
import Resource from '../../../ApiManager/api/resources';
import { IDefaultResponse } from '../../../ApiManager/interface/Interfaces';
import Cloudinary from '../../../ApiManager/cloudinaryApi/cloudinary';


interface Props {
    open: boolean
    handleClose: () => void

    pfp: string
    bio: string
    verified: boolean

    education?: {
        institute: string
        college: boolean,
        university: boolean
        subjects: string[]
    }
    subjects?: string[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ced4da',
    borderRadius: "12px",
    boxShadow: 24,
    p: 2,
};



export default function EditProfileModal(props: Props) {
    const resourceApi = new Resource()
    const cloudinaryApi = new Cloudinary()
    const authApi = new Auth()
    const [uploading, setuploading] = useState<boolean>(false)


    const [bio, setbio] = useState<string>("")
    // const [pfp, setpfp] = useState<string>("")

    const [image, setImage] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");
    const [imageFile, setImageFile] = useState<Blob>();

    const hiddenImageFileInput = useRef<HTMLInputElement>(null);

    const [institute, setinstitute] = useState<string>("")
    const [college, setcollege] = useState<boolean>(false)
    const [university, setuniversity] = useState<boolean>(false)
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);




    useEffect(() => {
        console.log(props.bio, props.education?.institute)
        setbio(props.bio!)
        setinstitute(props.education?.institute!)
    }, [props])


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (image.length >= 5) {
                return
            } else {
                let imageNew: string = image
                imageNew = URL.createObjectURL(event.target.files[0]!)
                setImage(imageNew)
                // setpfp("new")
                forceUpdate()
                let imageFileNew: Blob = imageFile!
                imageFileNew = event.target.files[0]
                setImageFile(imageFileNew);
            }
        }
    }

    const uploadImage = async () => {
        (async function (next) {
            let formData: FormData | undefined = new FormData();
            formData.append("file", imageFile!);
            formData.append("upload_preset", "mb3hrwz7");
            try {
                const response: string = await cloudinaryApi.uploadImage(formData!)
                next(response)

            } catch (err: any) {
                if (axios.isAxiosError(err)) {
                    console.log("something went wrong")
                }
            }
        }(function (url: string) {
            profileUpdater(url)
        }))
    }


    //  add changing profile functionality component

    const updateProfile = () => {
        setuploading(true)
        console.log(image)
        if (image != "") {
            uploadImage()
        } else {
            profileUpdater("")
        }
    }


    const profileUpdater = async (url?: string) => {
        let details = {
            bio: bio,
            pfp: url === "" ? props.pfp : url,
            verified: true
        }
        let education = {
            institute: institute,
            college: props.education?.college,
            university: props.education?.university,
            subjects: props.education?.subjects
        }
        console.log("hello i am here")
        const response: AxiosResponse<IDefaultResponse> = await authApi.updateUser(details, education)
        console.log(response.data.data)
        setuploading(false)
        location.reload()
    }


    return (
        <div >

            <Modal
                open={props.open}
                onClose={() => props.handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ pointerEvents: uploading ? "none" : "auto", cursor: uploading ? "progress" : "auto" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Profile
                        </Typography>
                        <div className={styles.pfp}>
                            {image == "" ? <img src={props.pfp} /> : <img src={image} />}
                            <div onClick={() => {
                                hiddenImageFileInput.current!.click()
                            }}  >
                                <button>Change Profile Picture</button>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id="upload-file-button"
                                hidden
                                onChange={handleImageChange}
                                ref={hiddenImageFileInput}
                            />
                        </div>
                        <div className='details'>
                            <div className={styles.inputs}>
                                <div>
                                    <p>bio</p>
                                    <input value={bio} onChange={(e) => setbio(e.target.value)} placeholder='Bio' />
                                </div>
                                <div>
                                    <p>institute</p>
                                    <input value={institute} onChange={(e) => setinstitute(e.target.value)} placeholder='institute' />
                                </div>
                            </div>


                        </div>
                        <div>
                            <button onClick={updateProfile}>Update Profile</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}