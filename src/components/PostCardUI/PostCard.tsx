import * as timeago from "timeago.js";
import React, { useEffect, useState } from "react";
import styles from "./postcard.module.sass";
import example_pfp from "../../assets/example_pfp.jpg";
import likes_react from "../../assets/like_react.png";
import { ILikes } from "../../ApiManager/forum";
import Forum from "../../ApiManager/forum";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


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
  logged_in_user_pfp: string
  logged_in_user: string
}




const PostCard = (props: Props) => {
  const forumApi = new Forum()
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState<ILikes[]>([])
  console.log(props.likes)
  console.log(props.created);
  let now = new Date();
  let date = new Date(now.getTime() - parseFloat(props.created));

  const newLike: ILikes = {
    username: props.logged_in_user,
    user_pfp: props.logged_in_user_pfp,
    type: "like"
  }


  const handleLike = (): void => {
    setLiked(!liked)
    forumApi.postLike(!liked, props._id)
    console.log(!liked)
    if (!liked) {
      let newlikes = likes
      newlikes.push(newLike)
      setLikes(newlikes)
    } else {
      const newArr = likes.filter(e => e.username !== props.logged_in_user)
      setLikes(newArr)
    }
  }




  const checkLiked = (): void => {
    console.log(props.logged_in_user)
    console.log(props.likes, "here")
    props.likes.forEach(item => {
      if (item.username === props.logged_in_user) {
        setLiked(true)

      }
    });
  }


  useEffect(() => {
    setLikes(props.likes)
    checkLiked()
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={props.pfp} />
          <div>
            <h1>{props.username} posted</h1>
            <p>{timeago.format(parseInt(props.created + "000"))}</p>
          </div>
        </div>
        <MoreHorizIcon sx={{ fill: "#868e96", }} />
      </div>
      <div className={styles.content}>
        <p>{props.content}</p>
        {/* <span>Read More</span> */}
        {props.image != "" ? <img src={props.image} /> : null}
      </div>
      <div className={styles.footer}>
        <div className={styles.likes}>
          <div>
            <img height={20} width={20} src={likes_react} />
            <span>{likes.length}</span>
          </div>
          <div className={styles.userlikespfp}>
            {likes.slice(0, 4).map((item, i) => {
              return <img src={item.user_pfp} />;
            })}
          </div>
        </div>
        <div>
          <span>view comments &gt;</span>
        </div>
      </div>
      <div className={styles.interaction}>
        <div onClick={handleLike} style={{ marginLeft: "40px", }} className={styles.icons}>
          {!liked ? <FavoriteBorderIcon fontSize="small" sx={{ fill: "#868e96", }} /> : <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", }} />}
          <p style={{ color: liked ? "#339af0" : "#868e96" }}>Like</p>
        </div>
        <div className={styles.icons}>
          <ChatBubbleOutlineIcon fontSize="small" sx={{ fill: "#868e96", }} />
          <p>Comment</p>
        </div>
        <div style={{ marginRight: "40px" }} className={styles.icons}>
          <ShareIcon fontSize="small" sx={{ fill: "#868e96", }} />
          <p>Share</p>
        </div>
      </div>
      <div className={styles.comment}>
        <img src={props.logged_in_user_pfp} />
        <input placeholder="Reply" />
      </div>
    </div>
  );
};

export default PostCard;
