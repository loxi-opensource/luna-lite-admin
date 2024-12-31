import request from '@/utils/request'

// 换脸页面配置列表
export function apiSwapPageConfigLists(params: any) {
    return request.get({ url: '/swap_page_config/lists', params })
}

// 添加换脸页面配置
export function apiSwapPageConfigAdd(params: any) {
    return request.post({ url: '/swap_page_config/add', params })
}

// 编辑换脸页面配置
export function apiSwapPageConfigEdit(params: any) {
    return request.post({ url: '/swap_page_config/edit', params })
}

// 删除换脸页面配置
export function apiSwapPageConfigDelete(params: any) {
    return request.post({ url: '/swap_page_config/delete', params })
}

// 换脸页面配置详情
export function apiSwapPageConfigDetail(params: any) {
    return request.get({ url: '/swap_page_config/detail', params })
}