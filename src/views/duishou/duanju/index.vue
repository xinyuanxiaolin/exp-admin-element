<template>
  <div>
    <!-- 筛选条件 -->
    <el-form :inline="true" size="small" class="filter-form">
      <el-form-item label="平台">
        <el-select v-model="filters.platform_name" placeholder="选择平台" clearable>
          <el-option v-for="item in platformOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="爬取日期">
        <el-date-picker v-model="filters.batch_time" type="date" placeholder="选择日期" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="filters.search_name" placeholder="请输入标题关键词" clearable @keyup.enter.native="fetchData" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="platform_name" label="平台" width="120" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="link" label="链接" width="250">
        <template slot-scope="scope">
          <a :href="scope.row.link" target="_blank">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="视频更新时间" width="180" />
      <el-table-column prop="batch_time" label="爬取时间" width="180" />
    </el-table>

    <!-- 分页 -->
    <div class="pagination" style="text-align: right; margin-top: 10px;">
      <el-pagination
        layout="sizes, prev, pager, next, total"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
  
  <script>
  import { duishouVideoInfo } from "@/api/duishou";
  export default {
    name: "VideoInfoTable",
    data() {
      return {
        filters: {
          platform_name: "",
          batch_time: ""
        },
        platformOptions: ["姚记体育", "一起看APP", "剧乐轩"],
        tableData: [],
        total: 0,
        page: 1,
        pageSize: 10
      };
    },
    methods: {
      fetchData() {
        const params = {
          page: this.page,
          page_size: this.pageSize,
          ...this.filters
        };
        duishouVideoInfo(params)
          .then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          })
          .catch((err) => {
            this.$message.error("数据加载失败");
            console.error(err);
          });
      },
      handlePageChange(newPage) {
        this.page = newPage;
        this.fetchData();
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.page = 1; // 重置到第一页
        this.fetchData();
      }

    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
  <style scoped>
  .filter-form {
    margin-bottom: 20px;
  }
  </style>
  