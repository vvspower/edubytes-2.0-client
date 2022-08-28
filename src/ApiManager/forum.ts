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

export interface IDefaultResponse {
  data: string;
  success: boolean;
}

export default class Forum {
  private async uploadImage(form: FormData) {
    const response: any = await instance.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      form
    );
    return response.data.url.toString();
  }

  public async createPost(content: string, target: string, subject: string, tags: string[], img: FormData | undefined) {
    let image = ""
    if (img !== undefined) {
      image = await this.uploadImage(img!)
    }
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    const response: AxiosResponse<IDefaultResponse> = await instance.post(
      "/post", { content, image, target, subject, tags, }
    );
    return response;
  }
  public async getPostsTargetGeneral(target: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<IGetPostsResponse> = await instance.get(
      `/post/i/${target}/general`
    );
    return response.data;
  }
  public async postLike(like: boolean, id: string) {
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    if (like) {
      const response: AxiosResponse<IDefaultResponse> = await instance.post(
        `/post/like/${id}/like`
      );
      return response.data.success
    } else {
      const response: AxiosResponse<IDefaultResponse> = await instance.delete(
        `/post/like/${id}`
      );
      return response.data.success
    }
  }
}
