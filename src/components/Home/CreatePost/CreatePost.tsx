import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styles from "./createpost.module.sass";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";


import Modal from "@mui/material/Modal";

interface Props {
  open: boolean;
  handleClose: () => void;
  pfp: string;
  username: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
};

const CreatePost = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Create Post</h1>
            </div>
            <div className={styles.main}>
              <div className={styles.details}>
                <div>
                  <div>
                    <img src={props.pfp} />
                  </div>
                  <div>
                    <span>Post as</span>
                    <p>{props.username}</p>
                  </div>
                </div>
                <div className={styles.select}>
                  <select name="forum" id="forum">
                    <option value="volvo">{user.education.institute}</option>
                    <option value="saab">A Levels Forum</option>
                    <option value="opel">O Levels Forum</option>
                    <option value="audi">General</option>
                  </select>
                </div>
              </div>
              <div className={styles.input}>
                <textarea
                  placeholder="Type something here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <p>For Emojis, Right Click > Emoji</p>
              </div>
              <div className={styles.footer}>
                {image ? (
                  <div className={styles.imagecontainer}>
                    <img src={image} />
                    <button
                      className={styles.upload_button}
                      onClick={handleClick}
                    >
                      <div>
                        <ImageIcon />
                      </div>
                      <p>Change photo</p>
                    </button>
                  </div>
                ) : null}
                {!image ? (
                  <button
                    className={styles.upload_button}
                    onClick={handleClick}
                  >
                    <div>
                      <ImageIcon />
                    </div>
                    <p>Add a photo to your post</p>
                  </button>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  id="upload-file-button"
                  hidden
                  onChange={onImageChange}
                  ref={hiddenFileInput}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
