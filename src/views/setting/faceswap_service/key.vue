<!-- 站点统计 -->
<template>
    <div class="website-statistics">
        <el-form
            ref="formRef"
            :rules="rules"
            class="ls-form"
            :model="formData"
            scroll-to-error
            label-width="120px"
        >
            <el-card shadow="never" class="!border-none">
                <div class="text-xl font-medium">换脸算法服务配置</div>
                <div class="form-tips mb-2">
                    请前往<a
                        class="text-primary"
                        href="https://signin.sensecore.cn/?login_challenge"
                        target="_blank"
                    >
                        《商汤科技-日日新开发平台》
                    </a>
                    注册账号并创建应用，获取应用ID和应用密钥
                </div>
                <el-form-item label="应用ID" prop="clarity_code">
                    <div class="flex flex-col">
                        <div class="w-80">
                            <el-input
                                v-model.trim="formData.ak"
                                placeholder="请填写AK (AccessKey ID)"
                            />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="应用密钥" prop="clarity_code">
                    <div class="flex flex-col">
                        <div class="w-80">
                            <el-input
                                v-model.trim="formData.sk"
                                placeholder="请填写SK (AccessKey Secret)"
                            />
                        </div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['setting.web.web_setting/setWebsite']">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="faceSwapService">
import type { FormInstance } from 'element-plus'

import { getFaceSwapKey, setFaceSwapKey } from '@/api/setting/face_swap'

const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive<{
    ak: string
    sk: string
}>({
    ak: '',
    sk: ''
})

// 表单验证
const rules = {}

// 获取站点统计配置
const getData = async () => {
    const data = await getFaceSwapKey()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

// 设置站点统计配置
const handleSubmit = async () => {
    await formRef.value?.validate()
    await setFaceSwapKey(formData)
    getData()
}

onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped></style>
