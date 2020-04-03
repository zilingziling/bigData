import service from "./http";
import { admin } from "./urls";

export async function groupSave(params: any): Promise<any> {
    return service({
        url: admin.groupSave,
        method: 'post',
        data: params
    })
}
export async function groupList(params?: any): Promise<any> {
    return service({
        url: admin.groupList,
        method: 'post',
        data: params
    })
}
export async function groupDelete(params: any): Promise<any> {
    return service({
        url: admin.groupDelete,
        method: 'post',
        data: params
    })
}
export async function routeSave(params: any): Promise<any> {
    return service({
        url: admin.routeSave,
        method: 'post',
        data: params
    })
}
export async function routeList(params?: any): Promise<any> {
    return service({
        url: admin.routeList,
        method: 'post',
        data: params
    })
}
export async function routeDelete(params: any): Promise<any> {
    return service({
        url: admin.routeDelete,
        method: 'post',
        data: params
    })
}
export async function groupData(params?: any): Promise<any> {
    return service({
        url: admin.groupData,
        method: 'post',
        data: params
    })
}
export async function routeCode(params?: any): Promise<any> {
    return service({
        url: admin.routeCode,
        method: 'post',
        data: params
    })
}