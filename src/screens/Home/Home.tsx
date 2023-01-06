import React, { useEffect, useState, useReducer, MouseEvent } from "react";
import styles from "./home.module.sass";
import SecondaryPost from "../../components/Home/Post/SecondaryPost";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CreatePostBar from "../../components/Home/CreatePostBar/CreatePostBar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { ReturnedPlanner, ReturnedPlannerResponseMultiple, ReturnedResourceResponse } from "../../ApiManager/interface/Interfaces";
import { ReturnedResource } from "../../ApiManager/interface/Interfaces";
import { useNavigate } from "react-router-dom";
import Forum from "../../ApiManager/api/forum";
import Resource from "../../ApiManager/api/resources";
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
import LeftBar from "../../components/Home/LeftBar/LeftBar";
import RightBar from "../../components/Home/RightBar/RightBar";
import Notes from "../../components/Home/NotesDisplay/Notes";
import FriendScreen from "../../components/Home/FriendScreen/FriendScreen";
import PostCard from "../../components/PostCardUI/PostCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Contribute from "../../components/Home/Contribute/Contribute";
import NoteScreen from "../../components/Home/NotesScreen/NoteScreen";
import Planner from "../../ApiManager/api/planner";
import { width } from "@mui/system";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.value);

  const communities = ["general", "A Level", "O Level", user.education.institute]

  const [posts, setPosts] = useState<IPost[]>([]);
  const [topPosts, setTopPosts] = useState<IPost[]>([]);
  const [postsLoading, setpostsLoading] = useState(false)
  const [planner, setplanner] = useState<ReturnedPlanner[]>([])
  const [mode, setMode] = useState<"home" | "friends" | "resources">("home");
  const [resources, setResource] = useState<ReturnedResource[]>([])
  const [random, setRandom] = useState(Math.floor(Math.random() * 6))
  const [postCommunity, setpostCommunity] = useState("general")
  const [loadingCommunity, setloadingCommunity] = useState(false)
  const [number, setnumber] = useState(0)
  const [postLength, setpostLength] = useState(0)
  const [hasMore, setHasMore] = useState(true)


  // const random: number = (Math.floor(Math.random() * 6))

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();
  const forumApi = new Forum();
  const resourceApi = new Resource()
  const plannerApi = new Planner()


  // MENU VARIABLES
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openPostDropDown = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchComminity = async (community: string) => {
    setloadingCommunity(true)
    await getPosts(community)
    setloadingCommunity(false)

  }

  const fetchNextData = async () => {
    setpostsLoading(true)
    const data = await forumApi.getPostsTargetGeneral(postCommunity, number + 15);
    if (data.data.length === postLength) {
      setHasMore(false)
    }
    setpostLength(data.data.length)
    setnumber(number + 15)
    forceUpdate()
    setPosts(data.data);
    setpostsLoading(false)


  }


  const getPosts = async (community: string) => {
    setpostsLoading(true)

    setHasMore(true)
    const data = await forumApi.getPostsTargetGeneral(community, 0);
    setPosts(data.data);
    setpostLength(data.data.length)
    if (data.data.length < 15) {
      setHasMore(false)
    }
    setpostsLoading(false)



  };

  const getTopPosts = async () => {
    setpostsLoading(true)
    const response: AxiosResponse<ITopPostsResponse> =
      await forumApi.getTopPosts(user.education.institute);
    setTopPosts(response.data.data.sorted);
    forceUpdate();
    setpostsLoading(false)
  };

  const getResources = async () => {
    const response: AxiosResponse<ReturnedResourceResponse> = await resourceApi.getResources()
    setResource(response.data.data)
  }

  const getPlanners = async () => {
    const response: AxiosResponse<ReturnedPlannerResponseMultiple> = await plannerApi.getPlanner()
    setplanner(response.data.data)
  }


  const topPostPreview: JSX.Element = (
    <>
      <Stack
        sx={{
          padding: "10px", backgroundColor: "white", borderRadius: "8px", border: "1px solid #dee2e6", paddingBottom: "0px"
        }}
        spacing={1}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Skeleton variant="circular" width={20} height={20} />
          <div>
            <Skeleton variant="text" width={282} height={10} />
            <Skeleton variant="text" width={282} height={10} />
          </div>
        </div >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Skeleton variant="circular" width={12} height={12} />
          <Skeleton variant="text" width="50px" height={30} style={{ borderRadius: "12px", alignContent: "right", margin: "0px" }} />
        </div>
      </Stack>
    </>
  );

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

    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else if (user.education.institute != "") {
      getPosts("general");
      getTopPosts()
      getResources()
      getPlanners()
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {user._id == "" ? null : <div className={styles.left}>
        <LeftBar setMode={setMode} />
      </div>}
      <div className={styles.middle}>
        {user._id == "" ? (
          spinner
        ) : (
          <>
            <div className={styles.secondary_post}>
              {topPosts.length === 0 ? <div className={styles.secondary_post}>
                <main>
                  {topPostPreview}
                </main>
                <main>
                  {topPostPreview}
                </main>


              </div> : topPosts.map((item, i) => {
                return <main><SecondaryPost key={i} username={item.username} pfp={item.user_pfp} likes={item.likes} content={item.content} id={item._id} image={item.image} /></main>
              })}

            </div>
            <div className={styles.carousel}>
              <div className={styles.head} >
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={20} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                  <p>Popular</p>
                </div>
                <div onClick={() => setMode("resources")}>
                  <span>Contribute</span>
                </div>
              </div>
              <div></div>
              <Carousel
                itemClass="carousel-item-padding-0-px"
                centerMode={true}
                autoPlaySpeed={5000}

                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                partialVisible={false}
              >
                {resources.slice(0, 10).sort((a, b) => { return b.rating - a.rating }).map((item, i) => {
                  return <div ><Notes key={i} id={item._id} title={item.resource_title} image={item.preview_image} subject={item.subject} rating={item.rating} username={item.username} user_pfp={item.user_pfp} /></div>
                })}
              </Carousel>
            </div>
            <div className={styles.postbar}>
              <CreatePostBar type={"post"} pfp={user.details.pfp} />
            </div>


            <div className={styles.filter}>
              {<div style={{ visibility: mode === "home" ? "visible" : "hidden" }} className={styles.filter_select}>
                <button style={{
                  color: postCommunity === "general" ? "#339af0" : "#868e96"
                }} onClick={() => { setpostCommunity("general"); switchComminity("general") }} >General</button>
                <button style={{
                  color: postCommunity === "A Level" ? "#339af0" : "#868e96"
                }} onClick={() => { setpostCommunity("A Level"); switchComminity('A Level') }}>A Level</button>
                <button style={{
                  color: postCommunity === "O Level" ? "#339af0" : "#868e96"
                }} onClick={() => { setpostCommunity("O Level"); switchComminity("O Level") }}>O Level</button>
                <button style={{
                  color: postCommunity === user.education.institute ? "#339af0" : "#868e96"
                }} onClick={() => { setpostCommunity(user.education.institute); switchComminity(user.education.institute) }}>{user.education.institute}</button>


              </div>}
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
            </div>

            <div style={{ overflow: "hidden" }}>
              <InfiniteScroll
                style={{ overflow: "hidden" }}
                dataLength={posts.length} //This is important field to render the next data
                next={fetchNextData}
                hasMore={hasMore}
                loader={<p className={styles.endtext}>loading more posts</p>}
                endMessage={
                  <div>
                    {mode === "home" ? <div style={{ textAlign: 'center' }}>
                      {(posts.length === 0 && postsLoading === false) ? null : <p className={styles.endtext}>End of the posts</p>}
                    </div> : null}
                  </div>
                }
              // below props only if you need pull down functionality

              >
                <div className={styles.mainposts}>
                  {loadingCommunity ? postPreview : null}
                  {loadingCommunity === false ? <div>
                    {mode === "home" ? <div>
                      {posts.length !== 0
                        ? posts.map((item, i) => {
                          return i !== random ? (
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
                          ) : <div >
                            <div style={{ maxWidth: "300px", margin: "0 auto", cursor: "pointer" }} onClick={() => setMode("resources")}>
                              <Contribute />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
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

                          </div>
                        })
                        : null}
                      {posts.length === 0 && postsLoading ? <div className={styles.post} >{postPreview}</div> : null}
                      {posts.length === 0 && postsLoading === false ? <p style={{ color: "#adb5bd" }}>No posts</p> : null}

                    </div> : null}
                    {mode === "friends" ? <div>
                      <FriendScreen />
                    </div> : null}
                    {mode === "resources" ? <NoteScreen /> : null}
                  </div> : null}
                </div>
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>
      {user._id == "" ? null : <div className={styles.right}>
        <RightBar planner={planner} />
      </div>}
    </div >
  );
};

export default Home;
