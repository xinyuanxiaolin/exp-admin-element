<template>
    <el-container>
      <el-header>
        <el-input
          v-model="searchQuery"
          placeholder="搜索网站"
          suffix-icon="el-icon-search"
          @input="fetchData"
          style="width: 300px; margin-left: 20px;"
        />
      </el-header>
      <el-main>
        <el-table
          :data="siteData"
          style="width: 100%"
          :pagination="pagination"
          @pagination-change="handlePaginationChange"
        >
          <el-table-column label="网站名" prop="siteName" />
          <el-table-column label="访问情况" prop="visitInfo" />
          <el-table-column label="最后测速时间" prop="lastVisit" />
        </el-table>
  
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </el-main>
    </el-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        siteData: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        searchQuery: '',
      };
    },
    methods: {
      fetchData() {
        axios
          .get('/api/site-visit-stats', {
            params: {
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
              search: this.searchQuery,
            },
          })
          .then((response) => {
            const { data, total } = response.data;
            this.siteData = data;
            this.pagination.total = total;
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      },
      handlePaginationChange(val) {
        this.pagination.currentPage = val;
        this.fetchData();
      },
      handlePageSizeChange(val) {
        this.pagination.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.fetchData();
      },
    },
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style scoped>
  .el-header {
    background-color: #f4f4f4;
    padding: 10px;
  }
  
  .el-main {
    padding: 20px;
  }
  
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  