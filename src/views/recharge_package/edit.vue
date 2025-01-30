<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="90px" :rules="formRules">
                <el-form-item label="套餐名称" prop="name">
                    <el-input v-model="formData.name" clearable placeholder="请输入套餐名称" />
                </el-form-item>
                <el-form-item label="套餐描述" prop="describe">
                    <el-input v-model="formData.describe" clearable placeholder="请输入套餐描述" />
                </el-form-item>
                <el-form-item label="套餐价格" prop="sell_price">
                    <el-input-number
                        v-model="formData.sell_price"
                        clearable
                        placeholder="请输入套餐价格"
                        :min="0.01"
                        :max="99999"
                        :precision="2"
                    />
                </el-form-item>
                <el-form-item label="作图次数" prop="draw_number">
                    <el-input-number
                        v-model="formData.draw_number"
                        clearable
                        placeholder="请输入作图次数"
                        :min="1"
                        :max="99999"
                        :precision="0"
                    />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number
                        v-model="formData.sort"
                        clearable
                        placeholder="请输入排序"
                        :min="0"
                        :max="99999"
                        :precision="0"
                    />
                </el-form-item>
                <el-form-item label="套餐状态" prop="status">
                    <el-radio-group v-model="formData.status" placeholder="请选择套餐状态">
                        <el-radio
                            v-for="(item, index) in dictData.show_status"
                            :key="index"
                            :label="parseInt(item.value)"
                        >
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="rechargePackageEdit">
import type { FormInstance } from 'element-plus'
import type { PropType } from 'vue'

import {
    apiRechargePackageAdd,
    apiRechargePackageDetail,
    apiRechargePackageEdit
} from '@/api/recharge_package'
import Popup from '@/components/popup/index.vue'
defineProps({
    dictData: {
        type: Object as PropType<Record<string, any[]>>,
        default: () => ({})
    }
})
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')

// 弹窗标题
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑充值套餐' : '新增充值套餐'
})

// 表单数据
const formData = reactive({
    id: '',
    name: '',
    describe: '',
    sell_price: '',
    draw_number: '',
    sort: '',
    status: 1
})

// 表单验证
const formRules = reactive<any>({
    name: [
        {
            required: true,
            message: '请输入套餐名称',
            trigger: ['blur']
        }
    ],
    describe: [
        {
            required: true,
            message: '请输入套餐描述',
            trigger: ['blur']
        }
    ],
    sell_price: [
        {
            required: true,
            message: '请输入套餐价格',
            trigger: ['blur']
        }
    ],
    draw_number: [
        {
            required: true,
            message: '请输入作图次数',
            trigger: ['blur']
        }
    ],
    sort: [
        {
            required: true,
            message: '请输入排序',
            trigger: ['blur']
        }
    ],
    status: [
        {
            required: true,
            message: '请选择套餐状态',
            trigger: ['blur']
        }
    ]
})

// 获取详情
const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiRechargePackageDetail({
        id: row.id
    })
    setFormData(data)
}

// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData }
    mode.value == 'edit' ? await apiRechargePackageEdit(data) : await apiRechargePackageAdd(data)
    popupRef.value?.close()
    emit('success')
}

//打开弹窗
const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

// 关闭回调
const handleClose = () => {
    emit('close')
}

defineExpose({
    open,
    setFormData,
    getDetail
})
</script>
