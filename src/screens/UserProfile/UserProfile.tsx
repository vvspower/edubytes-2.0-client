import React, { useEffect, useState, useReducer } from "react";

import pdfimg from '../../assets/pdf.png'
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./userprofile.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AxiosResponse } from "axios";
import { IDefaultResponse, IGetUserResponse, ResponseSuggestedUser, ReturnedResource, SuggestedUser, User } from "../../ApiManager/interface/Interfaces";
import { ReturnedResourceResponse } from "../../ApiManager/interface/Interfaces";
import CreatePostBar from "../../components/Home/CreatePostBar/CreatePostBar";
import Auth from "../../ApiManager/api/auth";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Forum from "../../ApiManager/api/forum";
import Resource from "../../ApiManager/api/resources";
import { useLocation } from "react-router-dom";
import { IMultiplePosts, IPost } from "../../ApiManager/interface/Interfaces";
import example_pfp from "../../assets/example_pfp.jpg";
import PostCard from "../../components/PostCardUI/PostCard";
import pdf from "../../assets/pdf.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Carousel from "react-multi-carousel";

import Friend from "../../ApiManager/api/friend";
import { DefaultResponse } from "../../ApiManager/interface/Interfaces";
import SnackBar from "../../components/SnackBar/SnackBar";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import Suggestions from "../../ApiManager/api/suggestions";
import { userInfo } from "os";
import { flexbox } from "@mui/system";
import Cloudinary from "../../ApiManager/cloudinaryApi/cloudinary";
import VerifiedIcon from '@mui/icons-material/Verified';

const UserProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate()
    const [resources, setResources] = useState<ReturnedResource[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [response_text, setResponseText] = useState<string>("")
    const [showPublicResources, setShowPublicResources] = useState<boolean>(true)
    const [notFound, setnotFound] = useState(false)
    // const [showPrivateResources, setShowPrivateResources] = useState<boolean>(false)
    // const [hideResources, setHideResources] = useState<boolean>(true)
    const [suggestedUser, setsuggestedUser] = useState<SuggestedUser[]>([])
    const { pathname } = useLocation();
    const [showSuggested, setshowSuggested] = useState<boolean>(true)
    const [showPosts, setshowPosts] = useState<boolean>(true)
    const [showFriends, setshowFriends,] = useState<boolean>(false)
    const [showResources, setshowResources] = useState<boolean>(false)

    const [user, setUser] = useState<User | null>(null);
    const [postLoaded, setPostLoaded] = useState<boolean>(false)
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const logged_user = useSelector((state: RootState) => state.user.value);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [text, settext] = useState<string>("Add Friend")
    const [open, setOpen] = useState(false);
    const [userloaded, setuserloaded] = useState(false)

    const authApi = new Auth();
    const forumApi = new Forum();
    const friendApi = new Friend()
    const resourceApi = new Resource()
    const suggestedApi = new Suggestions()



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
        try {
            const response: AxiosResponse<IGetUserResponse> =
                await authApi.getUserFromUsername(username!);
            if (response.status === 404) {
                setnotFound(true)
            }
            setUser(response.data.data);
            checkIfFriend()
            setuserloaded(true)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<IDefaultResponse>
                if (err.response?.status === 404) {
                    setnotFound(true)
                }
            }
        }
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

    const getSuggestedUsers = async () => {
        const response: AxiosResponse<ResponseSuggestedUser> = await suggestedApi.getSuggestedUsers(username!)
        setsuggestedUser(response.data.data)
    }

    const sendFriendRequest = async () => {
        try {
            const response: AxiosResponse<DefaultResponse> = await friendApi.sendFriendRequest(username!)
            setResponseText(response.data.data)
            setOpen(true)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<IDefaultResponse>
                err.response?.status! === 403 ? settext("You are friends") : null;
                setResponseText(err.response?.data.data!)
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
                const err = error as AxiosError<IDefaultResponse>
                setResponseText(err.response?.data.data!)
                setOpen(true)
            }
        }
    }

    const getUserResources = async () => {
        if (username === logged_user.username) {
            const response: AxiosResponse<ReturnedResourceResponse> = await resourceApi.getUserResourcesWithAuth()
            setResources(response.data.data)
        } else {
            const response: AxiosResponse<ReturnedResourceResponse> = await resourceApi.getUserResourcesWithNoAuth(username!)
            setResources(response.data.data)
        }
    }

    const onShowDetailsChange = (value: string) => {
        if (value === "friends") {
            setshowFriends(true)
            setshowPosts(false)
            setshowResources(false)
        }
        if (value === "resources") {
            setshowFriends(false)
            setshowPosts(false)
            setshowResources(true)
        }
        if (value === "posts") {
            setshowFriends(false)
            setshowPosts(true)
            setshowResources(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getUser();
        getUserPosts();
        getUserResources()
        forceUpdate()
        username === logged_user.username ? getSuggestedUsers() : null
    }, [logged_user.username, username]);

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
        <>
            {!notFound ? <div className={styles.container}>
                <div>
                    {user?.username != "" ? <EditProfileModal pfp={user?.details.pfp!} bio={user?.details.bio!} education={user?.education} open={openModal} handleClose={() => setOpenModal(false)} /> : null}
                </div>
                <SnackBar open={open} text={response_text} handleClose={handleClose} />
                <div className={styles.user_header_details}>
                    <div className={styles.color}>

                    </div>
                    <main>
                        <div>
                            {userloaded ? <img style={{ backgroundColor: "white" }} className={styles.pfp} src={user?.details.pfp} /> : null}
                        </div>
                        <div className={styles.header_text} >
                            <div>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <h2>{user?.username}</h2>
                                    {user?.admin ? <VerifiedIcon fontSize="small" sx={{ fill: "#339af0" }} /> : null}
                                </div>
                                <p style={{ color: "#495057", fontSize: "14px" }} >{user?.education.institute}</p>
                                <p >{user?.details.bio.substring(0, 210)}</p>
                                {userloaded ? <p style={{ marginTop: "5px" }}>{user?.friends.length} Friends</p> : null}
                                {user?.friends.map((item, i) => {
                                    return <img style={{ position: "relative", height: "20px", width: "20px", margin: "0px", padding: "0px", borderRadius: "50%", marginTop: "5px" }} src={item.pfp} />
                                })}
                            </div>
                            {/* todo: fix this */}
                            {userloaded ? <div className={styles.edit_buttons} style={{ marginRight: "30px" }}>
                                {logged_user.username !== username ?
                                    <>
                                        <button className={styles.interact_button} onClick={sendFriendRequest}>{text}</button>
                                        <button className={styles.interact_button}>Message</button>
                                    </> : <button className={styles.edit_button} onClick={() => { setOpenModal(true) }} >Edit Profile</button>}
                            </div> : null}
                        </div>
                    </main>
                    <div style={{ marginTop: user?.friends.length === 0 ? "40px" : "0px" }} className={styles.interaction_btns}>
                        <button onClick={() => onShowDetailsChange("posts")} style={{ color: showPosts ? "#339af0" : "#868e96", borderBottom: showPosts ? "2px solid #339af0" : " 2px solid white" }}>Posts</button>
                        <button onClick={() => onShowDetailsChange("friends")} style={{ color: showFriends ? "#339af0" : "#868e96", borderBottom: showFriends ? "2px solid #339af0" : " 2px solid white" }}>Friends</button>
                        <button onClick={() => onShowDetailsChange("resources")} style={{ color: showResources ? "#339af0" : "#868e96", borderBottom: showResources ? "2px solid #339af0" : " 2px solid white" }}>Resources</button>
                    </div>
                </div >
                <div className={styles.main}>
                    {localStorage.getItem("showSuggested") === null ? <>
                        {logged_user.username === user?.username ?
                            <div>
                                {showSuggested ? <div className={styles.suggested_users}>
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
                                        <h1>People you may know</h1>
                                        <img style={{ cursor: "pointer" }} onClick={() => { setshowSuggested(false); localStorage.setItem("showSuggested", "false") }} height={20} src="https://img.icons8.com/material-outlined/512/delete-sign.png" alt='mySvgImage' />
                                    </div>
                                    {suggestedUser.slice(0, 5).map((item, i) => {
                                        return <div style={{ display: "flex", gap: "10px" }}>
                                            <div className={styles.user}>
                                                <img src={item.details.pfp} />
                                                <p>{item.username}</p>
                                                <button>Add Friend</button>
                                            </div>

                                        </div>
                                    })}
                                </div> : null}
                            </div>
                            : null}
                    </> : null}

                    {showPosts ?
                        <div className={styles.profile_main}>
                            <div className={styles.sidecard}>
                                <div className={styles.intro}>
                                    <div>
                                        <h1>Bio</h1>
                                        <p>{user?.details.bio}</p>
                                    </div>
                                    <div>
                                        <p>Studies at <strong>{user?.education.institute}</strong></p>
                                    </div>
                                </div>
                                <div className={styles.friends}>
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", paddingTop: "10px" }}>
                                        <h1>Friends</h1>
                                        <p onClick={() => onShowDetailsChange("friends")} style={{ color: "#868e96", fontSize: "12px", cursor: "pointer" }} >See all friends</p>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        {user?.friends.slice(0, 3).map((item, i) => {
                                            return <div onClick={() => { navigate(`/u/${item.username} `) }} className={styles.friend_item}>
                                                <img src={item.pfp} />
                                                <p>{item.username}</p>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {logged_user.username === user?.username ? <div className={styles.post_bar}><CreatePostBar pfp={logged_user.details.pfp} type={"post"} /></div> : null}
                                <div className={styles.post_filter}>
                                    <h1>Posts</h1>
                                </div>
                                {
                                    postLoaded ? <div className={styles.posts}>
                                        {userPosts.length !== 0 ? userPosts.map((item, i) => {
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
                                        }) : <div className={styles.noposts}>
                                            {logged_user.username === user?.username ? <><h1>Get started by posting a question or a query, or quite anything.</h1></> : <h1>{user?.username} has not yet posted anything </h1>}

                                        </div>}
                                    </div> : <div className={styles.posts}>
                                        {postStack}
                                    </div>
                                }
                            </div>
                        </div>
                        : null}
                    {showResources ? <div className={styles.resources}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div>
                                <p>Resources</p>
                            </div>
                            <div>
                                <button onClick={() => { setShowPublicResources(true), forceUpdate() }} style={{ backgroundColor: showPublicResources ? "#339af0" : "#1864ab" }}>Public</button>
                                {logged_user.username === user!.username ? <button onClick={() => { setShowPublicResources(false) }} style={{ backgroundColor: showPublicResources! ? "#1864ab" : "#339af0" }}>Private</button> : null}
                            </div>
                        </div>
                        <div>
                            <main>
                                {showPublicResources ? resources.filter(item => {
                                    return item.visibility === "public"
                                }).splice(0, 4).map((item, i) => {
                                    return <div onClick={() => { navigate(`/resources/view/${item._id}`) }} className={styles.resource}>
                                        <img src={item.preview_image !== "" ? item.preview_image : pdfimg} />
                                        <p>{item.resource_title.substring(0, 100)}</p>
                                    </div>
                                }) : resources.filter(item => {
                                    return item.visibility === "private"
                                }).splice(0, 4).map((item, i) => {
                                    return <div onClick={() => { navigate(`/resources/view/${item._id}`) }} className={styles.resource}>
                                        <img src={item.preview_image !== "" ? item.preview_image : pdfimg} />
                                        <p>{item.resource_title.substring(0, 80)}</p>
                                    </div>
                                })}
                            </main>
                        </div>
                    </div> : null}
                    {showFriends ? <div className={styles.friends} style={{ marginTop: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", paddingTop: "10px" }}>
                            <h1>Friends</h1>
                        </div>
                        <div className={styles.show_friends} >
                            {user?.friends.map((item, i) => {
                                return <div onClick={() => { navigate(`/u/${item.username} `); location.reload() }} className={styles.friend_item}>
                                    <img src={item.pfp} />
                                    <p>{item.username}</p>
                                </div>
                            })}
                        </div>

                    </div> : null}
                </div>

            </div > : <h1 style={{ marginTop: "60px" }}>User not found</h1>}
        </>
    );
};




export default UserProfile;
