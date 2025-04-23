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
                                          :src="`${process.env.VUE_APP_IMAGE_BASE}` + curuser.headerImg"/>
                            </a>
                            <div><a href="#" style="color: #FFF;text-decoration:none;" >{{curuser.userName}}</a></div>
                        </div>
                        <!-- Nav -->
                        <nav id="nav">
                            <ul>
                                <li><a href="/lifes"><h1>首页</h1></a></li>
                                <li  class="active"><a href="/channel"><h1>频道</h1></a></li>
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
                                    </header>


                                    <div class="line"></div>


                                    <el-tabs type="card">

                                        <el-tab-pane v-for="item in items">
                                            <span slot="label" @click="getContent(item.label)"><i
                                                    class="el-icon-date"></i> {{item.label}}</span>
                                            <div style="margin-top: 30px">
                                                <!--签到列表-->
                                                <div class="block" v-for="(channel,index) in channels">
                                                    <el-timeline v-show='!(channel.signId==null)'>
                                                        <el-timeline-item :timestamp="channel.signUpdateTime"
                                                                          placement="top">
                                                            <el-card>
                                                                <router-link :to="{path:'userDetail',query: {userId:channel.signUserId}}" style="text-decoration: none">
                                                                    <ul class="style">
                                                                        <li>
                                                                            <img fit="cover" :src="`${process.env.VUE_APP_IMAGE_BASE}` + channel.headImage1" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                            <p class="posted" style="margin-bottom: 0 !important;"><span style="color: #2a2f27">{{channel.userName1}}</span>&emsp;&emsp;的签到</p>
                                                                        </li>
                                                                    </ul>
                                                                </router-link>
                                                                <h4>签到标题 ：{{channel.title}}</h4>
                                                                <hr>
                                                                <p>内容 ：
                                                                    {{channel.signContent}}
                                                                </p>
                                                                <div class="demo-image__preview">
                                                                    <a href="#" class="image full">
                                                                    <el-image style="width: 600px;height: 370px" v-show="!(channel.signMediaUrl === '')" fit="cover"
                                                                              :src="`${process.env.VUE_APP_IMAGE_BASE}` + channel.signMediaUrl"
                                                                              >
                                                                    </el-image>
                                                                    </a>
                                                                </div>
                                                                <!--标签-->
                                                                <p class="posted">来自频道：<el-tag type="success">{{channel.channelName}}</el-tag></p>
                                                                <el-row id="icon-group">
                                                                    <span style="vertical-align: middle;display: flex" @click="pinkSign(index)">
                                                                        <svg class="iconfont" aria-hidden="true">
                                                                            <use xlink:href="#icon-dianzan"></use>
                                                                        </svg><span>{{channel.signPinkNum}}</span>
                                                                    </span>
                                                                    <span style="vertical-align: middle;display: flex" @click="onShow1(index,channel.signId)">
                                                                        <svg class="iconfont" aria-hidden="true">
                                                                            <use xlink:href="#icon-pinglun1"></use>
                                                                        </svg><span>{{channel.num1}}</span>
                                                                    </span>
                                                                </el-row>
                                                                <!--签到评论========================-->
                                                                <el-collapse-transition>
                                                                    <div style="margin-top: 20px; height: 200px;" v-show="channel.show1" >

                                                                        <div class="transition-box">
                                                                            <ul class="style">
                                                                                <li v-for="com in comments1">

                                                                                    <img fit="cover" :src="`${process.env.VUE_APP_IMAGE_BASE}` + com.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                                    <p>{{com.userName}}</p>
                                                                                    <span style=" padding-left: 2em;">{{com.content}}</span>
                                                                                </li></ul>
                                                                            <el-row id="searchId1">
                                                                                <el-input type="text" v-model="comment"></el-input>
                                                                                <el-button type="primary" id="comBtn1" @click="submitSign(channel.signId)">评论</el-button>
                                                                            </el-row>
                                                                        </div>
                                                                    </div>
                                                                </el-collapse-transition>
                                                            </el-card>
                                                        </el-timeline-item>
                                                    </el-timeline>

                                                    <!--瞬间列表-->
                                                    <el-timeline v-show='!(channel.createId == null)'>
                                                        <el-timeline-item :timestamp="channel.createUpdateTime"
                                                                          placement="top">
                                                            <el-card class="box-card">
                                                                <router-link :to="{path:'userDetail',query: {userId:channel.createUserId}}" style="text-decoration: none">
                                                                    <ul class="style">
                                                                        <li>
                                                                            <img fit="cover" :src="`${process.env.VUE_APP_IMAGE_BASE}` + channel.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                            <p class="posted" style="margin-bottom: 0 !important;"><span style="color: #2a2f27">{{channel.userName}}</span>&emsp;&emsp;的瞬间</p>
                                                                        </li>
                                                                    </ul>
                                                                </router-link>
                                                                <div class="line"></div>
                                                                <div class="demo-image__preview">
                                                                    <a href="#" class="image full">
                                                                        <el-image
                                                                                v-show="!(channel.createMediaUrl === '')"
                                                                                :src="`${process.env.VUE_APP_IMAGE_BASE}` + channel.createMediaUrl"
                                                                                alt=""/>
                                                                    </a>
                                                                </div>
                                                                <div id="example">
                                                                    <!-- 利用v-if…v-else切换 展开 和 收起 两个画面，template包裹多个元素 -->
                                                                    <template v-if="channel.isHide">
                                                                        <!-- 只显示摘要的画面 -->
                                                                        <div class="hideBg">
                                                                            <p class="summary">
                                                                                {{channel.createContent}}</p>
                                                                            <div class="showBtn">
                                                                                <!-- 绑定点击事件onShow，点击展开全文 -->
                                                                                <a href="#"
                                                                                   @click.stop.prevent="onShow(index)">展开阅读全文&nbsp;
                                                                                    <!-- 向下的角箭头符号，用css画 -->
                                                                                    <span class="downArrow"></span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                    <template v-else>
                                                                        <!-- 显示完整内容的画面 -->
                                                                        <div class="showBg">
                                                                            <p>{{ channel.createContent }}</p>
                                                                            <div class="hideBtn">
                                                                                <!-- 绑定点击事件onHide，点击收起内容 -->
                                                                                <a href="#"
                                                                                   @click.stop.prevent="onHide(index)">收起&nbsp;
                                                                                    <!-- 向上的角箭头符号 -->
                                                                                    <span class="upArrow"></span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                                <!--标签-->
                                                                <p class="posted">来自频道：<el-tag type="success">{{channel.channelName}}</el-tag></p>
                                                                <el-row id="icon-group1">
                                                                    <span style="vertical-align: middle;display: flex" @click="pinkMoment(index)">
                                                                        <svg class="iconfont" aria-hidden="true">
                                                                            <use xlink:href="#icon-dianzan"></use>
                                                                        </svg><span>{{channel.createPinkNum}}</span>
                                                                    </span>
                                                                    <span style="vertical-align: middle;display: flex" @click="onShow2(index,channel.createId)">
                                                                        <svg class="iconfont" aria-hidden="true">
                                                                            <use xlink:href="#icon-pinglun1"></use>
                                                                        </svg><span>{{channel.num}}</span>
                                                                    </span>
                                                                </el-row>
                                                                <!--瞬间评论========================-->
                                                                <el-collapse-transition>
                                                                    <div style="margin-top: 20px; height: 200px;" v-show="channel.show1" >

                                                                        <div class="transition-box">
                                                                            <ul class="style">
                                                                                <li v-for="com in comments">

                                                                                    <img fit="cover" :src="`${process.env.VUE_APP_IMAGE_BASE}` + com.headImage" class="el-avatar--circle"  style="width: 30px;height: 30px" alt=""/>
                                                                                    <p>{{com.userName}}</p>
                                                                                    <span style=" padding-left: 2em;">{{com.content}}</span>
                                                                                </li></ul>
                                                                            <el-row id="searchId">
                                                                                <el-input type="text" v-model="comment"></el-input>
                                                                                <el-button type="primary" id="comBtn">评论</el-button>
                                                                            </el-row>
                                                                        </div>
                                                                    </div>
                                                                </el-collapse-transition>
                                                            </el-card>
                                                        </el-timeline-item>
                                                    </el-timeline>
                                                </div>
                                            </div>
                                            <div class="block">
                                                <el-pagination class="mpage"
                                                               layout="prev, pager, next"
                                                               :current-page="pageNum"
                                                               :page-size="pageSize"
                                                               :total="total"
                                                               @current-change="page"
                                                >
                                                </el-pagination>
                                            </div>
                                        </el-tab-pane>

                                    </el-tabs>


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
    import Header from "../components/Header";
    import Aside from "../components/Aside";
    import Bottom from "../components/Bottom";

    export default {
        name: "Channel",
        components: {Bottom, Aside, Header},
        inject: ['reload'],
        data() {
            return {
                isHide: true, //初始值为true，显示为折叠画面
                channels: {
                    isHide:'',
                    show1:''
                },
                comment:'',//评论输入框
                commentNum:'',
                commentNum1:'',
                comments1:{},//所有签到评论内容
                comments:{},//所有评论内容
                user:{
                    userName:'',
                    headImage:''
                },
                curuser:{
                    userName:'',
                    headImage:''
                },
                hasLogin:false,
                pageNum: 1,
                total: 0,
                pageSize: 3,
                items: [
                    {type: '', label: '成长'},
                    {type: 'success', label: '思想'},
                    {type: 'info', label: '美食'},
                    {type: 'danger', label: '学习'},
                    {type: 'warning', label: '旅游'},
                    {type: '', label: '情感'}
                ],
                channelName: '成长'
            }
        },
        methods: {
            logout() {
                const _this = this
                this.$axios.post("/user/logout").then(res => {
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })
            },
            /*评论请求*/
            submitSign(signId){
                const content = this.comment
                this.$axios.get("/sign/comment",{params:{signId,content}}).then(res =>{
                    console.log("评论之后",res)
                    this.reload()
                })
            },
/*            submitMoment(createItemId){
                const content = this.comment
                this.$axios.get("/create/comment",{params:{createItemId,content}}).then(res =>{
                    console.log("评论之后",res)
                    this.reload()
                })
            },*/
            onShow1(index,signId) {
                this.getComment1(signId);
                this.channels[index].show1 = !this.channels[index].show1;

            },
            onShow2(index,createId) {
                this.getComment(createId);
                this.channels[index].show1 = !this.channels[index].show1;

            },
            getComment(createItemId){
                if (createItemId != null) {
                    this.$axios.post("/comment/detail?createItemId=" + createItemId).then(res => {
                        let commentList = res.data.data
                        commentList.forEach((item, index) => {//查看评论人
                            this.$axios.get("/user/byId?userId=" + item.reviewer).then(res => {
                                item.userName = res.data.data.userName
                                item.headImage = res.data.data.headImage

                            })
                            item.userName = res.data.data.userName
                            item.headImage = res.data.data.headImage

                        })
                        this.comments = commentList
                        console.log("查看评论内容", this.comments)
                    })
                }

            },
            getComment1(signId){
                if (signId != null) {
                    this.$axios.post("/comment/detail?signId=" + signId).then(res => {
                        let commentList = res.data.data
                        commentList.forEach((item, index) => {
                            this.$axios.get("/user/byId?userId=" + item.reviewer).then(res => {
                                item.userName = res.data.data.userName
                                item.headImage = res.data.data.headImage

                            })
                            item.userName = res.data.data.userName
                            item.headImage = res.data.data.headImage

                        })
                        this.comments1 = commentList
                        console.log("查看签到评论内容", this.comments1)
                    })
                }

            },
            onShow: function (index) {
                this.channels[index].isHide = false;//点击onShow切换为false，显示为展开画面
            },
            onHide: function (index) {
                this.channels[index].isHide = true; //点击onHide切换为true，显示为折叠画面
            },
            getContent(val) {
                const _this = this
                console.log('----------------', val)
                _this.channelName = val
                _this.page(_this.pageNum, _this.pageSize, _this.channelName)
            },
            page(pageNum, pageSize) {
                const _this = this
                let channelName = _this.channelName
                pageSize = _this.pageSize
                _this.$axios.get('/listByChannelName', {params: {pageNum, pageSize, channelName}}).then(res => {
                    let channelList = res.data.data.list;
                    channelList.forEach((item, index) => {
                        item.isHide = true;
                        item.show1 = false;
                        // 签到发布人
                        if (item.signUserId != null) {
                            this.$axios.get("/user/byId?userId=" + item.signUserId).then(res => {
                                item.userName1 = res.data.data.userName
                                item.headImage1 = res.data.data.headImage

                            })
                        }
                        //瞬间发布人
                        if (item.createUserId != null) {
                            this.$axios.get("/user/byId?userId=" + item.createUserId).then(res => {
                                item.userName = res.data.data.userName
                                item.headImage = res.data.data.headImage

                            })
                        }
                        if (item.signId != null) {
                            /*查询评论次数*/
                            this.$axios.post("/comment/commentNum?signId=" + item.signId).then(res => {
                                this.commentNum1 = res.data.data
                                item.num1 =this.commentNum1
                            })
                        }
                        item.num1 =this.commentNum1
                        console.log("签到评论次数", item.num1)
                        if (item.createId != null) {
                            /*查询评论次数*/
                            this.$axios.post("/comment/commentNum?createItemId=" + item.createId).then(res =>{
                                this.commentNum = res.data.data
                                console.log("shunjian评论次数", this.commentNum)
                                item.num = this.commentNum
                            })
                        }
                        item.num = this.commentNum

                    })
                    _this.channels = channelList;
                    console.log(_this.channels,"所有频道动态----------------------------------------")
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total
                })
            },
            pinkMoment(index) {
                const _this = this
                let createId = this.channels[index].createId
                console.log(createId)
                _this.$axios.get("/create/pink?createItemId="+createId).then(res => {
                    console.log(res, "点赞结果")
                    _this.reload()
                })
            },
            pinkSign(index){
                const _this = this
                let signId = this.channels[index].signId
                console.log("sssss",signId)
                _this.$axios.get("/sign/pink?signId="+signId).then(res => {
                    console.log(res, "点赞结果")
                    _this.reload()
                })
            },
            getUserRole(){
                if (this.$store.getters.getUser.userName) {
                    this.curuser.userName = this.$store.getters.getUser.userName
                    this.curuser.headerImg = this.$store.getters.getUser.headImage
                    this.hasLogin = true
                }
                console.log('当前用户', this.$store.getters.getUser.userName)
                console.log('当前头像', this.user.headerImg)
            },
        },
        created() {
            this.page(this.pageNum, this.pageSize)
            this.getUserRole()
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
    #searchId,#searchId1{
        display:flex;
        justify-content: flex-start;
    }
    #searchId,searchId1 >>> .el-input__inner{
        /*width: 70% !important;*/
        float: left;

    }
    #comBtn,#comBtn1{
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
    #icon-group1 {

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
    /*******header不能全局修饰******/
    .mpage {
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

    /*---------------文字的展开与收起----------*/
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .el-icon-pink {
        background: url("../assets/pink.png") no-repeat;
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


    /* Box Model */

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }

    /* Grid */

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

    #sidebar h2 {
        display: block;
        padding-bottom: 2em;
        font-size: 1.4em;
    }


</style>