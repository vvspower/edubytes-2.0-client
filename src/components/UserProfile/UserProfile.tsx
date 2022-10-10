import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./userprofile.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AxiosResponse } from "axios";
import { IGetUserResponse } from "../../ApiManager/auth";
import { User } from "../../ApiManager/auth";
import Auth from "../../ApiManager/auth";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Forum, { IMultiplePosts, IPost } from "../../ApiManager/forum";
import example_pfp from "../../assets/example_pfp.jpg";
import PostCard from "../PostCardUI/PostCard";
import pdf from "../../assets/pdf.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Chip } from "@mui/material";

const UserProfile = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [postLoaded, setPostLoaded] = useState<boolean>(false)
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const logged_user = useSelector((state: RootState) => state.user.value);

    const authApi = new Auth();
    const forumApi = new Forum();

    const getUser = async () => {
        const response: AxiosResponse<IGetUserResponse> =
            await authApi.getUserFromUsername(username!);
        setUser(response.data.data);
    };

    const getUserPosts = async () => {
        const response: AxiosResponse<IMultiplePosts> = await forumApi.getPostUser(
            username!
        );
        if (response.status === 200) {
            setPostLoaded(true)
        }
        setUserPosts(response.data.data);
    };

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
            <div className={styles.left}>
                <div className={styles.user}>
                    <img src={user?.details.pfp} />
                    <p>@{user?.username}</p>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam
                    </span>
                    {logged_user.username === username ? (
                        <button className={styles.edit_btn}>Edit Profile</button>
                    ) : (
                        <div className={styles.user_interact}>
                            <button>Add Friend</button>
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
                            {/* <button>Add Fr</button> */}
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
