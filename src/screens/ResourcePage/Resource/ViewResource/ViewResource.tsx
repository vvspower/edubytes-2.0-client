import React, { useEffect, useState, useCallback } from 'react'
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import Resource from '../../../../ApiManager/api/resources';
import { IDefaultResponse, ResourceResponse, ReturnedResource, ReturnedResourceResponseSingle } from '../../../../ApiManager/interface/Interfaces';
import ImageViewer from 'react-simple-image-viewer';
import { Axios, AxiosResponse } from 'axios';
import Viewer from 'react-viewer';
import { useParams } from 'react-router-dom';
import styles from './viewresource.module.sass'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RootState } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const ViewResource = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [resource, setResource] = useState<ReturnedResource>()
    const [visible, setVisible] = useState<boolean>(true);
    const logged_user = useSelector((state: RootState) => state.user.value);
    const [images, setImages] = useState<any>([])
    const [rating, setRating] = useState(0);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)
    const handleOpen = () => setOpenDeleteModal(true);
    const handleClose = () => setOpenDeleteModal(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        borderRadius: "12px",
        boxShadow: 24,
        p: 2,
    };

    const resourceApi = new Resource

    const getResource = async () => {
        const response: AxiosResponse<ReturnedResourceResponseSingle> = await resourceApi.getOneResource(id!)
        let imgs: {}[] = []
        if (response.data.data.file_type === "image") {
            response.data.data.link.map((item, i) => {
                imgs.push({ "src": item });
            })
            setImages(imgs)
        }
        setResource(response.data.data)
    }

    const deleteResource = async () => {
        setDeleteLoading(true)
        const response: AxiosResponse<IDefaultResponse> = await resourceApi.deleteResource(id!)
        navigate("/")
    }


    const changeRating = async (newRating: number) => {
        const response: AxiosResponse<ResourceResponse> = await resourceApi.changeRating(id!, newRating)
    }

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
    }



    useEffect(() => {
        getResource()

    }, [])


    return (
        <div className={styles.container}>
            <Modal
                // sx={{ maxWidth: "200px" }}
                open={openDeleteModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="p">
                        Are you sure you want to delete?
                    </Typography>
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button disabled={deleteLoading} onClick={deleteResource}>Delete</Button>
                        <Button disabled={deleteLoading} onClick={handleClose}>CANCEL</Button>
                        {deleteLoading ? <Box><CircularProgress size="1rem" color="inherit" /></Box> : null}
                    </div>
                </Box>
            </Modal>
            {resource?.file_type === "pdf" ?
                <div className={styles.pdf}>
                    <div className={styles.header}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
                            <h5 >{resource?.resource_title.substring(0, 40)} </h5>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <div>
                                    <p>{resource.rating}</p>
                                    <ReactStars
                                        count={5}
                                        onChange={changeRating}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div>
                                    <img src={resource?.user_pfp} />
                                    <p>{resource?.username}</p>
                                </div>
                            </div>
                            <div>
                                <p>You rated: {resource.user_rated} stars </p>
                            </div>
                            {logged_user.username === resource.username ? <div onClick={handleOpen} className={styles.delete}>
                                <DeleteOutlineIcon fontSize="small" sx={{ fill: "#868e96", cursor: "pointer" }} />
                                <p>Delete</p>
                            </div> : null}
                        </div>
                    </div>
                    <div className={styles.pdf_viewer}>
                        {resource ? <iframe src={resource?.link[0].slice(0, -17) + "preview"} width="840" height="800px" allow="autoplay"></iframe> : null}
                    </div>
                </div>
                : null}
            {resource?.file_type === "image" ? <div className={styles.images}>
                <div className={styles.header}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h5 >{resource?.resource_title.substring(0, 40)}</h5>
                        <div>
                            <p>{resource.rating}</p>
                            <ReactStars
                                count={5}
                                onChange={changeRating}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <p>You rated: {resource.user_rated} stars </p>
                    </div>
                    <div>
                        <img src={resource?.user_pfp} />
                        <p>{resource?.username}</p>
                    </div>
                </div>
                {logged_user.username === resource.username ? <div onClick={handleOpen} className={styles.delete}>
                    <DeleteOutlineIcon fontSize="small" sx={{ fill: "#868e96", cursor: "pointer" }} />
                    <p>Delete</p>
                </div> : null}
                <div className={styles.imageviewer}>
                    <button style={{ marginTop: "20px" }} onClick={() => { setVisible(true); }}>Show Images</button>
                    <Viewer
                        visible={visible}
                        onClose={() => { setVisible(false); }}
                        images={images}
                    />
                </div>
            </div> : null}


        </div >
    )
}

export default ViewResource