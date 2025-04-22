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
        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-button @click="resetFilters">重置</el-button>

        <!-- 下拉导出按钮 -->
        <el-dropdown @command="handleExport">
          <el-button type="success" class="ml-10">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="all">导出全部</el-dropdown-item>
            <el-dropdown-item command="week">导出周收</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      border
      style="margin-top: 20px;"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="site_name" label="网站名" width="200" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="shoulu_time" label="收录时间" width="180" sortable="custom" />
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
import { exportShouluAll, exportShouluWeek } from "@/api/export.js";
import debounce  from 'lodash/throttle';
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
      sortProp: '',
      sortOrder: '',
      tableData: []
    }
  },
  created() {
    // 确保只触发最后一次
    this.debouncedFetchData = debounce(this.fetchData, 500, {
      leading: false,
      trailing: true
    })
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('最终请求：', this.sortProp, this.sortOrder, new Date().toISOString())
      const params = {
        ...this.filters,
        page: this.pagination.page,
        page_size: this.pagination.page_size,
        sort_field: this.sortProp,
        sort_order: this.sortOrder
      }

      try {
        const res = await getSiteShoulu(params)
        this.tableData = res.data.data
        this.pagination.total = res.data.total
      } catch (err) {
        this.$message.error('获取数据失败')
      }
    },
    searchData() {
      this.pagination.page = 1
      this.fetchData()
    },
    handlePageChange(newPage) {
      this.pagination.page = newPage
      this.fetchData()
    },
    handleSizeChange(newSize) {
      this.pagination.page_size = newSize
      this.pagination.page = 1
      this.fetchData()
    },
    handleSortChange({ prop, order }) {
      this.sortProp = prop
      this.sortOrder = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : ''
      this.pagination.page = 1
      this.debouncedFetchData()
    },
    resetFilters() {
      this.filters = {
        site_name: '',
        title: '',
        shoulu_type: null
      }
      this.sortOrder = ""
      this.sortProp = ""
      this.pagination.page = 1
      this.fetchData()
    },
    handleExport(command) {
      if (command === 'all') {
        this.exportAll()
      } else if (command === 'week') {
        this.exportWeek()
      }
    },
    async exportAll() {
      try {
        const response = await exportShouluAll();
        if (response instanceof Blob) {
          const blob = response;
          const link = document.createElement('a');
          const objectURL = URL.createObjectURL(blob);
          link.href = objectURL;
          link.download = 'shoulu_all.xlsx';
          link.click();
          URL.revokeObjectURL(objectURL);
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            const json = JSON.parse(reader.result);
            this.$message.error(`导出失败：${json.message || '服务器错误'}`);
          };
          reader.readAsText(response.data);
        }
      } catch (err) {
        console.log(err)
        this.$message.error('导出失败！');
      }
    },
    async exportWeek() {
      try {
        const response = await exportShouluWeek();
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `shoulu_week_${Date.now()}.xlsx`;
        link.click();
      } catch (err) {
        this.$message.error('导出失败！')
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.ml-10 {
  margin-left: 10px;
}
</style>
