import React, { useState, MouseEvent, MouseEventHandler } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styles from "./dropdown.module.sass";
import { initializeUser } from "../../../state/userSlice";
import Chip from "@mui/material/Chip";
// import { Redirect } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { User } from "../../../ApiManager/interface/Interfaces";

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
  const dispatch = useDispatch();


  const logOut = () => {
    const user: User = {
      _id: "",
      username: "",
      email: "",
      created: "",
      admin: false,
      details: {
        bio: "",
        pfp: "",
        completed: false,
      },
      education: {
        institute: "",
        subjects: [],
      },
      friends: [],
    }
    dispatch(initializeUser(user));
    localStorage.removeItem("token")


    // location.reload()
    navigate("/login")
  }
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        elevation={0}
        onClose={props.handleClose}
        sx={{ height: "410px" }}

        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={styles.menu}>
          <h1 className={styles.title}>ACCOUNT</h1>
          <div onClick={() => {
            // <Navigate to={`/u/${props.user_name}`} />
            navigate(`/u/${props.user_name}`)
          }} className={styles.profile}>
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

            <h2 onClick={props.handleClose}>Help</h2>
            <div onClick={logOut}>
              <h2 onClick={props.handleClose}  >Logout</h2>
            </div>
          </div>
          <div className={styles.footer}>
            <h1 className={styles.title}>EDUBYTES</h1>
            <h3 onClick={() => { navigate("/resources") }}>Browse Resources</h3>
            <h3>Contact</h3>

          </div>
        </div>
      </Menu>
    </div>
  );
};

export default UserAvatarDropDown;
