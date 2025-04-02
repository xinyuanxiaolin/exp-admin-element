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
                <el-button type="primary" icon="el-icon-plus" @click="add" v-hasPermi="['user:add']">新增</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="id"></el-table-column>
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="账号" prop="username" />
                <el-table-column label="昵称" prop="userinfo.nickname" />
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <PreviewImage :path="scope.row.userinfo.avatar" />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createdAt" />
                <el-table-column label="更新时间" prop="updatedAt" />
                <el-table-column label="操作" width="230px" align="right">
                    <template slot-scope="scope">
                        <el-link type="success" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link type="danger" icon="el-icon-delete" @click="deleteNode(scope.row.id)">删除</el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link type="warning" icon="el-icon-refresh" @click="resetPassword(scope.row.id)">重置密码</el-link>
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
                list: "/user/userList",
                delete: "/user/delete",
            },
        };
    },
    methods: {
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
