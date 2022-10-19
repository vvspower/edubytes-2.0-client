import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./userprofile.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AxiosResponse } from "axios";
import { IGetUserResponse, User } from "../../ApiManager/interface/Interfaces";
import Auth from "../../ApiManager/api/auth";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Forum from "../../ApiManager/api/forum";
import { IMultiplePosts, IPost } from "../../ApiManager/interface/Interfaces";
import example_pfp from "../../assets/example_pfp.jpg";
import PostCard from "../../components/PostCardUI/PostCard";
import pdf from "../../assets/pdf.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Friend from "../../ApiManager/api/friend";
import { DefaultResponse } from "../../ApiManager/interface/Interfaces";
import SnackBar from "../../components/SnackBar/SnackBar";

const UserProfile = () => {
    const { username } = useParams();
    const [response_text, setResponseText] = useState<string>("")
    const [user, setUser] = useState<User | null>(null);
    const [postLoaded, setPostLoaded] = useState<boolean>(false)
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const logged_user = useSelector((state: RootState) => state.user.value);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [text, settext] = useState<string>("Add Friend")
    const [open, setOpen] = useState(false);

    const authApi = new Auth();
    const forumApi = new Forum();
    const friendApi = new Friend()


    const checkIfFriend = () => {
        user?.friends.map((item: { username: string; }, i: any) => {
            if (item.username === logged_user.username) {
                settext("You are friends")

            }
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const getUser = async () => {
        const response: AxiosResponse<IGetUserResponse> =
            await authApi.getUserFromUsername(username!);
        setUser(response.data.data);
        checkIfFriend()
    };

    const getUserPosts = async () => {
        const response: AxiosResponse<IMultiplePosts> = await forumApi.getPostUser(
            username!
        );
        if (response.status === 200) {
            setPostLoaded(true)
            setUserPosts(response.data.data);
        };
    }

    console.log(user?.friends)
    const sendFriendRequest = async () => {
        try {
            const response: AxiosResponse<DefaultResponse> = await friendApi.sendFriendRequest(username!)
            setResponseText(response.data.data)
            setOpen(true)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                error.response.status! === 403 ? settext("You are friends") : null;
                setResponseText(error.response?.data.data!)
                setOpen(true)
            }
        }
    }

    const acceptFriendRequest = async () => {
        try {
            const response: AxiosResponse<DefaultResponse> = await friendApi.acceptFriendRequest(username!)
            setResponseText(response.data.data)
            setOpen(true)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setResponseText(error.response?.data.data!)
                setOpen(true)
            }
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        getUserPosts();
        getUser();
    }, []);


    const postStack: JSX.Element = (
        <>
            <Stack
                sx={{ padding: "15px", backgroundColor: "white", borderRadius: "16px" }}
                spacing={1}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={100} />
                </div>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Skeleton sx={{ borderRadius: "25px" }} variant="circular" width={60} height={30} />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Skeleton sx={{ borderRadius: "25px" }} variant="circular" width={60} height={30} />
                        <Skeleton sx={{ borderRadius: "25px" }} variant="circular" width={60} height={30} />
                        <Skeleton variant="circular" width={30} height={30} />
                    </div>
                </div>
            </Stack>
        </>
    );

    return (
        <div className={styles.container}>
            <SnackBar open={open} text={response_text} handleClose={handleClose} />
            <div className={styles.left}>
                <div className={styles.user}>
                    <img src={user?.details.pfp} />
                    <p>@{user?.username}</p>
                    <span>
                        {user?.details.bio}
                    </span>
                    <h1>Study's at: {user?.education.institute}</h1>
                    {logged_user.username === username ? (
                        <button className={styles.edit_btn}>Edit Profile</button>
                    ) : (
                        <div className={styles.user_interact}>
                            <button onClick={sendFriendRequest}>{text}</button>
                            <button>Message</button>
                        </div>
                    )}
                </div>
                <div className={styles.friends}>
                    <p style={{ padding: "8px 10px" }}>Friends</p>
                    <main>
                        <div className={styles.friend}>
                            <img src={user?.details.pfp} />
                            <p>@username</p>
                        </div>
                        <div className={styles.friend}>
                            <img src={user?.details.pfp} />
                            <p>@username</p>
                        </div>
                        <div className={styles.friend}>
                            <img src={user?.details.pfp} />
                            <p>@username</p>
                        </div>
                    </main>
                    <button>View all &gt;</button>
                </div>
                <div className={styles.similar_users}>
                    <span>Similar users</span>
                    <div className={styles.similar_user}>
                        <div>
                            <img src={example_pfp} />
                        </div>
                        <div>
                            <p>username</p>
                            <AddCircleIcon sx={{ fill: "#4dabf7" }} />
                        </div>
                    </div>
                    <div className={styles.similar_user}>
                        <div>
                            <img src={example_pfp} />
                        </div>
                        <div>
                            <p>username</p>
                            <AddCircleIcon sx={{ fill: "#4dabf7" }} />
                        </div>
                    </div>
                    <div className={styles.similar_user}>
                        <div>
                            <img src={example_pfp} />
                        </div>
                        <div>
                            <p>username</p>
                            <AddCircleIcon sx={{ fill: "#4dabf7" }} />
                        </div>
                    </div>
                </div>
            </div>

            {postLoaded ? <div className={styles.posts}>
                {userPosts.map((item, i) => {
                    return (
                        <div className={styles.post}>
                            <PostCard
                                _id={item._id}
                                username={item.username}
                                created={item.created}
                                image={item.image}
                                subject={item.subject}
                                tags={item.tags}
                                pfp={item.user_pfp}
                                content={item.content}
                                likes={item.likes}
                            />
                        </div>
                    );
                })}
            </div> : <div className={styles.posts}>
                {postStack}
            </div>}
            <div className={styles.right}>
                <main className={styles.contributions}>
                    <div>
                        <img src={example_pfp} />
                        <p>uploaded notes for: Computer Science (9618)</p>
                    </div>
                    <div>
                        <img src={example_pfp} />
                        <p>uploaded notes for: Computer Science (9618)</p>
                    </div>
                    <div>
                        <img src={example_pfp} />
                        <p>uploaded notes for: Computer Science (9618)</p>
                    </div>
                    <div>
                        <img src={example_pfp} />
                        <p>uploaded notes for: Computer Science (9618)</p>
                    </div>
                    <div>
                        <img src={example_pfp} />
                        <p>uploaded notes for: Computer Science (9618)</p>
                    </div>
                    <h1> Latest contributions</h1>
                </main>
                <div className={styles.favorites}>
                    <main>
                        <div className={styles.fav}>
                            <div>
                                <img src={pdf} />
                            </div>
                            <div>
                                <h1>A Level Physics Notes</h1>
                                <p>by Abdul Ghani</p>
                            </div>
                        </div>
                        <div>
                            <ArrowRightIcon sx={{ fill: "#868e96" }} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};


export default UserProfile;
