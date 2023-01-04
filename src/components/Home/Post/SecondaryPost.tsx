import React from "react";
import styles from "./post.module.sass";
import example_pfp from "../../../assets/example_pfp.jpg";
import like_react from "../../../assets/like_react.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ILikes } from "../../../ApiManager/interface/Interfaces";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";


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
      navigate(`/post/${props.id}`)

    }} className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={props.pfp} />
          <p>
            {props.content.substring(0, 95)}{props.content.length > 95 ? ".." : null}
          </p>
        </div>
      </div>
      <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <div className={styles.likes}>
          <div>
            <FavoriteIcon fontSize="small" sx={{ fill: "#339af0", height: "12px" }} />
            {props.likes.map((item, i) => {
              return <img key={i} src={item.user_pfp} />
            })
            }
            <span style={{ marginLeft: "5px" }}>{props.likes.length}</span>
          </div>
          <Chip
            sx={{
              backgroundColor: "#FEF2E4", color: "#ffa94d", height: "20px"
            }}
            label={"Popular"}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondaryPost;
