<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form class="mb-[-16px]" :model="queryParams" inline>
                <el-form-item label="名称" prop="name">
                    <el-input
                        class="w-[180px]"
                        v-model="queryParams.name"
                        clearable
                        placeholder="请输入名称"
                    />
                </el-form-item>
                <el-form-item label="模板分组" prop="group_id">
                    <el-select v-model="queryParams.group_id" class="!w-[180px]">
                        <el-option label="全部" value />
                        <el-option
                            v-for="item in optionsData.template_group"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select
                        class="!w-[140px]"
                        v-model="queryParams.status"
                        clearable
                        placeholder="请选择状态"
                    >
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="(item, index) in dictData.show_status"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <el-button v-perms="['swap_template/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column label="ID" prop="id" show-overflow-tooltip />
                    <el-table-column label="目标图" prop="target_image">
                        <template #default="{ row }">
                            <image-contain
                                v-if="row.target_image"
                                :src="row.target_image"
                                :height="60"
                                :width="60"
                                object-fit="contain"
                                :preview-src-list="[row.target_image]"
                                preview-teleported
                                fit="contain"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="name" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status">
                        <template #default="{ row }">
                            <dict-value :options="dictData.show_status" :value="row.status" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="模板分组"
                        prop="template_group.name"
                        show-overflow-tooltip
                    />
                    <el-table-column label="组内排序" prop="sort" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['swap_template/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['swap_template/delete']"
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
            :option-data="optionsData"
            @success="getLists"
            @close="showEdit = false"
        />
    </div>
</template>

<script lang="ts" setup name="swapTemplateLists">
import { articleCateAll } from '@/api/article'
import { apiSwapTemplateDelete, apiSwapTemplateLists } from '@/api/swap_template'
import { apiSwapTemplateGroupAll } from '@/api/swap_template_group'
import { useDictData, useDictOptions } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'
import { timeFormat } from '@/utils/util'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({
    name: '',
    status: '',
    group_id: ''
})

// 选中数据
const selectData = ref<any[]>([])

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 获取字典数据
const { dictData } = useDictData('show_status')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiSwapTemplateLists,
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
    await apiSwapTemplateDelete({ id })
    getLists()
}

const { optionsData } = useDictOptions<{
    template_group: any[]
}>({
    template_group: {
        api: apiSwapTemplateGroupAll
    }
})

getLists()
</script>
