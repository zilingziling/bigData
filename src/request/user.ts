import service from "./http";
import { user } from "./urls";

export async function Login(params?: any): Promise<any> {
    return service({
        url: user.login,
        method: 'post',
        data: params
    })
}
export async function getUserList(params?: any): Promise<any> {
    return service({
        url: user.userList,
        method: 'post',
        data: params
    })
}
export async function routeData(params?: any): Promise<any> {
    return service({
        url: user.routeData,
        method: 'post',
        data: params
    })
}