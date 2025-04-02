<template>
  <el-upload
    :action="action"
    :headers="headers"
    :multiple="multiple"
    list-type="picture-card"
    :file-list="fileList"
    :on-success="successFile"
    :on-remove="removeFile"
    :limit="limit"
    :accept="accept"
  >
    <i slot="default" class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
import { getStore } from "@/utils/storage";
export default {
  props: {
    value: {
      type: [String,Array,Object]
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data() {
    return {
      action: "/api/system/file/uploadFile",
      headers: {
        Authorization: getStore("token"),
      },
      fileList: [],
    };
  },
  watch: {
    value:{
      handler(val){
        this.fileList = [];
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              item = { name: item, url: process.env.VUE_APP_FILE_PATH+item };
            }
            return item;
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 文件上传成功
    successFile(file) {
      let { code } = file
      if(code === 200){
        this.$emit('change',file.data)
      }
    },
    // 文件删除
    removeFile(file, fileList){
      this.$emit('change',[])
    }
  },
};
</script>