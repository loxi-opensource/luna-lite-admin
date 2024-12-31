<template>
    <div>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <div>
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column label="页面ID" prop="id" width="120" />
                    <el-table-column label="名称" prop="name" width="200" />
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                link
                                :icon="Setting"
                                @click="onOpenDrawer(row)"
                            >
                                页面配置
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <edit-popup
            v-if="showEdit"
            ref="editRef"
            :dict-data="dictData"
            @success="getLists"
            @close="showEdit = false"
        />
        <el-drawer
            v-model="drawer"
            title="商品池 - 页面配置"
            direction="rtl"
            :before-close="handleClose"
            size="60%"
        >
            <div class="flex justify-center gap-4">
                <el-card class="w-2/5">
                    <div class="h-[800px] overflow-auto custom-scrollbar">
                        <div class="flex items-center my-4 gap-4">
                            <span class="font-bold text-xl">显示模板分组</span>
                            <el-button type="primary" @click="savePageData">保存</el-button>
                        </div>
                        <draggable
                            class="flex flex-col space-y-2 min-h-[400px]"
                            :list="drawerDetail.page_data?.show_list"
                            group="people"
                            @change="log"
                            itemKey="name"
                        >
                            <template #item="{ element }">
                                <div class="border-2 rounded-lg p-4 flex justify-between w-[280px]">
                                    <div>
                                        {{ element.name }}
                                    </div>
                                    <div class="drag-move cursor-move ml-auto">
                                        <icon name="el-icon-Rank" size="18" />
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </el-card>
                <el-card class="w-2/5">
                    <div class="h-[800px] overflow-auto custom-scrollbar">
                        <div class="flex justify-between my-4">
                            <h3>未使用的模板分组</h3>
                            <div class="text-info flex items-center">
                                <icon name="el-icon-InfoFilled" size="14" />
                                <span> 拖动元素到左侧，可自由排序 </span>
                            </div>
                        </div>
                        <draggable
                            class="flex flex-col space-y-2 min-h-[400px]"
                            :list="drawerDetail.page_data?.pending_list"
                            group="people"
                            @change="log"
                            :sort="false"
                            itemKey="name"
                        >
                            <template #item="{ element }">
                                <div class="border-2 rounded-lg p-4 flex justify-between w-[280px]">
                                    <div>
                                        {{ element.name }}
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </el-card>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup name="swapPageConfigLists">
import { Setting } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import Draggable from 'vuedraggable'

import { apiSwapPageConfigEdit, apiSwapPageConfigLists } from '@/api/swap_page_config'
import { useDictData } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'

import EditPopup from './edit.vue'

const drawer = ref(false)
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认退出编辑？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
const log = (evt) => {
    console.log('drag event', evt)
}

const savePageData = () => {
    apiSwapPageConfigEdit({
        id: drawerDetail.value.id,
        name: drawerDetail.value.name,
        page_data: drawerDetail.value.page_data
    }).then(() => {
        drawer.value = false
    })
}

// 定义页面数据类型
interface PageData {
    show_list: any[]
    pending_list: any[]
}

// 定义页面配置类型
interface PageConfig {
    id: number
    name: string
    page_data: PageData
}

const drawerDetail = ref<PageConfig>(null)

const onOpenDrawer = (row) => {
    drawerDetail.value = row as PageConfig
    drawer.value = true
    console.log(
        'drawerDetail',
        drawerDetail.value.page_data.show_list,
        drawerDetail.value.page_data.pending_list
    )
}

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({})

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
    fetchFun: apiSwapPageConfigLists,
    params: queryParams
})

// 编辑
const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

getLists()
</script>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: var(--el-color-primary-light-5) transparent; /* Firefox */
}

/* WebKit (Chrome, Safari) */
.custom-scrollbar::-webkit-scrollbar {
    width: 1px; /* 滚动条宽度 */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent; /* 滚动条轨道 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--el-color-primary-light-5); /* 滚动条颜色 */
    border-radius: 4px; /* 圆角 */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--el-color-primary-light-5); /* 悬停时的颜色 */
}
</style>
