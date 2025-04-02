import { Message } from "element-ui";
import { getAction, deleteAction } from "@/api/manage";
import Pagi from "@/components/Pagi";
export const ManageMixins = {
    components: { Pagi },
    mounted() {
        this.loadDataTable();
        /* 初始化字典配置 */
        this.initDictConfig();
    },
    data() {
        return {
            /* 表格数据 */
            tableData: [],
            /* table选中的值 */
            multipleSelection: [],
            /* table加载状态 */
            loading: false,
            /* 导出按钮加载状态 */
            exportLoading: false,
            /* 按钮加载状态 */
            btnloading: false,
            /* 分页参数 */
            pagi: {
                total: 0,
                current: 1,
                size: 10,
            },
            /* 查询参数 */
            queryParam: {},
            /* 初始的查询筛选参数 */
            loadingParam: {},
            /* 筛选参数 */
            filters: {},
            /* 接口配置 */
            url: {
                list: "",
                delete: "",
                deleteBatch: "",
                export: "",
            },
            /* 只读状态 */
            readonly: false,
            /* 表单显示状态 */
            showform: false,
            /* 查看或修改方法需要的id */
            id: "",
            /* 监督区域Id */
            areaId: "",
        };
    },
    methods: {
        // 加载数据
        loadDataTable(arg) {
            //加载数据 若传入参数1则加载第一页的内容
            if (arg === 1) {
                this.pagi.current = 1;
            }
            this.loading = true;
            if (this.url.list != "") {
                let params = this.getQueryParams();
                getAction(this.url.list, params)
                    .then((res) => {
                        if (res.code === 200) {
                            this.tableData = res.data;
                            this.pagi.total = res.total;
                            this.pagi.current = res.current;
                            this.pagi.size = res.pageSize;
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.$message.warning(`请配置list接口`);
                this.loading = false;
            }
        },
        initDictConfig() {},
        // 查询条件
        getQueryParams() {
            let param = Object.assign(this.queryParam, this.filters, this.loadingParam);
            param.current = this.pagi.current;
            param.pageSize = this.pagi.size;
            return this.filterObj(param);
        },
        // 分页方法
        togglePagi(value) {
            this.pagi.current = value;
            this.loadDataTable();
        },
        // 每页条数
        togglePageSize(value) {
            this.pagi.size = value;
            this.loadDataTable();
        },
        // 搜索
        searchQuery() {
            this.loadDataTable(1);
        },
        // 重置搜索
        searchReset() {
            this.queryParam = {};
            this.$refs["queryForm"].resetFields();
            this.loadDataTable(1);
        },
        /**
         * 过滤对象中为空的属性
         * @param obj
         * @returns {*}
         */
        filterObj(obj) {
            if (!(typeof obj == "object")) {
                return;
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === "")) {
                    delete obj[key];
                }
            }
            return obj;
        },
        // 删除方法
        deleteNode(id) {
            this.$confirm('确认删除吗?', '删除操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                if (this.url.delete) {
                    deleteAction(this.url.delete,{id}).then((res) => {
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                            this.loadDataTable();
                        }
                    }).finally(() => {
                        this.loading = false
                    })
                }else{
                    this.$message.warning(`请配置delete接口`);
                }
            })
        },
        // 批量删除
        batchDel(id) {
            if (this.multipleSelection.length <= 0) {
                this.$message.info("请选择一条数据！");
                return;
            } else {
                var ids = this.multipleSelection.map((item) => {
                    return item[id];
                });
                ids = ids.toString();
                let _this = this;
                this.$popupMessage({
                    title: "确认批量删除",
                    message: "是否删除选中数据?",
                    type: "warning",
                    success() {
                        deleteAction(_this.url.deleteBatch + ids).then((res) => {
                            if (res.code === 200) {
                                _this.$message.success("批量删除成功!");
                                _this.loadDataTable();
                            } else {
                                _this.$message.error("批量删除失败!");
                                _this.loadDataTable();
                            }
                        });
                    },
                });
            }
        },
        // 导出方法
        handleExport(fileName) {
            const queryParam = this.queryParam;
            let _this = this;
            this.$popupMessage({
                title: "确认导出",
                message: "是否导出当前数据?",
                type: "success",
                success() {
                    download(_this.url.export, queryParam);
                },
            });
        },
        // table选中的值
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 取消table选中的值
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 新增方法
        add() {
            this.$refs.form.open()
        },
        // 查看/详情方法
        seeView(id) {
            
        },
        // 编辑方法
        edit(row) {
            this.$refs.form.open(row)
        },
    },
};
