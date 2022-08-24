import * as timeago from "timeago.js";
import React from "react";
import styles from "./postcard.module.sass";
import example_pfp from "../../assets/example_pfp.jpg";
import likes_react from "../../assets/like_react.png";
import { ILikes } from "../../ApiManager/forum";

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
  console.log(props.created);
  let now = new Date();
  let date = new Date(now.getTime() - parseFloat(props.created));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={props.pfp} />
        <div>
          <h1>{props.username} posted</h1>
          <p>{timeago.format(parseInt(props.created + "000"))}</p>
        </div>
      </div>
      <div className={styles.content}>
        <p>{props.content}</p>
        <span>Read More</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.likes}>
          <div>
            <img height={20} width={20} src={likes_react} />
            <span>{props.likes.length}</span>
          </div>
          <div className={styles.userlikespfp}>
            {props.likes.slice(0, 4).map((item, i) => {
              return <img src={item.user_pfp} />;
            })}
          </div>
        </div>
        <div>
          <span>4 comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
