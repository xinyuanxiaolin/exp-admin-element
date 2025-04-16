<template>
  <div class="spider-statistics" style="padding: 20px;">
    <el-form :inline="true" size="small" @submit.native.prevent>
      <el-form-item label="域名">
        <el-input v-model="filters.domain" placeholder="请输入域名" clearable />
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="filters.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          clearable
        />
      </el-form-item>

      <el-form-item label="蜘蛛类别">
        <el-select v-model="filters.spider_type" placeholder="全部" clearable>
          <el-option label="头条" :value="1" />
          <el-option label="百度" :value="2" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column prop="domain" label="域名" />
      <el-table-column prop="type" label="蜘蛛类别">
        <template slot-scope="scope">
          <span>{{ getSpiderTypeLabel(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="访问次数" />
      <el-table-column prop="created_time" label="日期" />
      <el-table-column prop="updated_time" label="脚本爬取时间" />
    </el-table>

    <div style="text-align: right; margin-top: 20px;">
    <el-pagination
      background
      layout="sizes, prev, pager, next, jumper, ->, total"
      :total="total"
      :current-page.sync="pagination.page"
      :page-size.sync="pagination.page_size"
      :page-sizes="[10, 20, 50, 100]"
      @current-change="fetchData"
      @size-change="handleSizeChange"
    />

    </div>
  </div>
</template>

<script>
import { getSpider } from "@/api/zhanqun.js";

export default {
  name: 'SpiderStatistics',
  data() {
    return {
      filters: {
        domain: '',
        date: '',
        spider_type: null,
      },
      pagination: {
        page: 1,
        page_size: 10,
      },
      tableData: [],
      total: 0,
      loading: false,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      const params = {
        domain: this.filters.domain,
        date: this.filters.date,
        type: this.filters.spider_type,
        page: this.pagination.page,
        page_size: this.pagination.page_size,
      }
      getSpider(params).then((response) => {
          const { total, data } = response.data;
          this.tableData = data;
          this.total = total;
        })
        .catch((error) => {
          this.$message.error('获取数据失败');
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSpiderTypeLabel(type) {
      if (type === "1") return '头条';
      if (type === "2") return '百度';
      return '未知';
    },
    handleSizeChange(size) {
      this.pagination.page_size = size;
      this.pagination.page = 1; // 重置为第一页
      this.fetchData();
    },

  },
  mounted() {
    this.fetchData();
  },
};
</script>
