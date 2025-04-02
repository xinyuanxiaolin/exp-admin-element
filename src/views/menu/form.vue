<template>
    <el-dialog title="用户" :visible.sync="visible" custom-class="custom-dialog" width="700px">
        <div class="custom-dialog-content">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="上级菜单" prop="parent_id">
                    <el-cascader v-model="form.parent_id" :options="treeOption" :props="props" filterable></el-cascader>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">目录</el-radio>
                        <el-radio :label="2">菜单</el-radio>
                        <el-radio :label="3">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图标" v-if="form.type === 1 || form.type === 2">
                    <el-input v-model.trim="form.icon" placeholder="请输入图标"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model.trim="form.name" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="url" v-if="form.type === 1 || form.type === 2">
                    <el-input v-model.trim="form.url" placeholder="请输入路由地址"></el-input>
                </el-form-item>
                <el-form-item label="组件路径" prop="component" v-if="form.type === 2">
                    <el-input v-model.trim="form.component" placeholder="请输入组件路径"></el-input>
                </el-form-item>
                <el-form-item label="权限字符" prop="perms" v-if="form.type === 2 || form.type === 3">
                    <el-input v-model.trim="form.perms" placeholder="请输入权限字符"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.sortno" :min="1" label="排序"></el-input-number>
                </el-form-item>
                <el-form-item label="是否隐藏" v-if="form.type === 1 || form.type === 2">
                    <el-switch v-model="form.hidden" active-color="#13ce66" inactive-color="#909399"> </el-switch>
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
import { menuTreeList } from "@/api/system";
import ImageUpload from "@/components/ImageUpload";
export default {
    components: { ImageUpload },
    data() {
        return {
            visible: false,
            loading: false,
            form: {},
            rules: {
                name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
                url: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
            },
            url: {
                add: "/menu/add",
                edit: "/menu/edit",
            },
            props: {
                checkStrictly: true,
                label: "name",
                value: "id",
            },
            treeOption: [{ name: "顶级", id: "0" }],
        };
    },
    methods: {
        open(row = { parent_id: ["0"], sortno: 1, type: 1, hidden: 0 }, type) {
            this.visible = true;
            if (type === "addMenu") {
                this.form = this.deepClone({ parent_id: row.id, sortno: 1, type: 1, hidden: 0 });
            } else {
                this.form = this.deepClone(row);
            }
            this.initDictConfig();
        },
        initDictConfig() {
            this.treeOption = []
            menuTreeList().then((res) => {
                if (res.code === 200) {
                    this.treeOption = this.treeOption.concat(res.data);
                }
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
                    if (formData.parent_id instanceof Array) formData.parent_id = formData.parent_id.join(",");
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
    },
};
</script>

<style lang="scss" scoped></style>
