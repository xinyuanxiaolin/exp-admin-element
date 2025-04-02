<template>
    <div class="preview-image">
        <el-image
            v-if="path"
            :style="{width,height}"
            style="border: 1px solid #ddd"
            :src="url+path"
            :preview-src-list="[url+path]"
        >
            <div slot="error" class="error-image">
                <i class="el-icon-more"></i>
                <span>加载失败</span>
            </div>
        </el-image>
        <div v-else>
            <div class="no-image" :style="{width,height}">暂无图片</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            require: true,
            default: ''
        },
        width: {
            type: String,
            default: '50px'
        },
        height: {
            type: String,
            default: '50px'
        }
    },
    data (){
        return {
            url: process.env.VUE_APP_FILE_PATH
        }
    }
}
</script>

<style lang="scss" scoped>
$bgcolor: #e0e0e0;
.preview-image{
    ::v-deep .error-image{
        background-color: $bgcolor;
        width: 100%;
        height: 100%;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .no-image{
        background-color: $bgcolor;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
}
</style>
