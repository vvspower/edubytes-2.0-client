import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/notifications",
    timeout: 100000,
});

export default class Notifications {
    _token: string

    constructor() {
        this._token = sessionStorage.getItem("token")!;
    }


    public async getNotifications() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.NotificationsResponse> = await instance.get(``)
        return response
    }

}