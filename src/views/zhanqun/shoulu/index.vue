<template>
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-form :inline="true" :model="filters" size="small" class="filter-form">
        <el-form-item label="网站名">
          <el-input v-model="filters.site_name" placeholder="输入网站名" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="filters.title" placeholder="输入标题关键词" />
        </el-form-item>
        <el-form-item label="收录类型">
          <el-select v-model="filters.shoulu_type" placeholder="请选择">
            <el-option label="日收" :value="1" />
            <el-option label="周收" :value="2" />
            <el-option label="月收" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">搜索</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </el-form-item>
      </el-form>
  
      <!-- 数据表格 -->
      <el-table :data="tableData" border style="margin-top: 20px;">
        <el-table-column prop="site_name" label="网站名" width="200" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="shoulu_time" label="收录时间" width="180" />
        <el-table-column prop="update_time" label="更新时间" width="180" />
      </el-table>
  
      <!-- 分页 -->
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pagination.page"
        :page-size="pagination.page_size"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        style="margin-top: 20px; text-align: center;"
      />
    </div>
  </template>
  
  <script>
  import { getSiteShoulu } from "@/api/zhanqun.js";
  
  export default {
    name: 'SiteShouluList',
    data() {
      return {
        filters: {
          site_name: '',
          title: '',
          shoulu_type: null
        },
        pagination: {
          page: 1,
          page_size: 10,
          total: 0
        },
        tableData: []
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const params = {
          ...this.filters,
          page: this.pagination.page,
          page_size: this.pagination.page_size
        }
  
        try {
          const res = await getSiteShoulu(params)
          this.tableData = res.data.data
          this.pagination.total = res.data.total
        } catch (err) {
          this.$message.error('获取数据失败')
        }
      },
      handlePageChange(newPage) {
        this.pagination.page = newPage
        this.fetchData()
      },
      handleSizeChange(newSize) {
        this.pagination.page_size = newSize
        this.pagination.page = 1 // 重置页码
        this.fetchData()
      },
      resetFilters() {
        this.filters = {
          site_name: '',
          title: '',
          shoulu_type: null
        }
        this.pagination.page = 1
        this.fetchData()
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    padding: 20px;
  }
  </style>
  