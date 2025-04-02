<template>
    <div class="pagination">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="current"
            :total="total"
            :page-size="sizes"
            :page-sizes="[10, 20, 30, 40]"
            @size-change="handleSizeChange"
            @current-change="pagiChange"
        />
    </div>
</template>

<script>
export default {
    props: {
        total: [String, Number], //总数
        current: [String, Number], //[当前页数
        sizes: [String, Number], //每页显示个数
    },
    methods: {
        pagiChange(value) {
            this.$emit("pagicurrent", value);
        },
        handleSizeChange(value) {
            this.$emit("pagisize", value);
        },
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    margin-top: 10px;
    text-align: right;
}
</style>
