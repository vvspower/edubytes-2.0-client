import * as timeago from "timeago.js";
import React, { useEffect, useState, useReducer } from "react";
import styles from "./postcard.module.sass";
import example_pfp from "../../assets/example_pfp.jpg";
import likes_react from "../../assets/like_react.png";
import { ILikes } from "../../ApiManager/forum";
import { IDefaultResponse } from "../../ApiManager/forum";
import Forum from "../../ApiManager/forum";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Replies } from "../../ApiManager/forum";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  _id: string;
  username: string;
  created: string;
  image: string;
  subject: string;
  tags: string[];
  pfp: string;
  content: string;
  likes: ILikes[];
}

const PostCard = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);

  const navigate = useNavigate();
  const forumApi = new Forum();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<ILikes[]>([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [fetched, setFetched] = useState<boolean>(false);

  console.log(props.likes);
  console.log(props.created);
  let now = new Date();
  let date = new Date(now.getTime() - parseFloat(props.created));

  const newLike: ILikes = {
    username: user.username,
    user_pfp: user.details.pfp,
    type: "like",
  };

  const handleLike = (): void => {
    setLiked(!liked);
    forumApi.postLike(!liked, props._id);
    console.log(!liked);
    if (!liked) {
      let newlikes = likes;
      newlikes.push(newLike);
      setLikes(newlikes);
    } else {
      const newArr = likes.filter((e) => e.username !== user.username);
      setLikes(newArr);
    }
  };

  const checkLiked = (): void => {
    props.likes.forEach((item) => {
      if (item.username === user.username) {
        setLiked(true);
      }
    });
  };

  console.log(props.tags);
  useEffect(() => {
    setLikes(props.likes);
    checkLiked();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={props.pfp} />
          <div>
            <h1>{props.username}</h1>
            <p>{timeago.format(parseInt(props.created + "000"))}</p>
          </div>
        </div>
        <MoreHorizIcon sx={{ fill: "#868e96" }} />
      </div>
      <div
        onClick={() => navigate(`/post?v=${props._id}`)}
        className={styles.content}
      >
        <p>{props.content}</p>
        {/* <span>Read More</span> */}
        {props.image != "" ? <img src={props.image} /> : null}
      </div>

      <div className={styles.interaction}>
        <div onClick={handleLike} className={styles.likes}>
          <div>
            <div className={styles.icons}>
              {!liked ? (
                <FavoriteBorderIcon fontSize="small" sx={{ fill: "#868e96" }} />
              ) : (
                <FavoriteIcon fontSize="small" sx={{ fill: "#339af0" }} />
              )}
            </div>
            <span>{likes.length}</span>
          </div>
          <div className={styles.userlikespfp}>
            {likes.slice(0, 4).map((item, i) => {
              return <img key={i} src={item.user_pfp} />;
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            {props?.tags?.map((item, i) => {
              return (

                <Chip
                  key={i}
                  sx={{ marginRight: 1, border: "1px solid #dee2e6 " }}
                  label={item}
                  size="medium"
                />

              );
            })}
          </div>
          <div className={styles.comment}>
            <CommentIcon sx={{ fill: "#868e96" }} fontSize="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
