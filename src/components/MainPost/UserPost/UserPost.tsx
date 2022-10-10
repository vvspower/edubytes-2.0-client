import * as timeago from "timeago.js";
import React, { useState, useEffect, useReducer } from 'react'
import { KeyboardEvent } from 'react';
import styles from './post.module.sass'
import Forum, { IDefaultResponse, IPost, IPostReply } from '../../../ApiManager/forum'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ILikes } from '../../../ApiManager/forum';
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import { Replies } from "../../../ApiManager/forum";
import { RootState } from "../../../store/store";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { AxiosResponse } from "axios";
import Suggestions, { ResponseSuggestedPost, SuggestedPost, SuggestedUser } from "../../../ApiManager/suggestions";



const UserPost = (props: IPost) => {
    const forumApi = new Forum()
    const suggestedApi = new Suggestions
    const user = useSelector((state: RootState) => state.user.value);
    const [fetched, setFetched] = useState<boolean>(false)

    const [likes, setLikes] = useState<ILikes[]>(props.likes)
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [liked, setLiked] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [replies, setReplies] = useState<Replies[]>([])
    const [content, setContent] = useState<string>("")



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
            <div className={styles.header}>
                <div className={styles.head}>
                    <img src={props.user_pfp} />
                    <div>
                        <p>{props.username}</p>
                        <span>{timeago.format(parseInt(props.created + "000"))}</span>
                    </div>
                </div>
                <MoreHorizIcon sx={{ fill: "#868e96", }} />
            </div>
            <div className={styles.content}>
                <p>{props.content}</p>
                <img src={props.image} />
            </div>
            <div className={styles.footer}>
                <div className={styles.likes}>
                    <div style={{ cursor: "pointer" }} onClick={handleLike}>
                        {!liked ? <FavoriteBorderIcon fontSize="small" sx={{ fill: "#868e96" }} /> : <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", }} />}
                        <span>{likes?.length}</span>
                    </div>
                    <div className={styles.userlikespfp}>
                        {likes?.slice(0, 4).map((item, i) => {
                            return <img key={i} src={item.user_pfp} />;
                        })}
                    </div>
                </div>
                <div>
                    {props?.tags?.slice(0, 3).map((item, i) => {
                        return <Chip
                            key={i}
                            sx={{ marginRight: 1 }}
                            label={item}
                            size="small"
                        />
                    })
                    }
                </div>
            </div>
            <div className={styles.comments}>
                <div className={styles.replybox}>
                    <img width="30px" height="30px" src={user.details.pfp} />
                    <input value={content} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setContent(e.target.value)} placeholder="Comment" />
                    <div onClick={postReply}>
                        <SendIcon style={{ fill: "#868e96", cursor: "pointer" }} />
                    </div>
                </div>
                <div className={styles.replies}>
                    {success && replies.length === 0 ? <h5>No replies</h5> : null}
                    {success ?
                        replies.map((item, i) => {
                            return <div key={i} className={styles.reply}>
                                <img src={item.user_pfp} />
                                <div>
                                    <div style={{ display: "flex", padding: "0", justifyContent: "space-between", gap: "10px" }}>
                                        <h1>{item.username}</h1>
                                        <span>{timeago.format(parseInt(item.created + "000"))}</span>
                                    </div>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        })
                        : <Box  ><CircularProgress size="1rem" color="inherit" /></Box>}
                </div>

            </div>
        </div>
    )
}

// todo: add spinner while comments load

export default UserPost