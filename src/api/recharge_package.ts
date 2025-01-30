import request from '@/utils/request'

// 充值套餐列表
export function apiRechargePackageLists(params: any) {
    return request.get({ url: '/recharge_package/lists', params })
}

// 添加充值套餐
export function apiRechargePackageAdd(params: any) {
    return request.post({ url: '/recharge_package/add', params })
}

// 编辑充值套餐
export function apiRechargePackageEdit(params: any) {
    return request.post({ url: '/recharge_package/edit', params })
}

// 删除充值套餐
export function apiRechargePackageDelete(params: any) {
    return request.post({ url: '/recharge_package/delete', params })
}

// 充值套餐详情
export function apiRechargePackageDetail(params: any) {
    return request.get({ url: '/recharge_package/detail', params })
}