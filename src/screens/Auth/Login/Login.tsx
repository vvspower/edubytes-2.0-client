import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "../../../ApiManager/api/auth";
import { useNavigate } from "react-router-dom";
import styles from './login.module.sass'
import img from '../../../assets/login.png'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios, { AxiosError, AxiosResponse } from "axios";
import { IDefaultResponse } from "../../../ApiManager/interface/Interfaces";
import loader from '../../../assets/loading.gif'




export default function Login() {
  const authApi = new Auth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setloading] = useState(false)


  const [error, setError] = useState<string>("");

  const [loginPage, setloginPage] = useState(true)
  const [next, setnext] = useState(false)


  const displayError = (err: string): void => {
    setError(err)
    const myTimeout = setTimeout(() => { setError(""), clearTimeout(myTimeout); }, 2000);
  }


  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    setloading(true)
    try {
      e.preventDefault()
      const authorization: string = await authApi.signInUser(email, password);
      localStorage.setItem("token", authorization);
      navigate("/");
      location.reload()
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<IDefaultResponse>
        displayError(err.response?.data.data!)
        setloading(false)
      }
    }
  };

  const SignUp = async () => {
    try {
      setloading(true)
      const response: AxiosResponse<IDefaultResponse> = await authApi.signUpUser(email, password, username);
      setloading(false)
      setnext(true)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<IDefaultResponse>
        displayError(err.response?.data.data!)
        setloading(false)
      }
    }
  }



  return (
    <div className={styles.container}>
      {!localStorage.getItem("token") ? <Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <div>
            {loginPage ? <div className={styles.modal}>
              <img height={200} src={img} />
              <div className={styles.login}>
                <h1>Login to Edubytes</h1>
                <div className={styles.inputs}>
                  <div>
                    <PersonIcon sx={{ fill: "#495057" }} />
                    <input id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      name="email" placeholder="Email" />
                  </div>
                  <div>
                    <LockIcon sx={{ fill: "#495057" }} />
                    <input name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      id="password" placeholder="Password" />
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "#fa5252", marginTop: "10px" }}>{error}</p>
                <p onClick={() => { setloginPage(false); setError("") }} style={{ fontSize: "12px", color: "#1971c2", marginTop: "10px", cursor: "pointer" }}>Dont have an account? Sign up!</p>
                <div>

                  <Button disabled={loading} type="submit">{loading ? <img src={loader} width="30px" /> : "Login"}</Button>
                </div>
              </div>
            </div> : null}
          </div>
        </Box>
      </Box > : <p style={{ marginTop: "60px", textAlign: "center" }}>Log out before logging in again</p>}
      {!loginPage ? <div className={styles.sign_up}>
        {!next ? <div className={styles.modal}>
          <img height={200} src={img} />
          <div className={styles.normal_inputs}>
            <h1>Sign up</h1>
            <input value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }} style={{ width: "95%", marginBottom: "10px" }} placeholder="Username" />
            <div>
              <div>
                <input id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}

                  name="email" placeholder="Email" />
              </div>
              <div>
                <input name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password" placeholder="Password" />
              </div>


            </div>
            <p style={{ fontSize: "12px", color: "#fa5252", marginTop: "10px", cursor: "pointer" }}>{error}</p>
            <p onClick={() => { setloginPage(true); setError("") }} style={{ fontSize: "12px", color: "#1971c2", marginTop: "10px", cursor: "pointer" }}>Already have an account? Sign in!</p>
            {!loading ? <button onClick={() => SignUp()}>SignUp</button> : null}
            {loading ? <img height={30} src={loader} /> : null}
          </div>
        </div> : <div className={styles.modal}>
          <div>
            <p>Email has been sent to {email}. Please verify and continue</p>
          </div>
        </div>}
      </div> : null}
    </div>
  );
}
