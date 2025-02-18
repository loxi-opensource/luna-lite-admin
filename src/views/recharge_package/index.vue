<template>
    <div>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <el-button v-perms="['recharge_package/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists">
                    <el-table-column label="套餐名称" prop="name" show-overflow-tooltip />
                    <el-table-column label="套餐描述" prop="describe" show-overflow-tooltip />
                    <el-table-column label="套餐价格" prop="sell_price" show-overflow-tooltip />
                    <el-table-column label="作图次数" prop="draw_number" show-overflow-tooltip />
                    <el-table-column label="排序" prop="sort" show-overflow-tooltip />
                    <el-table-column label="套餐状态" prop="status">
                        <template #default="{ row }">
                            <dict-value :options="dictData.show_status" :value="row.status" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['recharge_package/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['recharge_package/delete']"
                                type="danger"
                                link
                                @click="handleDelete(row.id)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <edit-popup
            v-if="showEdit"
            ref="editRef"
            :dict-data="dictData"
            @success="getLists"
            @close="showEdit = false"
        />
    </div>
</template>

<script lang="ts" setup name="rechargePackageLists">
import { apiRechargePackageDelete, apiRechargePackageLists } from '@/api/recharge_package'
import { useDictData } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({})

// 获取字典数据
const { dictData } = useDictData('show_status')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiRechargePackageLists,
    params: queryParams
})

// 添加
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

// 编辑
const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await apiRechargePackageDelete({ id })
    getLists()
}

getLists()
</script>
