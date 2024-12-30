import request from '@/utils/request'

// 换脸记录列表
export function apiSwapRecordLists(params: any) {
    return request.get({ url: '/swap_record/lists', params })
}

// 添加换脸记录
export function apiSwapRecordAdd(params: any) {
    return request.post({ url: '/swap_record/add', params })
}

// 编辑换脸记录
export function apiSwapRecordEdit(params: any) {
    return request.post({ url: '/swap_record/edit', params })
}

// 删除换脸记录
export function apiSwapRecordDelete(params: any) {
    return request.post({ url: '/swap_record/delete', params })
}

// 换脸记录详情
export function apiSwapRecordDetail(params: any) {
    return request.get({ url: '/swap_record/detail', params })
}