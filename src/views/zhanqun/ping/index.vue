<template>
  <el-container>
    <el-header>
      <div style="display: flex; align-items: center; gap: 20px;">
        <!-- 多条件搜索 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索网站名或访问情况"
          suffix-icon="el-icon-search"
          style="width: 320px"
        />

        <!-- 日期选择 -->
        <el-date-picker
          v-model="searchVisitDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 220px"
        />

        <!-- 搜索按钮 -->
        <el-button type="primary" @click="fetchData">搜索</el-button>
      </div>
    </el-header>

    <el-main>
      <!-- 数据表格 -->
      <el-table :data="siteData" style="width: 100%" border stripe>
        <el-table-column label="网站名" prop="site_name" />
        <el-table-column label="访问情况" prop="visit_info" />
        <el-table-column label="创建时间" prop="created_at" width="180" />
        <el-table-column label="更新时间" prop="updated_at" width="180" />
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        style="margin-top: 20px; text-align: center;"
      />
    </el-main>
  </el-container>
</template>

<script>
import { getSiteTimeout } from "@/api/zhanqun.js";

export default {
  name: 'SiteVisitStats',
  data() {
    return {
      siteData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      searchQuery: '',        // 搜索关键字（网站名或访问情况）
      searchVisitDate: '',    // 单一日期
    };
  },
  methods: {
    fetchData() {
      const date = this.searchVisitDate || '';
      const params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        search: this.searchQuery,
        date: date, // 只传递日期而不是开始和结束日期
      }
      getSiteTimeout(params)
        .then((response) => {
          const { data, total } = response.data;
          this.siteData = data;
          this.pagination.total = total;
        })
        .catch((error) => {
          console.error('数据获取失败:', error);
        });
    },
    handlePageSizeChange(val) {
      this.pagination.pageSize = val;
      this.pagination.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();  // 可根据需求修改是否初始加载数据
  },
};
</script>

<style scoped>
.el-header {
  background-color: #f5f5f5;
  padding: 15px 20px;
}

.el-main {
  padding: 20px;
}
</style>
