<template>
    <div>
        <el-container>
            <!--头部-->
            <div id="header">
                <div class="container">

                    <div class="container">
                        <!-- Logo -->
                        <div id="logo">
                            <h1><a href="#">Colorful Life</a></h1>
                            <span>欢迎来到多彩生活记小站</span>
                        </div>
                        <div class="block" style="margin-top: 10px">
                            <a href="/personal">
                                <el-image class="el-avatar--circle" fit="cover" style="height: 70px; width: 70px"
                                          :src="'http://localhost:8880' + curuser.headerImg"/>
                            </a>
                            <div><a href="#" style="color: #FFF;text-decoration:none;" >{{curuser.userName}}</a></div>
                        </div>
                        <!-- Nav -->
                        <nav id="nav">
                            <ul>
                                <li class="active"><a href="/lifes"><h1>首页</h1></a></li>
                                <li ><a href="/channel"><h1>频道</h1></a></li>
                                <li ><a href="/personal"><h1>我的博客</h1></a></li>
                                <li ><a href="/notice"><h1>公告</h1></a></li>
                                <li>
                                    <a v-show="!hasLogin" href="/login" style="text-decoration:none;"><h1>登录</h1></a>
                                </li>
                                <li>
                                    <a v-show="hasLogin" @click="logout" style="text-decoration:none;"><h1>退出</h1></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <!--主栏-->
            <el-container class="container">
                <el-main id="main">
                    <div class="container">
                        <div class="row">

                            <!-- Content -->
                            <div id="content" class="8u skel-cell-important">
                                <section>
                                    <header>
                                        <h2>精彩推荐</h2>
                                        <span class="byline">多彩生活，多彩人生，从点滴记录开始~</span>
                                    </header>
<!--                                    <a href="#" class="image full"><img src="../images/pic07.jpg" alt=""/></a>-->
                                    <div class="block">
                                        <el-timeline>
                                            <el-timeline-item :timestamp="mom.updateTime" v-for="(mom,index) in moments" icon="el-icon-time" placement="top">
                                                <el-card class="box-card">
                                                    <router-link :to="{path:'userDetail',query: {userId:mom.userId}}" style="text-decoration: none">
                                                        <ul class="style">
                                                            <li>
                                                                <img fit="cover" :src="'http://localhost:8880' + mom.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                <p class="posted"><span style="color: #2a2f27">{{mom.userName}}</span>&emsp;&emsp;的瞬间</p>
                                                            </li>
                                                        </ul>
                                                    </router-link>

                                                    <div class="line"></div>
                                                    <div class="demo-image__preview">
                                                        <a href="#" class="image full">
                                                            <el-image style="height: 370px;width: 630px" fit="cover" :src="'http://localhost:8880' + mom.mediaUrl" alt=""/>
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
                                                        <span style="vertical-align: middle;display: flex" @click="pink(index)">
                                                            <svg class="iconfont" aria-hidden="true">
                                                                <use xlink:href="#icon-dianzan"></use>
                                                            </svg><p>{{mom.pinkNum}}</p>
                                                        </span>
                                                        <div style="vertical-align: middle;display: flex" @click="onShow1(index,mom.id)">
                                                            <svg class="iconfont" aria-hidden="true">
                                                                <use xlink:href="#icon-pinglun1" ></use>
                                                            </svg><p>{{mom.num}}</p>
                                                        </div>
                                                    </el-row>
                                                    <el-collapse-transition>
                                                        <div style="margin-top: 20px; height: 200px;" v-show="mom.show1" >

                                                                <div class="transition-box">
                                                                    <ul class="style">
                                                                    <li v-for="com in comments">

                                                                        <img fit="cover" :src="'http://localhost:8880' + com.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                        <p>{{com.userName}}</p>
                                                                        <span style=" padding-left: 2em;">{{com.content}}</span>
                                                                    </li></ul>
                                                                    <el-row id="searchId">
                                                                    <el-input type="text" v-model="comment"></el-input>
                                                                    <el-button type="primary" id="comBtn" @click="submit(mom.id)">评论</el-button>
                                                                    </el-row>
                                                                </div>

                                                        </div>

                                                    </el-collapse-transition>
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
                                        ></el-pagination>
                                    </div>
                                </section>
                            </div>
                            <!--SideBar-->
                            <el-aside id="sidebar" class="4u">
                                <Aside></Aside>
                            </el-aside>
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
    import qs from "qs";
    import Header from "../components/Header";
    import Aside from "../components/Aside";
    import Bottom from "../components/Bottom";
    import AdminHeader from "../components/admin/AdminHeader";
    export default {
        name: "Lifes",
        components: {AdminHeader, Bottom, Aside, Header},
        inject: ['reload'],
        data(){
            return{
                role:'',
                comment:'',
                commentNum:'',
                moments: {
                    isHide:'',
                    show1:''
                },
                comments:{},
                user:{
                    userName:'',
                    headImage:''
                },
                curuser:{
                    userName:'',
                    headImage:''
                },
                hasLogin:false,
                pageNum:1,
                total:0,
                pageSize:5
            }
        },

        methods:{
            logout() {
                const _this = this
                this.$axios.post("/user/logout").then(res => {
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })
            },
            submit(createItemId){
                const content = this.comment
                this.$axios.get("/create/comment",{params:{createItemId,content}}).then(res =>{
                    console.log("评论之后",res)
                    this.reload()
                })
            },
            onShow: function (index) {
                this.moments[index].isHide = false;
                // this.isHide = false;    //点击onShow切换为false，显示为展开画面
            },
            onShow1(index,createId) {
                this.getComment(createId);
                this.moments[index].show1 = !this.moments[index].show1;

            },
            onHide: function (index) {
                this.moments[index].isHide = true;
                // this.isHide = true;    //点击onHide切换为true，显示为折叠画面
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
            page(pageNum, pageSize) {
                console.log("瞬间内容分页查询")
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/reco/listAll",
                    {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let momentList = res.data.data.list;
                    momentList.forEach((item, index) => {
                        item.isHide = true;
                        item.show1 = false;
                        // 查询发布人信息
                         this.$axios.get("/user/byId?userId=" + item.userId).then(res => {
                             _this.user.userName = res.data.data.userName
                             _this.user.headImage = res.data.data.headImage
                             item.userName = _this.user.userName
                             item.headImage = _this.user.headImage
                         })
                        item.userName = _this.user.userName
                        item.headImage = _this.user.headImage
                        this.$axios.post("/comment/commentNum?createItemId=" + item.id).then(res =>{
                            this.commentNum = res.data.data
                            console.log("评论次数", this.commentNum)
                            item.num = this.commentNum
                        })
                        item.num = this.commentNum
                    })
                    _this.moments = momentList;
                    console.log('推荐分页列表', _this.moments);
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total

                })
            },
            pink(index) {
                const _this = this
                let createId = this.moments[index].id
                console.log("123345454446",createId)
                _this.$axios.get("/create/pink?createItemId="+createId).then(res => {
                    console.log(res, "点赞结果")
                    this.reload()
                })
            },
            deleteMoment(createItemId) {
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/reco/admin/delete?createItemId=" + createItemId).then(res => {
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

            getUserRole(){
                if (this.$store.getters.getUser.userName) {
                    this.curuser.userName = this.$store.getters.getUser.userName
                    this.curuser.headerImg = this.$store.getters.getUser.headImage
                    this.role = this.$store.getters.getUser.role
                    this.hasLogin = true
                }
                console.log('当前用户', this.$store.getters.getUser.userName)
                console.log('当前头像', this.user.headerImg)
            },
        },
        created() {
            this.page(1,5)
            this.getUserRole();

        }

    }


</script>

<style scoped>
    #header {
        /*height: 600px !important;*/
        position: relative;
        background: #FFF url(../images/banner.jpg) no-repeat;
        background-size: cover;
        padding: 5em 0em;
        text-align: center;
        vertical-align: baseline;
    }
    /*
        .el-container #header {
            padding: 15em 0em;
        }*/

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
    .mpage{
        margin: 0 auto;
        text-align: center;
    }

    .el-footer {
        position: relative;
        background: #1d1d1d;

    }

    .el-footer h2 {

        display: block;
        color: #FFF;

    }

    .el-aside {
        /*background-color: #D3DCE6;*/
        /*color: #333;
        text-align: center;
        line-height: 200px;*/
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        /* color: #333;
         text-align: center;
         line-height: 160px;*/
        position: relative;
        background: #fff;
        padding: 6em 0em 4em 0em;
    }

    body > .el-container {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }



    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        display: block;
    }


    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after, q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }


    /* Box Model */

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }

    /* Grid */



    #logo {
        margin-bottom: 3em;
    }

    #logo h1 {
        color: #FFF;
    }

    #logo h1 a {
        display: block;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 5em;
        font-weight: 900;
        color: #FFF;
    }

    #logo span {
        display: block;
        padding-top: 1em;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 1.2em;
        color: rgba(255, 255, 255, .5);
    }

    #content header {
        margin-bottom: 2em;
    }

    #content header h2 {
        font-size: 3em;
    }

    #content header .byline {
        font-size: 1.40em;
    }

    #sidebar h2 {
        display: block;
        padding-bottom: 2em;
        font-size: 1.4em;
    }

    /* Buttons */

    .button {
        position: relative;
        display: inline-block;
        margin-top: 2em;
        padding: 0.90em 1.5em;
        background: #e95d3c;
        border-radius: 40px;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1.1em;
        color: #FFF;
        -moz-transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
        -webkit-transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
        -o-transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
        -ms-transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
        transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
        cursor: pointer;
    }

    .button:hover {
        background: #de3d27;
        color: #FFF !important;
    }

    /*********************************************************************************/
    /* Copyright                                                                     */
    /*********************************************************************************/

    #copyright {
        position: relative;
        padding: 3em 0em;
        letter-spacing: 1px;
        text-align: center;
        color: rgba(255, 255, 255, .2);
    }

    #copyright .container {
    }

    #copyright a {
        text-decoration: none;
        color: rgba(255, 255, 255, .3);
    }
    #sidebar h2
    {
        display: block;
        padding-bottom: 2em;
        font-size: 1.4em;
    }
#copyright {
    position: relative;
    padding: 3em 0em;
    letter-spacing: 1px;
    text-align: center;
    color: rgba(255, 255, 255, .2);
}

#copyright .container {
}

#copyright a {
    text-decoration: none;
    color: rgba(255, 255, 255, .3);
}
#sidebar h2
{
    display: block;
    padding-bottom: 2em;
    font-size: 1.4em;
}
</style>