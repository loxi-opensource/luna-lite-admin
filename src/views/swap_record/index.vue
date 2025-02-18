<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form class="mb-[-16px]" :model="queryParams" inline>
                <el-form-item label="用户ID" prop="user_id">
                    <el-input
                        class="w-[180px]"
                        v-model="queryParams.user_id"
                        clearable
                        placeholder="请输入用户ID"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <div>
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column label="用户ID" prop="user_id" show-overflow-tooltip />
                    <el-table-column label="目标图" prop="target_image">
                        <template #default="{ row }">
                            <image-contain
                                v-if="row.target_image"
                                :src="row.target_image"
                                :height="60"
                                :width="60"
                                object-fit="contain"
                                :preview-src-list="[
                                    row.target_image,
                                    row.user_image,
                                    row.result_image
                                ]"
                                preview-teleported
                                fit="contain"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="用户图" prop="user_image">
                        <template #default="{ row }">
                            <image-contain
                                v-if="row.user_image"
                                :src="row.user_image"
                                :height="60"
                                :width="60"
                                object-fit="contain"
                                :preview-src-list="[
                                    row.user_image,
                                    row.result_image,
                                    row.target_image
                                ]"
                                preview-teleported
                                fit="contain"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="生成结果图" prop="result_image">
                        <template #default="{ row }">
                            <image-contain
                                v-if="row.result_image"
                                :src="row.result_image"
                                :height="60"
                                :width="60"
                                object-fit="contain"
                                :preview-src-list="[
                                    row.result_image,
                                    row.target_image,
                                    row.user_image
                                ]"
                                preview-teleported
                                fit="contain"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="模板" prop="template_name" show-overflow-tooltip />
                    <el-table-column
                        label="模板分组"
                        prop="template_group_name"
                        show-overflow-tooltip
                    />
                    <el-table-column label="脸部图" prop="face_image">
                        <template #default="{ row }">
                            <image-contain
                                v-if="row.face_image"
                                :src="row.face_image"
                                :height="60"
                                :width="60"
                                object-fit="contain"
                                :preview-src-list="[row.face_image]"
                                preview-teleported
                                fit="contain"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['swap_record/delete']"
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

<script lang="ts" setup name="swapRecordLists">
import { apiSwapRecordDelete, apiSwapRecordLists } from '@/api/swap_record'
import { useDictData } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'
import { timeFormat } from '@/utils/util'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({
    user_id: ''
})

// 选中数据
const selectData = ref<any[]>([])

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 获取字典数据
const { dictData } = useDictData('')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiSwapRecordLists,
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
    await apiSwapRecordDelete({ id })
    getLists()
}

getLists()
</script>
