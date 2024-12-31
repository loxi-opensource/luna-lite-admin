import request from '@/utils/request'

// 意见反馈表列表
export function apiFeedbackLists(params: any) {
    return request.get({ url: '/feedback/lists', params })
}

// 添加意见反馈表
export function apiFeedbackAdd(params: any) {
    return request.post({ url: '/feedback/add', params })
}

// 编辑意见反馈表
export function apiFeedbackEdit(params: any) {
    return request.post({ url: '/feedback/edit', params })
}

// 删除意见反馈表
export function apiFeedbackDelete(params: any) {
    return request.post({ url: '/feedback/delete', params })
}

// 意见反馈表详情
export function apiFeedbackDetail(params: any) {
    return request.get({ url: '/feedback/detail', params })
}