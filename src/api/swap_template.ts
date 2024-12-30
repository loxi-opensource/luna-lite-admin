import request from '@/utils/request'

// 换脸模板列表
export function apiSwapTemplateLists(params: any) {
    return request.get({ url: '/swap_template/lists', params })
}

// 添加换脸模板
export function apiSwapTemplateAdd(params: any) {
    return request.post({ url: '/swap_template/add', params })
}

// 编辑换脸模板
export function apiSwapTemplateEdit(params: any) {
    return request.post({ url: '/swap_template/edit', params })
}

// 删除换脸模板
export function apiSwapTemplateDelete(params: any) {
    return request.post({ url: '/swap_template/delete', params })
}

// 换脸模板详情
export function apiSwapTemplateDetail(params: any) {
    return request.get({ url: '/swap_template/detail', params })
}