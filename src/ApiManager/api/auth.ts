// This file will contain all the relevant code for fetching data regarding authorization
import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/auth",
  timeout: 100000,
});

// Post Interfaces

export default class Auth {
  private _token: string

  constructor() {
    this._token = localStorage.getItem("token")!;

  }

  public async signInUser(email: string, password: string) {
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
      "/sign-in",
      { email: email, password: password }
    );
    return response.data.data;
  }

  public async signUpUser(email: string, password: string, username: string) {
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
      "/sign-up",
      { email: email, password: password, username: username }
    );
    return response
  }


  public async verifyUser(token: string) {
    instance.defaults.headers.common["Authorization"] = token
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
      "/sign-up/verify"
    );
    return response
  }



  public async getUserFromToken(token: string) {
    instance.defaults.headers.common["Authorization"] = token
    const response: AxiosResponse<interfaces.IGetUserResponse> = await instance.get(
      "/user"
    );
    return response.data;
  }

  public async getUserFromUsername(username: string) {
    const response: AxiosResponse<interfaces.IGetUserResponse> = await instance.get(
      `/user/${username}`
    );
    return response;
  }

  public async updateUser(details: any, education: any) {
    instance.defaults.headers.common["Authorization"] = this._token
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.put("/user", { details, education })
    return response
  }

}
