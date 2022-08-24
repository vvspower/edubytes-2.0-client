import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:9000/community/forums",
  timeout: 100000,
});

export interface ILikes {
  username: string;
  type: string;
  user_pfp: string;
}

export interface IPost {
  _id: string;
  username: string;
  content: string;
  image: string;
  created: string;
  target: string;
  subject: string;
  tags: string[];
  user_pfp: string;
  likes: ILikes[];
}

export interface IGetPostsResponse {
  data: IPost[];
  success: boolean;
}

export default class Forum {
  public async getPostsTargetGeneral(target: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<IGetPostsResponse> = await instance.get(
      `/post/i/${target}/general`
    );
    return response.data;
  }
}
