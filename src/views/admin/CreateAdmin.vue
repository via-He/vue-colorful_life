<template>
    <div>
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
                            <div id="content" class="8u skel-cell-important">
                                <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
                                    <el-tab-pane name="first" label="签到管理">
                                        <!--签到列表-->
                                            <el-timeline>
                                                <el-timeline-item :timestamp="sign.updateTime"
                                                                  placement="top" v-for="(sign,index) in signs" >
                                                    <el-card>
                                                        <span style="float: right">签到动态ID:{{sign.id}}</span>
                                                        <h4>标题 ：{{sign.title}}</h4>
                                                        <hr>
                                                        <p>内容 ：
                                                            {{sign.content}}
                                                        </p>
                                                        <div class="demo-image__preview">
                                                            <el-image v-show="!(sign.mediaUrl == '')"
                                                                      class="img full"
                                                                      :src="'http://localhost:8880' + sign.mediaUrl"
                                                                      >
                                                            </el-image>
                                                        </div>
                                                        <!--标签-->
                                                        <p class="posted">来自频道：<el-tag type="success">{{sign.channelName}}</el-tag></p>
                                                        <el-row id="icon-group1">
                                                        <span style="vertical-align: middle;display: flex">
                                                        <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-dianzan"></use>
                                                        </svg><span>{{sign.pinkNum}}</span>
                                                        </span >
                                                            <span style="vertical-align: middle;display: flex">
                                                        <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-pinglun1"></use>
                                                        </svg><span></span>
                                                        </span >
                                                            <span style="vertical-align: middle;display: flex">
                                                                 <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-mengya"></use>
                                                        </svg>

                                                            </span>
                                                            <span style="vertical-align: middle;display: flex">
                                                        <i v-on:click="deleteSign(sign.id)"><svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-shanchu3"></use>
                                                        </svg></i>
                                                        </span>
                                                        </el-row>
                                                    </el-card>
                                                </el-timeline-item>
                                            </el-timeline>
                                            <el-pagination class="mpage"
                                                           layout="prev, pager, next"
                                                           :current-page="pageNum"
                                                           :page-size="pageSize"
                                                           :total="total"
                                                           @current-change="signpage"
                                            >
                                            </el-pagination>
                                    </el-tab-pane>
                                    <el-tab-pane label="瞬间管理" name="second">
                                        <el-timeline>
                                            <el-timeline-item :timestamp="mom.updateTime" v-for="(mom,index) in moments"
                                                              icon="el-icon-time" placement="top">
                                                <el-card class="box-card">
                                                    <span style="float: right">瞬间动态ID:{{mom.id}}</span>
                                                    <router-link :to="{path:'userDetail',query: {userId:mom.userId}}" style="text-decoration: none">
                                                        <ul class="style">
                                                            <li>
                                                                <img fit="cover" :src="'http://localhost:8880' + mom.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                <p class="posted" style="margin-bottom: 0 !important;"><span style="color: #2a2f27">{{mom.userName}}</span>&emsp;&emsp;的瞬间</p>
                                                            </li>
                                                        </ul>
                                                    </router-link>
                                                    <el-tag type="success">{{mom.channelName}}</el-tag>
                                                    <div class="line"></div>
                                                    <div class="demo-image__preview">
                                                        <a href="#" class="image full">
                                                            <el-image :src="'http://localhost:8880' + mom.mediaUrl"
                                                                      alt=""/>
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
                                                    <!--标签-->
                                                    <p class="posted">来自频道：<el-tag type="success">{{mom.channelName}}</el-tag></p>
                                                    <el-row id="icon-group">
                                                        <span style="vertical-align: middle;display: flex">
                                                        <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-dianzan"></use>
                                                        </svg><span>{{mom.pinkNum}}</span>
                                                        </span>
                                                        <span style="vertical-align: middle;display: flex" @click="onShow1(index,mom.id)">
                                                        <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-pinglun1"></use>
                                                        </svg><span>{{mom.num}}</span>
                                                        </span>
                                                        <span @click="attract(mom.id)" style="vertical-align: middle;display: flex">
                                                                <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-mengya"></use>
                                                        </svg>
                                                            </span>
                                                        <span style="vertical-align: middle;display: flex">
                                                        <i v-on:click="deleteMoment(mom.id)"><svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-shanchu3"></use>
                                                        </svg></i>
                                                        </span>
                                                    </el-row>
                                                    <el-collapse-transition>
                                                        <div style="margin-top: 20px; height: 200px;"
                                                             v-show="mom.show1">
                                                            <div class="transition-box">
                                                                <ul class="style">
                                                                    <li v-for="com in comments">
                                                                        <img fit="cover"
                                                                             :src="'http://localhost:8880' + com.headImage"
                                                                             class="el-avatar--circle"
                                                                             style="width: 30px;height: 30px" alt=""/>
                                                                        <p>{{com.userName}}</p>
                                                                        <span style=" padding-left: 2em;">{{com.content}}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </el-collapse-transition>
                                                </el-card>
                                            </el-timeline-item>
                                        </el-timeline>
                                        <el-pagination class="mpage"
                                                       layout="prev, pager, next"
                                                       :current-page="pageNum"
                                                       :page-size="pageSize"
                                                       :total="total"
                                                       @current-change="momentpage"
                                        >
                                        </el-pagination>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </div>
                </el-main>
                <!--底栏-->
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import AdminHeader from "../../components/admin/AdminHeader";
    import Bottom from "../../components/Bottom";
    export default {
        name: "CreateAdmin",
        components: {Bottom, AdminHeader},
        inject: ['reload'],
        data() {
            return {
                commentNum:'',
                comments:{},
                user:{
                    userName:'',
                    headImage:''
                },
                hasLogin:false,
                activeName: 'first',
                signs: {},
                moments: {
                    isHide:'',
                    show1:''
                },
                pageNum: 1,
                pageSize: 5,
                total: 0
            };
        },
        methods: {
            onShow1(index,createId) {
                const _this = this
                this.getComment(createId);
                this.moments[index].show1 = !this.moments[index].show1;

            },
            getComment(createItemId){
                this.$axios.post("/comment/detail?createItemId="+createItemId).then(res =>{
                    let commentList = res.data.data
                    commentList.forEach((item,index) =>{
                        //查询评论人
                        this.$axios.get("/user/byId?userId=" + item.reviewer).then(res => {
                            item.userName  = res.data.data.userName
                            item.headImage = res.data.data.headImage

                        })
                        item.userName  = res.data.data.userName
                        item.headImage = res.data.data.headImage


                    })
                    this.comments = commentList
                    console.log("查看评论内容",this.comments)
                })

            },
            attract(createItemId){
                this.$axios.post("/reco/admin/add?createItemId="+createItemId).then(res =>{
                    this.$alert('推荐成功,前往推荐页面看看吧！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.reload("/admin");
                        }
                    });
                })

            },
            onShow: function (index) {
                this.moments[index].isHide = false;
                // this.isHide = false;    //点击onShow切换为false，显示为展开画面
            },
            onHide: function (index) {
                this.moments[index].isHide = true;
                // this.isHide = true;    //点击onHide切换为true，显示为折叠画面
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            signpage(pageNum, pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get('/admin/listSignForAdmin', {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    console.log("签到查询内容集合")
                    _this.signs = res.data.data.list
                    console.log(_this.signs)
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total
                })
            },
            momentpage(pageNum, pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get('/admin/listAllForAdmin', {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let momentList = res.data.data.list;
                    console.log("瞬间查询内容集合")
                    momentList.forEach((item, index) => {
                        item.isHide = true;
                        item.show1 = false;
                        // console.log('sddddd',item.userId)
                        this.$axios.get("/user/byId?userId=" + item.userId).then(res => {
                            item.userName = res.data.data.userName
                            item.headImage = res.data.data.headImage

                        })
                        item.userName = res.data.data.userName
                        item.headImage = res.data.data.headImage
                        this.$axios.post("/comment/commentNum?createItemId=" + item.id).then(res =>{
                            this.commentNum = res.data.data
                            console.log("评论次数", this.commentNum)
                            item.num = this.commentNum
                        })
                        item.num = this.commentNum
                    })
                    _this.moments = momentList;
                    console.log(_this.channels)
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
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
            deleteSign(signId){
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/admin/deleteSign?signId=" + signId).then(res => {
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
            },
            deleteMoment(createItemId) {
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/admin/deleteMoment?createItemId=" + createItemId).then(res => {
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
            this.signpage(1, 5)
            this.momentpage(1, 5)
        }
    }
</script>

<style scoped>
    /*********************************************************************************/
    /* Nav                                                                           */
    /*********************************************************************************/

    #nav ul {
        margin: 0;
    }

    #nav > ul > li {
        display: inline-block;
    }

    #nav > ul > li:last-child {
        padding-right: 0;
    }

    #nav > ul > li > a, #nav > ul > li > span {
        display: block;
        padding: 1em 1.5em;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 200;
        font-size: 1.3em;
        outline: 0;
        color: rgba(255, 255, 255, .7);
    }


    #nav > ul > li > a:hover {
        color: #FFF !important;
    }

    #nav li.active a {
        background: none;
        border-radius: 40px;
        border: 2px solid;
        border-color: rgba(255,255,255,.8);
        color: #FFF;
    }

    #nav > ul > li > ul {
        display: none;
    }

    ul.style li {
        margin: 0;
        padding: 1em 0em 1em 0em !important;
        border-top: 1px solid #ECECEC;
    }
    #searchId{
        display:flex;
        justify-content: flex-start;
    }
    #searchId >>> .el-input__inner{
        /*width: 70% !important;*/
        float: left;

    }
    #comBtn{
        float: right;
        display:inline-block;
    }
    .transition-box {
        margin-bottom: 10px;
        width: 610px;
        /*height: 100px;*/
        border-radius: 4px;
        background-color: #75775E;
        background-image: linear-gradient(to bottom right,#A0BBC6 , #C9DEC1);
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    #icon-group,#icon-group1{
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
    .mpage {
        margin: 0 auto;
        text-align: center;
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