<template>
    <div>
        <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event)">展开/折叠</el-checkbox>
        <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event)">全选/全不选</el-checkbox>
        <!-- <el-checkbox v-model="menuCheckStrictly" @change="handleCheckedTreeConnect($event)">父子联动</el-checkbox> -->
        <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="comptree"
            node-key="id"
            @check-change="selectNodeChange"
            :check-strictly="!menuCheckStrictly"
            empty-text="加载中，请稍候"
            :props="defaultProps"
        ></el-tree>
    </div>
</template>

<script>
import { menuList } from "@/api/system";
export default {
    name: "MenuTree",
    props: {
        value: {
            type: Array,
            default: function () {
                return [];
            },
        },
        menuCheckStrictly: {
            type: Boolean,
            default: false,
        },
        menuOptions: {
            type: Array,
            default: function () {
                return [];
            },
            required: true,
        },
        defaultProps: {
            type: Object,
            default: function () {
                return {
                    children: "children",
                    label: "name",
                };
            },
        },
    },
    data() {
        return {
            menuNodeAll: false,
            menuExpand: false,
            list: [],
        };
    },
    watch: {
        value: {
            handler(value) {
                if (value) {
                    value.forEach((v) => {
                        this.$nextTick(() => {
                            this.$refs.comptree.setChecked(v, true, false);
                        });
                    });
                }
            },
        },
        deep: true,
        immediate: true,
    },
    mounted() {
        if (this.value) {
            this.value.forEach((v) => {
                this.$nextTick(() => {
                    this.$refs.comptree.setChecked(v, true, false);
                });
            });
        }
        menuList().then((res) => {
            if (res.code === 200) this.list = res.data;
        });
    },
    beforeUpdate() {
        if (this.value) {
            this.value.forEach((v) => {
                this.$nextTick(() => {
                    this.$refs.comptree.setChecked(v, true, false);
                });
            });
        }
    },
    methods: {
        selectNodeChange() {
            // 目前被选中的菜单节点
            let checkedKeys = this.$refs.comptree.getCheckedKeys();
            // 半选中的菜单节点
            let halfCheckedKeys = this.$refs.comptree.getHalfCheckedKeys();
            checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
            this.$emit("input", checkedKeys);
        },
        // 树权限（展开/折叠）
        handleCheckedTreeExpand(value) {
            let treeList = this.list;
            for (let i = 0; i < treeList.length; i++) {
                this.$refs.comptree.store.nodesMap[treeList[i].id].expanded = value;
            }
        },
        // 树权限（全选/全不选）
        handleCheckedTreeNodeAll(value) {
            this.$refs.comptree.setCheckedNodes(value ? this.list : []);
        },
        // 树权限（父子联动）
        handleCheckedTreeConnect(value) {
            this.menuCheckStrictly = !!value;
            this.$emit("checkStrictlyChange", value);
        },
    },
};
</script>

<style scoped></style>
