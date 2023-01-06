import { useState, useRef, MouseEvent, ChangeEvent, useReducer, FormEvent } from "react";
import axios, { AxiosError, AxiosResponse, } from "axios";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styles from "./createpost.module.sass";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import Forum from "../../../ApiManager/api/forum";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import { IDefaultResponse } from "../../../ApiManager/interface/Interfaces";
import CircularProgress from "@mui/material/CircularProgress";


interface Props {
  open: boolean;
  handleClose: () => void;
  pfp: string;
  username: string;
  type: string
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
};

const CreatePost = (props: Props) => {
  const forumApi = new Forum();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [tags, settags] = useState<string>("");
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user.value);
  const [image, setImage] = useState<string>("");
  const [imageFile, setimageFile] = useState<Blob | null>(null);
  const [imageLink, setImageLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [forum, setforum] = useState("general")

  const displayError = (err: string): void => {
    setError(err)
    const myTimeout = setTimeout(() => { setError(""), clearTimeout(myTimeout); }, 2000);
  }



  const onChangeTags = (event: ChangeEvent<HTMLInputElement>): void => {
    const tagsAr = tagsArray;
    if (/\s/.test(event.target.value)) {
      if (tags.length >= 12) {
        return;
      } else {
        tagsAr.push(event.target.value);
        settags("");
      }
    } else {
      settags(event.target.value);
    }
  };


  const handleDelete = (i: number): void => {
    const tags = tagsArray;
    tags.splice(i, 1);
    setTagsArray(tags);
    forceUpdate();
  };


  const handleClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };


  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setimageFile(event.target.files[0]);
    }
  };


  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    setforum(event.target.value)
  }

  const uploadPost = async () => {
    try {
      setSuccess(false)
      let formData: FormData | undefined = new FormData();
      if (imageFile !== null) {
        formData.append("file", imageFile);
        formData.append("upload_preset", "mb3hrwz7");
      } else {
        formData = undefined;
      }
      const response: AxiosResponse<IDefaultResponse> = await forumApi.createPost(
        text,
        forum,
        "general",
        tagsArray,
        formData
      )
      setSuccess(true);
      props.handleClose()
      location.reload()
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<IDefaultResponse>
        displayError(err.response?.data.data!)
        setSuccess(true);
      }
    }

  }



  return (
    <div>
      <Modal
        sx={{ pointerEvents: !success ? "none" : "all" }}
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
                  <select onChange={handleSelect} name="forum" id="forum">
                    <option value="general">General</option>
                    <option value="alevel">A Levels Forum</option>
                    <option value="olevel">O Levels Forum</option>
                    <option value={user.education.institute}>{user.education.institute}</option>
                  </select>
                </div>
              </div>
              <div className={styles.input}>
                <textarea
                  placeholder="Type something here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <p>For Emojis, Right Click &gt; Emoji</p>
              </div>
              <div className={styles.footer}>
                <input
                  className={styles.input_tags}
                  placeholder="Add your tags here, Use tags like Maths, CS, Physics etc"
                  value={tags}
                  onChange={onChangeTags}
                />
                <Stack sx={{ marginBottom: 1 }} direction="row" spacing={1}>
                  {tagsArray.map((item, i) => {
                    return (
                      <Chip
                        key={i}
                        label={item}
                        onDelete={(i: number) => handleDelete(i)}
                        size="small"
                      />
                    );
                  })}
                </Stack>
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
              <p className={styles.error}>{error}</p>
              <button disabled={!success} style={{ backgroundColor: !success ? "gray" : "#228be6" }} className={styles.post} onClick={uploadPost}>
                <div>
                  <p>Post</p>
                  {!success ? (
                    <CircularProgress
                      color="inherit"

                      size={15}
                    />
                  ) : null}
                </div>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
