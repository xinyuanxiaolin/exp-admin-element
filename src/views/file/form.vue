<template>
  <el-dialog title="表单" :visible.sync="visible" width="400px">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      size="small"
      label-width="80px"
    >
      <el-form-item label="文件上传" prop="amount">
        <ImageUpload @change="imageChange" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      visible: false,
      url: {
      },
      form: {},
      rules: {},
    };
  },
  methods: {
    open(data = {}) {
      this.visible = true;
      this.form = this.deepClone(data);
    },
    // 文件上传
    imageChange(value){

    },
  },
};
</script>