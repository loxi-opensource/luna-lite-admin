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
                <el-form-item label="联系方式" prop="mobile">
                    <el-input
                        class="w-[180px]"
                        v-model="queryParams.mobile"
                        clearable
                        placeholder="请输入联系方式"
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
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="用户ID" prop="user_id" show-overflow-tooltip />
                    <el-table-column label="反馈内容" prop="content" show-overflow-tooltip />
                    <el-table-column label="联系方式" prop="mobile" show-overflow-tooltip />
                    <el-table-column label="图片" prop="image_list">
                        <template #default="{ row }">
                            <div class="flex gap-2">
                                <image-contain
                                    v-for="(item, index) in row?.image_list"
                                    :key="index"
                                    :src="item"
                                    :height="60"
                                    object-fit="contain"
                                    :preview-src-list="row?.image_list"
                                    preview-teleported
                                    fit="contain"
                                />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['feedback/delete']"
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

<script lang="ts" setup name="feedbackLists">
import { apiFeedbackDelete, apiFeedbackLists } from '@/api/feedback'
import { useDictData } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'
import { timeFormat } from '@/utils/util'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({
    user_id: '',
    mobile: ''
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
    fetchFun: apiFeedbackLists,
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
    await apiFeedbackDelete({ id })
    getLists()
}

getLists()
</script>
