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
    subjects: string[];
}

export interface Details {
    bio: string;
    pfp: string;
    completed: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    created: string;
    admin: boolean;
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

export interface Resource {
    resource_title: string
    resource_type: string
    preview_image: string
    board: string
    rating: number
    file_type: string
    subject: string
    link: string[]
    visibility: string
}

export interface All_Raters {
    rating: number
    username: string
    resource_id: string
    _id: string
}

export interface ReturnedResource {
    _id: string
    username: string
    resource_title: string
    resource_type: string
    preview_image: string
    rating: number
    user_rated: number
    file_type: string
    board: string
    subject: string
    link: string[]
    user_pfp: string
    visibility: string
    created: string
}

export interface ReturnedResourceResponse {
    data: ReturnedResource[]

}

export interface ReturnedResourceResponseSingle {
    data: ReturnedResource

}

export interface ResourceResponse {
    data: string
}

export interface Planner {
    username?: string
    title: string
    description: string
    due_date: string
    completed?: boolean
    type?: "exam" | "study"
    attatchments: {
        links: string[]
        files: string[]
    }
    created?: string
}



export interface sendingPlanner {
    title: string
    description: string
    due_date: string
    completed: boolean
    type: "exam" | "study"
    attatchments: {
        links: string[]
        files: string[]
    }
}

export interface ReturnedPlanner {
    _id: string
    username: string
    title: string
    description: string
    due_date: string
    completed: boolean
    type: "exam" | "study"
    attatchments: {
        links: string[]
        files: string[]
    }
    created: string
}



export interface ReturnedPlannerResponse {
    data: ReturnedPlanner
    success: boolean
}

export interface ReturnedPlannerResponseMultiple {
    data: ReturnedPlanner[]
    success: boolean
}

