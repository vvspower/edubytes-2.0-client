import { useEffect, useState, useReducer, MouseEvent, FormEvent, ChangeEvent } from "react";
import styles from "./navbar.module.sass";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Badge } from "@mui/material";
import Auth from "../../ApiManager/api/auth";
import { IGetUserResponse } from "../../ApiManager/api/auth";
import { RootState } from "../../store/store";
import { initializeUser, removeUser } from "../../state/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import edubytes_logo_large from '../../assets/edubytes_logo_large.png'
import UserAvatarDropDown from "./UserAvatarDropDown/UserAvatarDropDown";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { IGetPostsResponse, IPost } from "../../ApiManager/interface/Interfaces";
import Forum from "../../ApiManager/api/forum";
import CloseIcon from '@mui/icons-material/Close';
import Close from "@mui/icons-material/Close";

const NavBar = () => {
  const navigate = useNavigate()
  const authApi = new Auth();
  const forumApi = new Forum()
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<boolean>(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [searchLoading, setSearchLoading] = useState(false)
  const [searched, setsearched] = useState(false)
  const [search, setsearch] = useState<string>("")
  const user = useSelector((state: RootState) => state.user.value);
  const token: string | null = sessionStorage.getItem("token");
  const [posts, setposts] = useState<IPost[]>([])


  const searchPost = async () => {
    setSearchLoading(true)
    const response: AxiosResponse<IGetPostsResponse> = await forumApi.searchPost(search)
    console.log(response)
    setposts(response.data.data)
    setSearchLoading(false)
    setsearched(true)

  }

  const onnavigate = () => {
    setsearch("")
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setposts([])
      setsearched(false)
    }
    setsearch(e.target.value)

  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      searchPost()
    }
  }



  // MENU VARIABLES
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUserDropDown = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // END HERE

  const getUser = async () => {
    const data: IGetUserResponse = await authApi.getUserFromToken(
      sessionStorage.getItem("token")!
    );
    dispatch(initializeUser(data.data));
    setSuccess(data.success);
    forceUpdate();
  };

  useEffect(() => {
    // if (sessionStorage.getItem("token") !== null) {
    getUser();
    // }
  }, []);

  console.log(search)

  return (
    <>
      {success ? (
        <div className={styles.navbar}>
          <div className={styles.left}>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              <img src={edubytes_logo_large} height='30px' style={{ marginTop: "5px" }} />
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.search}>
              <div onClick={() => searchPost()} className={styles.search_icon}>
                <SearchRoundedIcon sx={{ fill: "#868e96" }} />
              </div>
              <input onKeyDown={onKeyDown} onChange={(e) => handleSearchChange(e)} placeholder="Search" />
              {search.length != 0 ? <div onClick={() => setsearch("")}><CloseIcon sx={{ cursor: "pointer", fill: "#adb5bd" }} fontSize="small" /></div> : null}
            </div>
            {search.length != 0 && searched ? <SearchDropDown setsearch={onnavigate} search={search} posts={posts} loading={searchLoading} /> : null}
          </div>
          {token !== null ? (
            <div className={styles.right}>
              <div className={styles.icons}>
                <MailOutlineRoundedIcon sx={{ fill: "#868e96", padding: "5px", borderRadius: "50%", ":hover": { backgroundColor: "#e9ecef" } }} />
              </div>
              <div onClick={() => navigate("/notifications")} className={styles.icons}>
                <Badge sx={{ "marginRight": "8px" }} badgeContent={4} variant="dot" color="primary">
                  <NotificationsNoneRoundedIcon sx={{ fill: "#868e96", padding: "0px", borderRadius: "50%", ":hover": { backgroundColor: "#e9ecef" }, }} />
                </Badge>
              </div>
              <button
                style={{
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                id="basic-button"
                aria-controls={openUserDropDown ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserDropDown ? "true" : undefined}
                onClick={handleClick}
              >
                <img src={user.details.pfp} />
              </button>
              <UserAvatarDropDown
                user_name={user.username}
                anchorEl={anchorEl}
                open={openUserDropDown}
                handleClose={handleClose}
                user_email={user.email}
                user_pfp={user.details.pfp}
              />
            </div>
          ) : (
            <div className={styles.right}>
              <button>login</button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default NavBar;
