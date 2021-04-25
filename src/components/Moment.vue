<template>
    <div>
        <el-timeline>
            <el-timeline-item :timestamp="mom.updateTime" v-for="(mom,index) in moments" icon="el-icon-time" placement="top">
                <el-card class="box-card">
                    <el-tag type="success">{{mom.channelName}}</el-tag>
                    <div class="line"></div>
                    <div class="demo-image__preview">
                        <a href="#" class="image full">
                            <el-image :src="'http://localhost:8880' + mom.mediaUrl" alt=""/>
                        </a>

                    </div>


                    <div id="example">
                        <!-- 利用v-if…v-else切换 展开 和 收起 两个画面，template包裹多个元素 -->
                        <template v-if="mom.isHide">
                            <!-- 只显示摘要的画面 -->
                            <div class="hideBg">
                                <p class="summary">{{ mom.content }}</p>
                                <div class="showBtn">
                                    <!-- 绑定点击事件onShow，点击展开全文 -->
                                    <a href="#" @click.stop.prevent="onShow(index)">展开阅读全文&nbsp;
                                        <!-- 向下的角箭头符号，用css画 -->
                                        <span class="downArrow"></span>
                                    </a>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <!-- 显示完整内容的画面 -->
                            <div class="showBg">
                                <p>{{ mom.content }}</p>
                                <div class="hideBtn">
                                    <!-- 绑定点击事件onHide，点击收起内容 -->
                                    <a href="#" @click.stop.prevent="onHide(index)">收起&nbsp;
                                        <!-- 向上的角箭头符号 -->
                                        <span class="upArrow"></span>
                                    </a>
                                </div>
                            </div>
                        </template>
                    </div>
                    <el-row id="icon-group">
                            <span >
                                <svg class="iconfont" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg><!--<span>{{mom.pinkNum}}</span>-->
                            </span>
                        <span >
                                <svg class="iconfont" aria-hidden="true">
                                    <use xlink:href="#icon-pinglun1" @click="show = !show"></use>
                                </svg><span></span>
                            </span>
                        <span>
                                <i v-on:click="deleteMoment(mom.id)"><svg class="iconfont"
                                                                         aria-hidden="true">
                                    <use xlink:href="#icon-shanchu3"></use>
                                </svg></i>
                            </span>
                    </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <div class="block">
            <el-pagination class="mpage"
                           layout="prev, pager, next"
                           :current-page="pageNum"
                           :page-size="pageSize"
                           :total="total"
                           @current-change="page"
                           @size-change="page"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import Element from "element-ui";

    export default {
        name: "Moment",
        inject: ['reload'],
        data() {
            return {
                isHide: true, //初始值为true，显示为折叠画面
                moments: {},
                pageNum: 1,
                total: 0,
                pageSize: 4,
            }
        },
        methods: {
            onShow: function (index) {
                this.moments[index].isHide = false;
                // this.isHide = false;    //点击onShow切换为false，显示为展开画面
            },
            onHide: function (index) {
                this.moments[index].isHide = true;
                // this.isHide = true;    //点击onHide切换为true，显示为折叠画面
            },
            page(pageNum, pageSize) {
                console.log("瞬间内容分页查询")
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/create/listAll",
                    {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let momentList = res.data.data.list;
                    momentList.forEach((item, index) => {
                        item.isHide = true;
                    })
                    _this.moments = momentList;
                    console.log('瞬间分页列表', _this.moments);
                    // _this.moments = res.data.data.list;
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    console.log(_this.pageSize, 'this.pagesize')
                    _this.total = res.data.data.total

                })
            },
            pink() {
                const _this = this
                let createId = _this.moments.id
                console.log(createId)
                _this.$axios.get("/create/pink", createId).then(res => {
                    console.log(res, "点赞结果")
                })
            },
            comment(){

            },
            deleteMoment(createItemId) {
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/create/delete?createItemId=" + createItemId).then(res => {
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
            this.page(1, 3)
        }
    }
</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    #icon-group {

        font-size: 15px;
        height: 1.6em;
        margin-top: 50px;
        line-height: 2em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: normal
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        /*width: 480px;*/
        position: relative;
        padding-left: 28px;
        background-color: #FFF;
    }

    /* 摘要背景板 */
    .hideBg {
        /*padding-left: 28px;*/
        background-color: #FFF;
        margin: 1.5rem;
        padding: 1.5rem;
        padding-bottom: 0; /* 方便渐变层遮挡 */
        position: relative; /* 用于子元素定位 */
    }

    /* 全文背景板，基本与摘要相同 */
    .showBg {
        /*width: 500px;*/
        position: relative;
        padding-left: 28px;
        background-color: #FFF;
        margin: 1.5rem;
        /*padding: 1.5rem;*/
    }

    /* 摘要内容 */
    .summary {
        overflow: hidden; /* 隐藏溢出内容 */
        text-overflow: clip; /* 修剪文本 */
        display: -webkit-box; /* 弹性布局 */
        -webkit-box-orient: vertical; /* 从上向下垂直排列子元素 */
        -webkit-line-clamp: 3; /* 限制文本仅显示前三行 */
    }

    #example p {
        text-indent: 2em;
    }

    /* 展开按钮 */
    .showBtn {
        width: 100%; /* 与背景宽度一致 */
        height: 3rem;
        position: absolute; /* 相对父元素定位 */
        top: 3rem; /* 刚好遮挡在最后两行 */
        left: 0;
        z-index: 0; /* 正序堆叠，覆盖在p元素上方 */
        text-align: center;
        background: linear-gradient(rgba(242, 242, 242, .10), white); /* 背景色半透明到白色的渐变层 */
        padding-top: 3rem;
    }

    /* 收起按钮 */
    .hideBtn {
        text-align: right;
    }

    #example a {
        text-decoration: none; /* 清除链接默认的下划线 */
    }

    /* 向下角箭头 */
    .downArrow {
        display: inline-block;
        width: 8px; /* 尺寸不超过字号的一半为宜 */
        height: 8px;
        border-right: 1px solid; /* 画两条相邻边框 */
        border-bottom: 1px solid;
        transform: rotate(45deg); /* 顺时针旋转45° */
        margin-bottom: 3px;
    }

    /* 向上角箭头，原理与下箭头相同 */
    .upArrow {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-left: 1px solid;
        border-top: 1px solid;
        transform: rotate(45deg);
        margin-top: 3px;
    }

</style>