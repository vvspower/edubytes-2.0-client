import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/planner",
    timeout: 100000,
});

export default class Planner {
    private _token: string

    constructor() {
        this._token = localStorage.getItem("token")!
    }

    public async createPlanner(data: interfaces.sendingPlanner) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ReturnedPlannerResponse> = await instance.post("/", data)
        return response
    }

    public async getPlanner() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ReturnedPlannerResponseMultiple> = await instance.get("/")
        return response
    }

    public async updatePlanner(data: interfaces.Planner, id: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.DefaultResponse> = await instance.put(`/${id}`, data)
        return response
    }

    public async deletePlanner(id: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.DefaultResponse> = await instance.delete(`/${id}`)
        return response
    }
}