<template>
    <el-dialog title="角色" :visible.sync="visible" custom-class="custom-dialog" width="700px">
        <div class="custom-dialog-content">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="角色名称" prop="rolename">
                    <el-input v-model.trim="form.rolename" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="权限字符" prop="perms">
                    <el-input v-model.trim="form.perms" placeholder="请输入权限字符"></el-input>
                </el-form-item>
                <el-form-item label="菜单权限">
                    <menuTree v-if="visible" v-model="form.menuIds" :menuOptions="menuList" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.sortno" :min="1" label="排序"></el-input-number>
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
import ImageUpload from "@/components/ImageUpload";
import { mapState } from "vuex";
import menuTree from "./components/menuTree";
import { roleMenuTreeList } from "@/api/system";
export default {
    components: { ImageUpload, menuTree },
    data() {
        return {
            visible: false,
            loading: false,
            form: { sortno: 1 },
            rules: {
                rolename: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
                perms: [{ required: true, message: "请输入权限字符", trigger: "blur" }],
            },
            url: {
                add: "/role/roleAdd",
                edit: "/role/roleEdit",
            },
        };
    },
    computed: {
        ...mapState(["menuList"]),
    },
    methods: {
        open(row = { sortno: 1 }) {
            this.visible = true;
            this.form = this.deepClone(row);
            if (row.role_id) {
                roleMenuTreeList({
                    roleId: row.role_id,
                }).then((res) => {
                    if (res.code === 200) {
                        row.menuIds = res.data;
                        this.form = this.deepClone(row);
                    }
                });
            }
        },
        submitForm() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    let formData = this.deepClone(this.form);
                    let url = "",
                        method = "";
                    this.loading = true;
                    if (!formData.role_id) {
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
