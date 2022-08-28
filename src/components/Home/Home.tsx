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

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
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

  const postStack: JSX.Element = (
    <>
      <Stack sx={{ padding: "15px", backgroundColor: "white", borderRadius: "16px" }} spacing={1}>
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
          <Skeleton variant="circular" width={35} height={35} />
          <Skeleton variant="text" width="100%" height={50} style={{ borderRadius: "12pxpx" }} />
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
      {user._id == "" ? (
        spinner
      ) : (
        <>
          <div className={styles.secondary_post}>
            {/* <Post /> */}
            {/* <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.arrow}>
                <TrendingFlatIcon
                  fontSize="large"
                  sx={{ fill: "#868e96", fontSize: "50px" }}
                />
              </div>
              
            </div> */}
            <SecondaryPost />
            <SecondaryPost />
          </div>
          <div className={styles.postbar}>
            <CreatePostBar pfp={user.details.pfp} />
          </div>
          <div className={styles.mainposts}>
            <div className={styles.header}>

              {/* <InfoOutlinedIcon sx={{ fill: "#adb5bd" }} fontSize="small" /> */}
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
                      logged_in_user_pfp={user.details.pfp}
                      logged_in_user={user.username}
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
  );
};

export default Home;
