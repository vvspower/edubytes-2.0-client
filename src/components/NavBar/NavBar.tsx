import { useEffect, useState, useReducer, MouseEvent } from "react";
import styles from "./navbar.module.sass";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Auth from "../../ApiManager/auth";
import { IGetUserResponse } from "../../ApiManager/auth";
import { RootState } from "../../store/store";
import { initializeUser, removeUser } from "../../state/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import UserAvatarDropDown from "./UserAvatarDropDown/UserAvatarDropDown";

const NavBar = () => {
  const authApi = new Auth();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const user = useSelector((state: RootState) => state.user.value);
  const token: string | null = sessionStorage.getItem("token");

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
    const data: IGetUserResponse = await authApi.getUser(
      sessionStorage.getItem("token")!
    );
    dispatch(initializeUser(data.data));
    setSuccess(data.success);
    forceUpdate();
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      getUser();
    }
  }, []);

  return (
    <>
      {success ? (
        <div className={styles.navbar}>
          <div className={styles.left}>
            <button>Home</button>
            <button>Bazaar</button>
            <button>Explore</button>
          </div>
          <div className={styles.middle}>
            <div className={styles.search}>
              <SearchRoundedIcon sx={{ fill: "#868e96" }} />
              <input placeholder="Search" />
            </div>
          </div>
          {token !== null ? (
            <div className={styles.right}>
              <div>
                <MailOutlineRoundedIcon sx={{ fill: "#868e96" }} />
              </div>
              <div>
                <NotificationsNoneRoundedIcon sx={{ fill: "#868e96" }} />
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
