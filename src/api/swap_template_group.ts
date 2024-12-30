import request from '@/utils/request'

// 模板分组列表
export function apiSwapTemplateGroupLists(params: any) {
    return request.get({ url: '/swap_template_group/lists', params })
}

// 添加模板分组
export function apiSwapTemplateGroupAdd(params: any) {
    return request.post({ url: '/swap_template_group/add', params })
}

// 编辑模板分组
export function apiSwapTemplateGroupEdit(params: any) {
    return request.post({ url: '/swap_template_group/edit', params })
}

// 删除模板分组
export function apiSwapTemplateGroupDelete(params: any) {
    return request.post({ url: '/swap_template_group/delete', params })
}

// 模板分组详情
export function apiSwapTemplateGroupDetail(params: any) {
    return request.get({ url: '/swap_template_group/detail', params })
}