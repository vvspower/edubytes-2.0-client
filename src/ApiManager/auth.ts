// This file will contain all the relevant code for fetching data regarding authorization
import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:9000/auth",
  timeout: 100000,
});
interface IAuthResponse {
  data: string;
  success: boolean;
}

interface Friends {
  username: string;
  pfp: string;
}

export interface Education {
  institute: string;
  university: boolean;
  college: boolean;
  subjects: string[];
}

export interface Details {
  bio: string;
  pfp: string;
  verified: false;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  created: string;
  admin: boolean;
  partnerd: boolean;
  details: Details;
  education: Education;
  friends: Friends[];
}

export interface IGetUserResponse {
  data: User;
  success: boolean;
}

// Post Interfaces

export default class Auth {
  public async signInUser(email: string, password: string) {
    const response: AxiosResponse<IAuthResponse> = await instance.post(
      "/sign-in",
      { email: email, password: password }
    );
    return response.data.data;
  }

  public async getUser(token: string) {
    instance.defaults.headers.get["Authorization"] = token;
    const response: AxiosResponse<IGetUserResponse> = await instance.get(
      "/user"
    );
    return response.data;
  }
}
