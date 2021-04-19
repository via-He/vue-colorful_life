<template>
    <div>
    <div class="block">

        <el-timeline>
            <el-timeline-item :timestamp="life.updateTime" placement="top"
                              v-for="(life,id) in
                                            lifes" :key="id" >
                <el-card>
                    <h4>标题 ：{{life.title}}</h4>
                    <i class="el-icon-delete" v-on:click="deleteSign(life.id)"></i>

                    <hr>
                    <p>内容 ：
                        <!--<router-link
                                :to="{name:'SignDetail',params: {signId:life.id}}">
                            {{life.content}}
                        </router-link>-->
                        {{life.content}}
                    </p>
                    <div class="demo-image__preview">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="url"
                                :preview-src-list="srcList">
                        </el-image>
                    </div>
                    <!--标签-->
                    <el-tag closable>
                        {{life.channelName}}
                    </el-tag>


                </el-card>
            </el-timeline-item>

        </el-timeline>

    </div>
    <div class="block">
        <el-pagination class="mpage"
                       layout="prev, pager, next"
                       :current-page="pageNum"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="page"
                       @size-change="page"
        >
        </el-pagination>
    </div>
    </div>
</template>

<script>
    import Element from "element-ui";
    export default {
        name: "Sign",
        inject :['reload'],
        data(){
            return{
                lifes:'',
                pageNum:1,
                total:0,
                pageSize:5,

                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ]
            }
        },
        methods: {
            page(pageNum,pageSize){
                console.log("签到内容分页查询")
                console.log(sessionStorage.getItem("user"))
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/sign/listSign",
                    {params:{pageNum,pageSize }}).then(res =>{
                    console.log(res)
                    console.log("photo集合")
                    console.log(res.data.data.list)
                    _this.lifes = res.data.data.list
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total= res.data.data.total

                })
            },
            deleteSign(signId){
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/sign/delete?signId=" + signId).then(res =>{
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
                });

            }

        },
        created() {
            this.page(1,5)
        }
    }
</script>

<style scoped>

</style>