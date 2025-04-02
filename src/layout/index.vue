<template>
    <el-container>
        <Aside />
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <main class="main-container">
                    <transition name="fade-transform" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { Aside, Header } from "./components";
export default {
    name: "Layout",
    components: { Aside, Header },
};
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
}
.el-header {
    padding: 0;
}
.el-main {
    padding: 20px;
    background-color: #eff1f7;
    .main-container {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
