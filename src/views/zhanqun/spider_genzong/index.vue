<template>
  <div class="spider-statistics" style="padding: 20px;">
    <el-form :inline="true" size="small" @submit.native.prevent>
      <el-form-item label="域名">
        <el-input v-model="filters.host" placeholder="请输入域名" clearable />
      </el-form-item>
      <el-form-item label="蜘蛛ip">
        <el-input v-model="filters.ip" placeholder="请输入ip" clearable />
      </el-form-item>
      <el-form-item label="来源路径">
        <el-input v-model="filters.referer" placeholder="请输入来源路径" clearable />
      </el-form-item>
      <el-form-item label="访问路径">
        <el-input v-model="filters.url" placeholder="请输入访问路径" clearable />
      </el-form-item>
      <el-form-item label="爬取日期">
        <el-date-picker v-model="filters.catch_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
          clearable />
      </el-form-item>
      <el-form-item label="蜘蛛类别">
        <el-select v-model="filters.type" placeholder="全部" clearable>
          <el-option label="头条" :value="1" />
          <el-option label="百度" :value="2" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="根据抓取时间排序">
          <el-select v-model="filters.host" placeholder="默认" clearable>
            <el-option label="升序" value="asc" />
            <el-option label="降序" value="desc" />
          </el-select>
        </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <!-- 下拉导出按钮 -->
        <!-- <el-dropdown @command="handleExport">
            <el-button type="success" class="ml-10">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="all">导出全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="host" label="访问域名" />
      <el-table-column prop="type" label="蜘蛛类型">
        <template slot-scope="scope">
          <span>{{ getSpiderTypeLabel(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="蜘蛛ip" />
      <el-table-column prop="referer" label="来源路径">
        <template slot-scope="scope">
          <a :href="scope.row.referer.startsWith('http') ? scope.row.referer : 'http://' + scope.row.referer"
            target="_blank">{{ scope.row.referer }}</a>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="访问路径">
        <template slot-scope="scope">
          <a :href="scope.row.referer.startsWith('http') ? scope.row.url : 'http://' + scope.row.url"
          target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="catch_time" label="爬取日期" />
    </el-table>


    <div style="text-align: right; margin-top: 20px;">
      <el-pagination background layout="sizes, prev, pager, next, jumper, ->, total" :total="total"
        :current-page.sync="pagination.page" :page-size.sync="pagination.page_size" :page-sizes="[10, 20, 50, 100]"
        @current-change="fetchData" @size-change="handleSizeChange" />
    </div>
  </div>
</template>
  
  <script>
  import { getSpiderLogs } from "@/api/zhanqun.js";
//   import { exportSpiderAll } from "@/api/export.js";
  export default {
    name: 'SpiderStatistics',
    data() {
      return {
        filters: {
          host: '',
          ip: '',
          type: null,
          referer: '',
          url: '',
          catch_time: ''
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
          host: this.filters.host,
          ip: this.filters.ip,
          type: this.filters.type,
          url:this.filters.url,
          referer: this.filters.referer,
          catch_time: this.filters.catch_time,
          page: this.pagination.page,
          page_size: this.pagination.page_size,
        };
        getSpiderLogs(params)
          .then((response) => {
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
      handleSizeChange(size) {
        this.pagination.page_size = size;
        this.pagination.page = 1; // 重置为第一页
        this.fetchData();
      },
      handleSearch() {
        this.pagination.page = 1; // 查询时重置页码
        this.fetchData();
      },
      getSpiderTypeLabel(type) {
        if (type === 1 || type === "1") return '头条';
        if (type === 2 || type === "2") return '百度';
        return '未知';
      },
    //   handleExport(command) {
    //     if (command === 'all') {
    //       this.exportAll()
    //     }
    //   },
    //   async exportAll() {
    //     try {
    //       const response = await exportSpiderAll();
    //       if (response instanceof Blob) {
    //         const blob = response;
    //         const link = document.createElement('a');
    //         const objectURL = URL.createObjectURL(blob);
    //         link.href = objectURL;
    //         link.download = 'spider.xlsx';
    //         link.click();
    //         URL.revokeObjectURL(objectURL);
    //       } else {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //           const json = JSON.parse(reader.result);
    //           this.$message.error(`导出失败：${json.message || '服务器错误'}`);
    //         };
    //         reader.readAsText(response.data);
    //       }
    //     } catch (err) {
    //       console.log(err)
    //       this.$message.error('导出失败！');
    //     }
    //   },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  <style scoped>
  .ml-10 {
    margin-left: 10px;
  }
  </style>
  