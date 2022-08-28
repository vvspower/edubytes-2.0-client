import React from "react";
import styles from "./post.module.sass";
import example_pfp from "../../../assets/example_pfp.jpg";
import like_react from "../../../assets/like_react.png";

const SecondaryPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={example_pfp} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div>
        <span>View more &gt;</span>
      </div>
    </div>
  );
};

export default SecondaryPost;
