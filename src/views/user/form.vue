<template>
    <el-dialog title="用户" :visible.sync="visible" custom-class="custom-dialog" width="700px">
        <div class="custom-dialog-content">
            <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model.trim="form.username" placeholder="请输入账号" :readonly="!!form.id"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-show="!form.id">
                    <el-input v-model.trim="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="userinfo.nickname">
                    <el-input v-model.trim="form.userinfo.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.trim="form.userinfo.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat">
                    <el-input v-model.trim="form.userinfo.wechat" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
                        <el-option v-for="item in roleDataList" :key="item.role_id" :label="item.rolename" :value="item.role_id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <ImageUpload :value="form.userinfo.avatar" @change="imageChange" />
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm" :loading="loading">{{ loading ? "提交中 ..." : "确 定" }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { httpAction } from "@/api/manage";
import { roleList } from "@/api/system";
import { getUserRoleList } from "@/api/user";
import ImageUpload from "@/components/ImageUpload";
export default {
    components: { ImageUpload },
    mounted() {
        this.initDictConfig();
    },
    data() {
        return {
            visible: false,
            loading: false,
            form: { userinfo: {} },
            rules: {
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: { required: true, message: "请输入密码", trigger: "blur" },
                "userinfo.nickname": { required: true, message: "请输入昵称", trigger: "blur" },
            },
            url: {
                add: "/user/userAdd",
                edit: "/user/userEdit",
            },
            // 角色列表
            roleDataList: [],
        };
    },
    methods: {
        open(row = { userinfo: {} }) {
            this.visible = true;
            if (!row.userinfo) {
                row.userinfo = {};
            }
            this.form = this.deepClone(row);
            if (row.id) {
                this.$set(this.rules.password, "required", false);
                getUserRoleList({ userId: row.id }).then((res) => {
                    if (res.code === 200) this.$set(this.form, "roleIds", res.data);
                });
            } else {
                this.$set(this.rules.password, "required", true);
            }
        },
        initDictConfig() {
            roleList().then((res) => {
                if (res.code === 200) this.roleDataList = res.data;
            });
        },
        submitForm() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    let formData = this.deepClone(this.form);
                    let url = "",
                        method = "";
                    this.loading = true;
                    if (!formData.id) {
                        // 新增
                        url = this.url.add;
                        method = "post";
                    } else {
                        // 编辑
                        url = this.url.edit;
                        method = "put";
                    }
                    httpAction(url, formData, method)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message.success(res.msg);
                                this.$parent.loadDataTable();
                                this.cancel();
                            }
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        cancel() {
            this.$refs.form.resetFields();
            this.visible = false;
        },
        imageChange(data) {
            if (data.length === 0) {
                this.form.userinfo.avatar = null;
            } else {
                data.map((item) => {
                    this.form.userinfo.avatar = item.path;
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
