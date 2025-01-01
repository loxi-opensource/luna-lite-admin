import request from '@/utils/request'

export function getFaceSwapKey() {
    return request.get({ url: '/setting.face_swap.setting/getFaceSwapKey' })
}

export function setFaceSwapKey(params: any) {
    return request.post({ url: '/setting.face_swap.setting/setFaceSwapKey', params })
}
