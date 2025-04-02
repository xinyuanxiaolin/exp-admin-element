<template>
    <aside class="aside-container" :style="{ width: asideWidth }">
        <div class="logo">
            <span v-if="isCollapse">EPS</span>
            <span v-else>express管理系统</span>
        </div>
        <el-menu
            class="menu"
            :default-active="activeIndex"
            :active="activeIndex"
            background-color="#020d18"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
        >
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <SubMenu v-for="(item, index) in menuLists" :key="item.id + index" :item="item" />
        </el-menu>
    </aside>
</template>

<script>
import { mapState } from "vuex";
import SubMenu from "./SubMenu";
export default {
    name: "Aside",
    components: { SubMenu },
    mounted() {
        this.activeIndex = this.$route.path;
    },
    data() {
        return {
            activeIndex: "/",
        };
    },
    computed: {
        ...mapState(["isCollapse", "menuList"]),
        asideWidth() {
            return this.isCollapse ? "64px" : "220px";
        },
        menuLists() {
            return this.menuList.map((item) => {
                return this.recursionMenuTree(item);
            });
        },
    },
    watch: {
        activeIndex(newValue) {
            if (newValue != this.$route.path) {
                this.activeIndex = this.$route.path;
            }
        },
    },
    methods: {
        // 递归菜单
        recursionMenuTree(data) {
            if (data.children && data.children.length > 0) {
                let children = data.children;
                for (const i in children) {
                    if (children[i].hidden || children[i].type === 3) {
                        data.children.splice(i, 1);
                    } else {
                        this.recursionMenuTree(children[i]);
                    }
                }
            }
            return data;
        },
    },
};
</script>

<style lang="scss" scoped>
.aside-container {
    overflow: auto;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 100vh;
    overflow-y: auto;
    background-color: #020d18;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.4s;
    .logo {
        text-align: center;
        color: #fff;
        font-size: 18px;
        padding: 18px 0;
        font-weight: bold;
        border-bottom: 1px solid #ffd04b;
        overflow: hidden;
        white-space: nowrap;
    }
    .menu {
        border-right: 0;
        background-color: #020d18;
    }
    ::v-deep .el-menu--collapse {
        .el-submenu {
            .el-submenu__title {
                span {
                    height: 0;
                    width: 0;
                    overflow: hidden;
                    visibility: hidden;
                    display: inline-block;
                }
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
    }
}
</style>
