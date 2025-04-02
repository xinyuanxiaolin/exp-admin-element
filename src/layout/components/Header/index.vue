<template>
    <header class="header-container">
        <div class="header-left">
            <i class="el-icon-s-operation action-colp" @click="collapseHandler"></i>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="urlName != 'Home'">{{ urlName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="header-right">
            <div class="user-action">
                <div class="state">在线</div>
                <el-dropdown>
                    <div class="name">{{ userInfo.nickname }}<i class="el-icon-arrow-down el-icon--right"></i></div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" @click.native="navigatorTo('/userInfo')">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" @click.native="logoutUser">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-avatar size="medium" :src="url + userInfo.avatar"></el-avatar>
        </div>
    </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { clearAll } from "@/utils/storage";
import { getStore } from "@/utils/storage";
export default {
    mounted() {
        this.userInfo = getStore("userInfo").userinfo;
    },
    data() {
        return {
            url: process.env.VUE_APP_FILE_PATH,
            urlName: "",
            userInfo: {},
        };
    },
    watch: {
        $route: {
            handler(value) {
                this.urlName = value.name;
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        ...mapMutations(["SET_isCollapse"]),
        // 切换左侧菜单
        collapseHandler() {
            let isCollapse = this.$store.state.isCollapse;
            this.SET_isCollapse((isCollapse = !isCollapse));
        },
        navigatorTo(path) {
            this.$router.push(path, () => {});
        },
        // 退出登录
        logoutUser() {
            this.$confirm("是否确认退出登录?", "退出登录", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                clearAll();
                this.$router.replace({ path: "/login" });
                this.$message.success("退出登录成功!");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.header-container {
    height: 60px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .action-colp {
        cursor: pointer;
        font-size: 26px;
    }
    .header-left {
        display: flex;
        align-items: center;
        .el-breadcrumb {
            margin-left: 10px;
        }
    }
    .header-right {
        display: flex;
        align-items: center;
        .user-action {
            margin-right: 10px;
            .state {
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-bottom: 3px;
                &::before {
                    content: "";
                    display: inline-block;
                    border-radius: 100%;
                    width: 10px;
                    height: 10px;
                    background-color: #21b978;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
