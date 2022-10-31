export interface IAuthResponse {
    data: string;
    success: boolean;
}

export interface Friends {
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
    verified: boolean;
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

export interface Replies {
    _id: string
    username: string
    reply_to: string
    image: string
    content: string
    created: string
    user_pfp: string
}

export interface IGetPostsResponse {
    data: IPost[];
    success: boolean;
}

export interface IGetRepliesResponse {
    data: Replies[]
    success: boolean
}

export interface IDefaultResponse {
    data: string;
    success: boolean;
}

export interface ITopPosts {
    case: string
    sorted: IPost[]
}

export interface ITopPostsResponse {
    data: ITopPosts,
    success: boolean

}

export interface ISinglePost {
    data: IPost
    success: boolean
}

export interface IMultiplePosts {
    data: IPost[]
    success: boolean
}

export interface IPostReply {
    data: Replies
    success: boolean
}

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

export interface DefaultResponse {
    data: string,
    success: boolean
}

export interface SuggestedPost {
    _id: string;
    username: string;
    content: string;
    image: string;
    created: string;
    target: string;
    subject: string;
    tags: string[];
    user_pfp: string
}

export interface SuggestedUser {
    _id: string
    username: string
    created: string
    partnerd: string
    details: Details
}

export interface ResponseSuggestedUser {
    data: SuggestedUser[],
    success: boolean
}

export interface ResponseSuggestedPost {
    data: SuggestedPost[],
    success: boolean
}

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

export interface Replies {
    _id: string
    username: string
    reply_to: string
    image: string
    content: string
    created: string
    user_pfp: string
}

export interface IGetPostsResponse {
    data: IPost[];
    success: boolean;
}

export interface IGetRepliesResponse {
    data: Replies[]
    success: boolean
}

export interface IDefaultResponse {
    data: string;
    success: boolean;
}

export interface ITopPosts {
    case: string
    sorted: IPost[]
}

export interface ITopPostsResponse {
    data: ITopPosts,
    success: boolean

}

export interface ISinglePost {
    data: IPost
    success: boolean
}

export interface IMultiplePosts {
    data: IPost[]
    success: boolean
}

export interface IPostReply {
    data: Replies
    success: boolean
}

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

export interface DefaultResponse {
    data: string,
    success: boolean
}

export interface SuggestedPost {
    _id: string;
    username: string;
    content: string;
    image: string;
    created: string;
    target: string;
    subject: string;
    tags: string[];
    user_pfp: string
}

export interface SuggestedUser {
    _id: string
    username: string
    created: string
    partnerd: string
    details: Details
}

export interface ResponseSuggestedUser {
    data: SuggestedUser[],
    success: boolean
}

export interface ResponseSuggestedPost {
    data: SuggestedPost[],
    success: boolean
}

// "username": username,
// "resource_title": content["resource_title"],
// "resource_type": content["resource_type"],
// "preview_image": content["preview_image"],
// "price": content["price"],
// "rating": content["rating"],
// "file_type": content["file_type"],
// # will be an array, single element in array in pdf, or else multiple links of images
// "subject": content["subject"],
// 'link': content["link"], # this will be a list
// "created": content["created"],

export interface Resource {
    username: string
    resource_title: string
    resource_type: string
    preview_image: string
    price: number
    rating: number
    file_type: string
    subject: string
    link: string[]
    created: string
}

export interface ResourceResponse {
    data: Resource
}