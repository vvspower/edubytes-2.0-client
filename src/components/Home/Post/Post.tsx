import React from "react";
import styles from "./post.module.sass";
import example_pfp from "../../../assets/example_pfp.jpg";
import like_react from "../../../assets/like_react.png";

const Post = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={example_pfp} />
          <div>
            <h1>vvspower posted</h1>
            <span>1 day ago</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus
          arcu ut mattis consectetur. Maecenas ligula elit, pharetra ac
          fringilla id, mattis vitae nisl. Aenean et ultrices leo, nec dignissim
          diam. Fusce eget turpis laoreet metus tempus posuere. Sed feugiat eget
          ligula ac pretium.
        </p>
      </div>
      <div className={styles.footer}>
        <p>Top today from A level discussions. View &gt; </p>
        <div className={styles.likes}>
          <img src={like_react} />
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
