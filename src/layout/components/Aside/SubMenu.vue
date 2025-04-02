<template>
    <div v-if="!item.hidden">
        <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="`/${item.url}`">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </template>
            <SubMenu v-for="(citem, index) in item.children" :key="citem.id + index" :item="citem" />
        </el-submenu>
        <template v-else>
            <el-menu-item :index="`/${item.url}`">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
    name: "SubMenu", //必须要 递归组件的关键，并且要与引入组件的变量名称一致
    components: {
        SubMenu,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
};
</script>
