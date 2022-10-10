import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/friend",
    timeout: 100000,
});

export interface FriendRequest {
    _id: string
    sender: string
    sender_pfp: string
    recipient: string
}

export interface ResponseData {
    data: FriendRequest[]
    success: boolean
}


export default class Friend {
    _token: string

    constructor() {
        this._token = sessionStorage.getItem("token")!;
    }

    public async getFriendRequests() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<ResponseData> = await instance.get("/request")
        return response
    }
}
