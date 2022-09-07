import React, { useEffect, useState, useReducer, MouseEvent } from "react";
import styles from "./home.module.sass";
import SecondaryPost from "./Post/SecondaryPost";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CreatePostBar from "./CreatePostBar/CreatePostBar";
import PostCard from "../PostCardUI/PostCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forum from "../../ApiManager/forum";
import { IPost } from "../../ApiManager/forum";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CreatePost from "./CreatePost/CreatePost";
import { ITopPostsResponse } from "../../ApiManager/forum";
import HomeIcon from "@mui/icons-material/Home";
import { AxiosResponse } from "axios";
import PeopleIcon from "@mui/icons-material/People";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LeftBar from "./LeftBar/LeftBar";

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
  // END HERE

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
        <Skeleton variant="text" width="100%" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="100px" />
          <Skeleton variant="text" width="100px" />
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
            <div className={styles.secondary_post}>
              <SecondaryPost />
              <SecondaryPost />
            </div>
            <div className={styles.postbar}>
              <CreatePostBar pfp={user.details.pfp} />
            </div>

            <div className={styles.mainposts}>
              <div className={styles.header}>
                {/* "#339af0" is blue */}
                <div onClick={() => setMode("home")}>
                  <HomeIcon
                    sx={{
                      cursor: "pointer",
                      fill: mode === "home" ? "#339af0" : "#868e96",
                    }}
                    fontSize="large"
                  />
                </div>
                <div onClick={() => setMode("friends")}>
                  <PeopleIcon
                    sx={{
                      cursor: "pointer",
                      fill: mode === "friends" ? "#339af0" : "#868e96",
                    }}
                    fontSize="large"
                  />
                </div>
                <div onClick={() => setMode("resources")}>
                  <ImportContactsIcon
                    sx={{
                      cursor: "pointer",
                      fill: mode === "resources" ? "#339af0" : "#868e96",
                    }}
                    fontSize="large"
                  />
                </div>
              </div>
              <div>
                {posts.length !== 0
                  ? posts.map((item, i) => {
                    return (
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
                    );
                  })
                  : postStack}
              </div>
              <p className={styles.endtext}>End of the posts</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.right}>
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default Home;
