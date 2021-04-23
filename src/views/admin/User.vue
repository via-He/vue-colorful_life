<template>
        <el-container>
            <!--头部-->
            <el-header id="header">
                <div class="container">
                    <AdminHeader></AdminHeader>
                </div>
            </el-header>
            <!--主栏-->
            <el-container class="container">
                <el-main id="main">
                    <div class="container">
                        <div class="row">
                            <!-- Content -->
                                <section>
                                    <el-card>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                fixed
                                                prop="id"
                                                label="用户ID"
                                                width="65">
                                            <template slot-scope="scope">
                                            <template v-if="scope.row.editing">
                                            <el-input v-model="scope.row.id"  readonly></el-input>
                                            </template>
                                                <span v-else>{{scope.row.id}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="userName"
                                                label="用户名"
                                                width="100">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.userName"></el-input>
                                                </template>
                                                <span v-else>{{scope.row.userName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="sex"
                                                label="性别"
                                                width="65">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.sex"></el-input>
                                                </template>
                                                <span v-else>{{scope.row.sex}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="signNum"
                                                label="签到天数"
                                                width="80">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.signNum"></el-input>
                                                </template>
                                                <span v-else>{{scope.row.signNum}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="signature"
                                                label="签名"
                                                width="250">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.signature"></el-input>
                                                </template>
                                                <span v-else>{{scope.row.signature}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="headImage"
                                                label="头像"
                                                width="230">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.headImage" ></el-input>
                                                </template>
                                                <span v-else>{{scope.row.headImage}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="createTime"
                                                label="创建时间"
                                                width="100">
                                            <template slot-scope="scope">
                                                <template v-if="scope.row.editing">
                                                    <el-input v-model="scope.row.createTime"></el-input>
                                                </template>
                                                <span v-else>{{scope.row.createTime}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="editing"
                                                fixed="right"
                                                label="操作"
                                                width="160">
                                            <template slot-scope="scope">
                                                <span v-if="!(scope.row.editing)">
                                                <el-button
                                                        size="mini"
                                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button></span>
                                                <span v-else>
                                                    <el-button size="mini"
                                                               @click="savemodify(scope.$index, scope.row)">保存</el-button>
                                                </span>
                                                <el-button
                                                        size="mini"
                                                        type="danger"
                                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-card>
                                    <div class="block">
                                        <el-pagination class="mpage"
                                                       layout="prev, pager, next"
                                                       :current-page="pageNum"
                                                       :page-size="pageSize"
                                                       :total="total"
                                                       @current-change="page"
                                        ></el-pagination>
                                    </div>
                                </section>
                        </div>
                    </div>
                </el-main>
                <!--底栏-->
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
</template>

<script>
    import AdminHeader from "../../components/admin/AdminHeader";
    import Bottom from "../../components/Bottom";
    export default {
        name: "User",
        components: {Bottom, AdminHeader},
        data() {
            return {
                prevValue:{},
                tableData: [{
                    id: '1',
                    userName: '11',
                    sex: '11',
                    signNum: '11',
                    headImage: '11',
                    signature: '11',
                    createTime: '11',
                    editing: false,
                }],
                pageNum: 1,
                total: 0,
                pageSize: 5,
            }
        },
        methods: {
            handleEdit(index, row) {
                row.editing = true
                console.log(index, row);
                console.log(row.editing)
                this.prevValue = JSON.parse(JSON.stringify(row));
            },

            savemodify(index, row){
                row.editing = false
                console.log(JSON.stringify(this.tableData))

            },

            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index, row)
                    this.tableData.splice(index, 1)

                    this.$axios.get("/admin/delete?userId",row.id).then(res =>{
                        this.$alert('删除成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.reload()
                            }
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

            },
            page(pageNum, pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/user/admin/allUser",
                    {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let userData = res.data.data.list;
                    userData.forEach((index,row) =>{
                        index.editing = false
                    })
                    _this.tableData = userData
                    console.log('管理用户分页列表', _this.tableData);
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total
                })
            }

        },

        created() {
            this.page(1,5)
        }
    }
</script>

<style scoped>
    .mpage{
        margin: 0 auto;
        margin-top: 30px;
        text-align: center;
    }
</style>