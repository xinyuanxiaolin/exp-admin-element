<template>
    <div>
        <el-form ref="queryForm" :model="queryParam" class="form-search" inline>
            <el-form-item>
                <el-input v-model.trim="queryParam.name" placeholder="文件名称" />
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="searchQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" @click="searchReset">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-add" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="id"></el-table-column>
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="文件名称" align="left" prop="name" />
                <el-table-column label="文件存储名称" align="left" prop="filename" />
                <el-table-column label="文件类型" align="left" prop="type" />
                <el-table-column label="文件大小" align="left" prop="size" />
                <el-table-column label="文件后缀" align="left" prop="suffix" />
                <el-table-column label="文件路径" align="left">
                    <template slot-scope="scope">
                        <PreviewImage :path="scope.row.path" />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="left" prop="createdAt" />
                <el-table-column label="更新时间" align="left" prop="updatedAt" />
                <el-table-column label="操作" width="200px" align="right">
                    <template slot-scope="scope">
                        <el-link type="danger" icon="el-icon-delete" @click="deleteNode(scope.row.id)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <Pagi :total="pagi.total" :current="pagi.current" :sizes="pagi.size" @pagicurrent="togglePagi" @pagisize="togglePageSize"></Pagi>
        </div>
        <Form ref="form" />
    </div>
</template>

<script>
import { ManageMixins } from "@/mixins/ManageMixins";
import Form from './form';
import PreviewImage from "@/components/PreviewImage"
export default {
    mixins: [ManageMixins],
    components: {
        Form,
        PreviewImage
    },
    data() {
        return {
            url: {
                list: "/file/list",
                delete: "/system/file/deleteFile",
            },
        };
    },
};
</script>
