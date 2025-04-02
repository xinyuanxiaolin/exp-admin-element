<template>
    <div>
        <el-form ref="queryForm" :model="queryParam" class="form-search" inline>
            <el-form-item>
                <el-input v-model.trim="queryParam.rolename" placeholder="角色名称" />
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="searchQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" @click="searchReset">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="id"></el-table-column>
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="角色名称" prop="rolename" />
                <el-table-column label="权限字符" prop="perms" />
                <el-table-column label="排序" prop="sortno" />
                <el-table-column label="创建时间" prop="createdAt" width="160px" />
                <el-table-column label="更新时间" prop="updatedAt" width="160px" />
                <el-table-column label="操作" width="140px" align="right">
                    <template slot-scope="scope">
                        <el-link type="success" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link type="danger" icon="el-icon-delete" @click="deleteNode(scope.row.role_id)">删除</el-link>
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
import PreviewImage from "@/components/PreviewImage";
import Form from "./form";
export default {
    mixins: [ManageMixins],
    components: { Form, PreviewImage },
    data() {
        return {
            url: {
                list: "/role/list",
                delete: "/role/roleDelete",
            },
        };
    },
    methods: {},
};
</script>
