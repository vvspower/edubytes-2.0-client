import React, { useState, MouseEvent, MouseEventHandler } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styles from "./dropdown.module.sass";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  user_pfp: string;
  user_email: string;
  user_name: string;
}

const UserAvatarDropDown = (props: Props) => {
  const navigate = useNavigate()

  const logOut = () => {
    sessionStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={styles.menu}>
          <h1 className={styles.title}>ACCOUNT</h1>
          <div className={styles.profile}>
            <img src={props.user_pfp} />
            <div onClick={props.handleClose} className={styles.details}>
              <div>
                <p>{props.user_name}</p>
                <p>{props.user_email}</p>
              </div>
              <div>&gt;</div>
            </div>
          </div>
          <div className={styles.buttons}>
            <h2 onClick={props.handleClose}>Settings</h2>
            <h2 onClick={props.handleClose}>Help</h2>
            <div onClick={logOut}>
              <h2 onClick={props.handleClose}  >Logout</h2>
            </div>
          </div>
          <div className={styles.footer}>
            <h1 className={styles.title}>EDUBYTES</h1>
            <h3>Contact</h3>
            <div className={styles.join}>
              <h2>Join</h2>
              <span>AS A DEV</span>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default UserAvatarDropDown;
