import CreatePost from "../CreatePost/CreatePost";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Notes from "../NotesDisplay/Notes";



import { useState } from "react";
import styles from "./createpostbar.module.sass";

interface Props {
  pfp: string;
}

const CreatePostBar = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.postbar}>
          <img src={props.pfp} />
          <button onClick={handleOpen}>Create post</button>
        </div>
        <div>
          <p>
            Note: Since the website is still in development, some functionality
            may not work. v1.0.0
          </p>

        </div>
      </div>
      <CreatePost
        open={open}
        handleClose={handleClose}
        pfp={user.details.pfp}
        username={user.username}
      />
    </div>
  );
};

export default CreatePostBar;
