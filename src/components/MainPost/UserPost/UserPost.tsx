import * as timeago from "timeago.js";
import React, { useState, useEffect, useReducer } from 'react'
import { KeyboardEvent } from 'react';
import styles from './post.module.sass'
import Forum from '../../../ApiManager/api/forum'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { IPost, IDefaultResponse, IPostReply } from "../../../ApiManager/interface/Interfaces";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { ILikes } from '../../../ApiManager/api/forum';
import { ILikes } from "../../../ApiManager/interface/Interfaces";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
// import { Replies } from "../../../ApiManager/api/forum";
import { Replies } from "../../../ApiManager/interface/Interfaces";
import { RootState } from "../../../store/store";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { SuggestedPost, ResponseSuggestedPost, SuggestedUser } from "../../../ApiManager/interface/Interfaces";
import Suggestions from "../../../ApiManager/api/suggestions";
import SendIcon from '@mui/icons-material/Send';
import { AxiosResponse } from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlagIcon from '@mui/icons-material/Flag';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Edit from "@mui/icons-material/Edit";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: "16px",
    border: "none",
    boxShadow: 24,
    p: 1,
};



const UserPost = (props: IPost) => {
    const forumApi = new Forum()
    const suggestedApi = new Suggestions

    const navigate = useNavigate()

    const user = useSelector((state: RootState) => state.user.value);
    const [fetched, setFetched] = useState<boolean>(false)
    const [deletedLoad, setDeletedLoading] = useState<boolean>(false)
    const [editedLoad, setEditedLoading] = useState<boolean>(false)


    const [likes, setLikes] = useState<ILikes[]>(props.likes)
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [liked, setLiked] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [replies, setReplies] = useState<Replies[]>([])
    const [content, setContent] = useState<string>("")



    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);


    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [textEdit, settextEdit] = useState(props.content)



    const deletePost = async () => {
        setDeletedLoading(true)
        const response: AxiosResponse<IDefaultResponse> = await forumApi.deletePost(props._id)
        setDeletedLoading(false)
        navigate("/")
    }

    const updatePost = async () => {
        setEditedLoading(true)
        const response: AxiosResponse<IDefaultResponse> = await forumApi.updatePost(textEdit, props._id)
        setEditedLoading(false)
        location.reload()
    }



    const getReplies = async () => {
        const response: Replies[] = await forumApi.getReplies(props._id)
        setReplies(response)
        forceUpdate()
        setSuccess(true)

    }

    const newLike: ILikes = {
        username: user.username,
        user_pfp: user.details.pfp,
        type: "like"
    }

    const handleLike = (): void => {
        setLiked(!liked)
        forumApi.postLike(!liked, props._id)
        if (!liked) {
            let newlikes = likes
            newlikes.push(newLike)
            setLikes(newlikes)
        } else {
            const newArr = likes.filter(e => e.username !== user.username)
            setLikes(newArr)
        }
    }

    const postReply = async () => {
        if (content.length >= 2) {
            const response: AxiosResponse<IPostReply> = await forumApi.postReply(props._id, content)
            let current_replies: Replies[] = replies
            replies.push(response.data.data)
            setContent("")
            forceUpdate()
        }
    }

    const checkLiked = (): void => {
        props.likes.forEach(item => {
            if (item.username === user.username) {
                setLiked(true)
                forceUpdate()
            }
        });
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            postReply()
        }
    };

    useEffect(() => {
        checkLiked()
        window.scrollTo(0, 0)
        getReplies()

    }, [])



    return (
        <div className={styles.container}>
            <div>
                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography sx={{ paddingLeft: "15px", paddingTop: "10px" }} id="modal-modal-title" variant="subtitle1" component="h2">
                            Are you sure you want to delete this post?
                        </Typography>

                        <div style={{ marginTop: "10px" }} >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button onClick={deletePost}>OK</Button>
                                <Button onClick={() => setOpenDelete(false)}>CANCEL</Button>
                                {deletedLoad ? <Box sx={{ marginLeft: "10px" }}><CircularProgress size="1rem" color="primary" /></Box> : null}
                            </div>
                        </div>
                    </Box>
                </Modal >
            </div >
            <div>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography sx={{ paddingLeft: "15px", paddingTop: "5px" }} id="modal-modal-title" variant="h6" component="p">
                            Edit Post
                        </Typography>
                        <div style={{ paddingLeft: "15px", paddingRight: "15px", marginTop: "10px" }}>
                            <textarea onChange={(e) => settextEdit(e.target.value)} value={textEdit} style={{ width: "95%", borderRadius: "8px", border: "none", backgroundColor: "#f8f9fa", outline: "none", padding: "10px", maxWidth: "350px", height: "100px" }} placeholder="Enter new text" />
                        </div>
                        <div style={{ marginTop: "10px" }} >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button disabled={textEdit === props.content ? true : false} onClick={updatePost}>UPDATE</Button>
                                <Button onClick={() => setOpenEdit(false)}>CANCEL</Button>
                                {editedLoad ? <Box sx={{ marginLeft: "10px" }}><CircularProgress size="1rem" color="primary" /></Box> : null}
                            </div>
                        </div>
                    </Box>
                </Modal >
            </div>
            <div className={styles.mainpost}>
                <div className={styles.header}>
                    <div className={styles.head}>
                        <img src={props.user_pfp} />
                        <div>
                            <p>{props.username}</p>
                            <span>{timeago.format(parseInt(props.created + "000"))}</span>
                        </div>
                    </div>

                </div>
                <div className={styles.content}>
                    <img src={props.image} />
                    <p>{props.content}</p>
                </div>
                <div className={styles.footer}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div onClick={handleLike} className={styles.likes}>
                            <div style={{ cursor: "pointer" }} >
                                {!liked ? <FavoriteBorderIcon fontSize="small" sx={{ fill: "#868e96" }} /> : <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", }} />}
                                <span>{likes?.length}</span>
                            </div>
                            <div className={styles.userlikespfp}>
                                <AvatarGroup max={4} >
                                    {likes?.map((item, i) => {
                                        return <Avatar key={i} sx={{ height: "18px", width: "18px" }} alt={item.username} src={item.user_pfp} />
                                    })}
                                </AvatarGroup>
                            </div>
                        </div>
                        <div>
                            {user.username === props.username ? <DeleteOutlineIcon onClick={handleOpenDelete} fontSize="small" sx={{ fill: "#868e96", cursor: "pointer", marginRight: "8px" }} /> : null}
                            {user.username === props.username ? <EditIcon onClick={handleOpenEdit} fontSize="small" sx={{ fill: "#868e96", cursor: "pointer" }} /> : null}
                            <FlagIcon fontSize="small" sx={{ fill: "#868e96", cursor: "pointer", marginLeft: "5px" }} />
                        </div>
                    </div>
                    <div className={styles.normal_chip} >
                        {props?.tags?.slice(0, 3).map((item, i) => {
                            return <Chip
                                key={i}
                                sx={{
                                    marginRight: 1, backgroundColor: "#D7EFE0", color: "#37b24d"
                                }}
                                label={item}
                                size="small"
                            />
                        })
                        }
                    </div>
                    <div className={styles.chip_mobile}>
                        {props?.tags?.slice(0, 1).map((item, i) => {
                            return <Chip
                                key={i}
                                sx={{
                                    marginRight: 1, backgroundColor: "#D7EFE0", color: "#37b24d"
                                }}
                                label={item}
                                size="small"
                            />

                        })
                        }
                        <p style={{ fontSize: "12px" }}>{(props.tags.length - 1) !== 0 ? "+" + (props.tags.length - 1).toString() : null}</p>
                    </div>
                </div>
            </div>
            <div className={styles.comments}>
                <div className={styles.replybox}>
                    <img width="30px" height="30px" src={user.details.pfp} />
                    <input value={content} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setContent(e.target.value)} placeholder="Comment" />
                    <div onClick={postReply} className={styles.send_icon}>
                        <SendIcon style={{ fill: "#868e96", cursor: "pointer" }} />
                    </div>
                </div>
                <div className={styles.replies}>
                    {success && replies.length === 0 ? <h5>No replies</h5> : null}
                    {success ?
                        replies.map((item, i) => {
                            return <div key={i} className={styles.reply}>
                                <div className={styles.head}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <img src={item.user_pfp} />
                                        <h1>{item.username}</h1>
                                    </div>
                                    <span>{timeago.format(parseInt(item.created + "000"))}</span>
                                </div>
                                <div>
                                    <div style={{ display: "flex", padding: "0", justifyContent: "space-between", gap: "10px" }}>
                                    </div>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        })
                        : <Box  ><CircularProgress size="1rem" color="inherit" /></Box>}
                </div>

            </div>
        </div >
    )
}

// todo: add spinner while comments load

export default UserPost