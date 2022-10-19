import React from "react";
import styles from "./post.module.sass";
import example_pfp from "../../../assets/example_pfp.jpg";
import like_react from "../../../assets/like_react.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { ILikes } from "../../../ApiManager/api/forum";


// username={item.username} pfp={item.user_pfp} likes={item.likes} content={item.content} id={item._id} image={item.image}

interface Props {
  id: string
  username: string
  pfp: string
  likes: ILikes[]
  content: string
  image: string

}

const SecondaryPost = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {
      navigate(`/post?v=${props.id}`)

    }} className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={props.pfp} />
          <p>
            {props.content.substring(0, 95)}..
          </p>
        </div>
      </div>
      <div>
        <div className={styles.likes}>
          <div>
            <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", height: "12px" }} />
            {props.likes.map((item, i) => {
              console.log(props.likes)
              return <img src={item.user_pfp} />
            })
            }
            <span style={{ marginLeft: "5px" }}>{props.likes.length}</span>
          </div>

          <span>view &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default SecondaryPost;
