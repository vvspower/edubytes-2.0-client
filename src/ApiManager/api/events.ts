import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/notifications",
    timeout: 100000,
});



export interface INotification {
    _id: string;
    for: string;
    from: {
        username: string
        pfp: string
    }
    content: string
    created: string
    read: boolean
    redirect: string
}

export interface NotificationsResponse {
    data: INotification[]
    success: boolean
}


export default class Notifications {
    _token: string

    constructor() {
        this._token = sessionStorage.getItem("token")!;
    }


    public async getNotifications() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<NotificationsResponse> = await instance.get(``)
        return response
    }

}