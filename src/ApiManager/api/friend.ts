import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/friend",
    timeout: 100000,
});

export default class Friend {
    private _token: string

    constructor() {
        this._token = localStorage.getItem("token")!;
    }

    public async getFriendRequests() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResponseData> = await instance.get("/request")
        return response
    }

    public async sendFriendRequest(username: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.DefaultResponse> = await instance.post(`/request/${username}`)
        return response
    }

    public async acceptFriendRequest(username: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.DefaultResponse> = await instance.post(`/accept/${username}`)
        return response
    }
}
