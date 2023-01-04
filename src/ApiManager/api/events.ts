import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "https://edubytes.herokuapp.com/notifications",
    timeout: 100000,
});

export default class Notifications {
    _token: string

    constructor() {
        this._token = localStorage.getItem("token")!;
    }


    public async getNotifications() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.NotificationsResponse> = await instance.get(``)
        return response
    }


    public async getUnReadNotifications() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.NotificationsResponse> = await instance.get(`/latest`)
        return response
    }

}