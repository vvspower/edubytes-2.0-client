import * as timeago from "timeago.js";
import React, { useEffect, useState, useReducer } from "react";
import styles from "./postcard.module.sass";
import example_pfp from "../../assets/example_pfp.jpg";
import likes_react from "../../assets/like_react.png";
import { ILikes } from "../../ApiManager/interface/Interfaces";
import { IDefaultResponse } from "../../ApiManager/interface/Interfaces";
import Forum from "../../ApiManager/api/forum";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Replies } from "../../ApiManager/interface/Interfaces";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Chip } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


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

  useEffect(() => {
    setLikes(props.likes);
    checkLiked();
  }, []);

  return (
    <div className={styles.container}>
      <div
        onClick={() => { navigate(`/post/${props._id}`) }}
        className={styles.image}

      >
        {/* <span>Read More</span> */}
        {props.image != "" ? <img src={props.image} /> : null}
      </div>
      <div style={{ padding: "12px" }}>
        <div className={styles.header}>
          <div>
            <img onClick={() => navigate(`/u/${props.username}`)} src={props.pfp} />
            <div>
              <h1 >{props.username}</h1>
              <p onClick={() => navigate(`/u/${props.username}`)}>{timeago.format(parseInt(props.created + "000"))}</p>
            </div>
          </div>
        </div>
        <div onClick={() => navigate(`/post/${props._id}`)} className={styles.content}>
          <p >{props.content}</p>
        </div>
        <div className={styles.interaction}>
          <div onClick={handleLike} className={styles.likes}>
            <div>
              <div className={styles.icons}>
                {!liked ? (
                  <FavoriteBorderIcon fontSize="small" sx={{ fill: "#868e96", height: "18px" }} />
                ) : (
                  <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", height: "18px" }} />
                )}
              </div>
              <span>{likes.length}</span>
            </div>
            <div className={styles.userlikespfp}>
              <AvatarGroup max={4} >
                {likes?.map((item, i) => {
                  return <Avatar key={i} sx={{ height: "18px", width: "18px" }} alt={item.username} src={item.user_pfp} />
                })}
              </AvatarGroup>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "5px" }}>{props.tags.length > 1 ? "+ " + (props.tags.length - 1).toString() : null}</p>
            <div>
              {props?.tags?.slice(0, 1).map((item, i) => {
                return (

                  <Chip
                    key={i}
                    sx={{
                      marginRight: 1, backgroundColor: "#D7EFE0", color: "#37b24d"
                    }}
                    label={item}
                    size="small"
                  />

                );
              })}
            </div>

            <div className={styles.comment}>
              <CommentIcon sx={{ fill: "#868e96", height: "14px" }} fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;