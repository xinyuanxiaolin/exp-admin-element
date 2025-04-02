<template>
    <div>
        <el-form ref="queryForm" :model="queryParam" class="form-search" inline>
            <el-form-item>
                <el-input v-model.trim="queryParam.username" placeholder="用户名" />
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
            <el-table v-loading="loading" :data="tableData" row-key="id" border default-expand-all>
                <el-table-column label="菜单名称" prop="name" />
                <el-table-column label="前端组件" prop="component" />
                <el-table-column label="访问路径" prop="url" />
                <el-table-column label="排序" prop="sortno" />
                <el-table-column label="操作" width="230px" align="right">
                    <template slot-scope="scope">
                        <el-link type="primary" icon="el-icon-plus" @click="addMenu(scope.row)">新增</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link type="success" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
                        <el-divider direction="vertical"></el-divider>
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
import { resetPasswordUser } from "@/api/user";
import { ManageMixins } from "@/mixins/ManageMixins";
import PreviewImage from "@/components/PreviewImage";
import Form from "./form";
export default {
    mixins: [ManageMixins],
    components: { Form, PreviewImage },
    data() {
        return {
            url: {
                list: "/menu/treeList",
                delete: "/menu/menuDelete",
            },
        };
    },
    methods: {
        addMenu(row) {
            this.$refs.form.open(row, "addMenu");
        },
        // 重置密码
        resetPassword(id) {
            this.$prompt("请输入新密码", "重置密码", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(({ value }) => {
                resetPasswordUser({
                    id,
                    password: value,
                }).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            type: "success",
                            message: "密码重置成功！新密码: " + value,
                        });
                    }
                });
            });
        },
    },
};
</script>
