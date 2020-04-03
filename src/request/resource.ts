import service from "./http";
import { resource } from "./urls";

export async function getResourceList(params?: any): Promise<any> {
    return service({
        url: resource.resourceList,
        method: 'post',
        data: params
    })
}
export async function getGross(params?: any): Promise<any> {
    return service({
        url: resource.gross,
        method: 'post',
        data: params
    })
}
export async function getIncrease(params: any): Promise<any> {
    return service({
        url: resource.increase,
        method: 'post',
        data: params
    })
}
export async function getAllResource(params: any): Promise<any> {
    return service({
        url: resource.allresource,
        method: 'post',
        data: params
    })
}
export async function getTeacherReputation(params: any): Promise<any> {
    return service({
        url: resource.teacherReputation,
        method: 'post',
        data: params
    })
}
export async function getCoursesCollect(params: any): Promise<any> {
    return service({
        url: resource.coursesCollect,
        method: 'post',
        data: params
    })
}
export async function getGoodCourses(params: any): Promise<any> {
    return service({
        url: resource.goodCourses,
        method: 'post',
        data: params
    })
}
export async function getCoursesScore(params: any): Promise<any> {
    return service({
        url: resource.coursesScore,
        method: 'post',
        data: params
    })
}
export async function getClientProbably(params?: any): Promise<any> {
    return service({
        url: resource.clientProbably,
        method: 'post',
        data: params
    })
}
export async function getLive(params?: any): Promise<any> {
    return service({
        url: resource.live,
        method: 'post',
        data: params
    })
}
