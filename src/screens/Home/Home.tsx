import React, { useEffect, useState, useReducer, MouseEvent } from "react";
import styles from "./home.module.sass";
import SecondaryPost from "../../components/Home/Post/SecondaryPost";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CreatePostBar from "../../components/Home/CreatePostBar/CreatePostBar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forum from "../../ApiManager/api/forum";
import { IPost } from "../../ApiManager/interface/Interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CreatePost from "../../components/Home/CreatePost/CreatePost";
import { ITopPostsResponse } from "../../ApiManager/interface/Interfaces";
import HomeIcon from "@mui/icons-material/Home";
import { AxiosResponse } from "axios";
import PeopleIcon from "@mui/icons-material/People";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LeftBar from "../../components/LeftBar/LeftBar";
import FriendScreen from "../../components/Home/FriendScreen/FriendScreen";
import PostCard from "../../components/PostCardUI/PostCard";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [topPosts, setTopPosts] = useState<IPost[]>([]);
  const [mode, setMode] = useState<"home" | "friends" | "resources">("home");



  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();
  const forumApi = new Forum();

  const user = useSelector((state: RootState) => state.user.value);



  // MENU VARIABLES
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openPostDropDown = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const getPosts = async () => {
    const data = await forumApi.getPostsTargetGeneral(user.education.institute);
    setPosts(data.data);
    forceUpdate();
  };

  const getTopPosts = async () => {
    const response: AxiosResponse<ITopPostsResponse> =
      await forumApi.getTopPosts(user.education.institute);
    setTopPosts(response.data.data.sorted);
    forceUpdate();
  };

  const postPreview: JSX.Element = (
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

  const spinner: JSX.Element = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "inherit",
        position: "absolute",
        right: "50%",
        top: "50%",
      }}
    >
      <CircularProgress />
    </Box>
  );

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    } else if (user.education.institute != "") {
      getPosts();
      getTopPosts()
    }
  }, [user]);

  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <LeftBar />
      </div>
      <div className={styles.middle}>
        {user._id == "" ? (
          spinner
        ) : (
          <>
            <div className={styles.secondary_post}>{
              topPosts.map((item, i) => {
                return <SecondaryPost key={i} username={item.username} pfp={item.user_pfp} likes={item.likes} content={item.content} id={item._id} image={item.image} />
              })
            }
            </div>
            <div className={styles.postbar}>
              <CreatePostBar pfp={user.details.pfp} />
            </div>
            <div className={styles.header}>
              <button onClick={() => setMode("home")}><HomeIcon
                sx={{
                  cursor: "pointer",
                  fill: mode === "home" ? "#339af0" : "#868e96",
                }}
                fontSize="small"
              /></button>
              <button onClick={() => setMode("friends")}><PeopleIcon
                sx={{
                  cursor: "pointer",
                  fill: mode === "friends" ? "#339af0" : "#868e96",
                }}
                fontSize="small"
              /></button>
              <button onClick={() => setMode("resources")}><ImportContactsIcon
                sx={{
                  cursor: "pointer",
                  fill: mode === "resources" ? "#339af0" : "#868e96",
                }}
                fontSize="small"
              /></button>

            </div>

            <div className={styles.mainposts}>

              <div>
                {mode === "home" ? <div>
                  {posts.length !== 0
                    ? posts.map((item, i) => {
                      return (
                        <div className={styles.post}>
                          <PostCard
                            key={i}
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
                    })
                    : <div className={styles.post} >{postPreview}</div>}
                  <p className={styles.endtext}>End of the posts</p>
                </div> : null}
                {mode === "friends" ? <div>
                  <FriendScreen />
                </div> : null}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.right}>
        <LeftBar />
      </div>
    </div>
  );
};

export default Home;
