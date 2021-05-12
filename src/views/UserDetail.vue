<template>
    <div>
        <el-container>
            <!--头部-->
            <Header/>
            <!--主栏-->
            <el-container class="container" >
                <div id="main" style="padding: 30px 30px 30px 30px">
                    <el-page-header @back="goBack" content="博客详情">
                    </el-page-header>
                    <header>
                        <div style="margin: 30px 0;"></div>
                        <h2 style="font-size: 2em">{{user.userName}}的博客</h2>
                        累计签到天数：&emsp;<span style="color: #29ac9b;font-family: Constantia;font-size: large">{{user.signNum}}</span>
                        <p  class="byline">签名：{{user.signature}}</p>
                    </header>
                    <el-container>
                        <!--SideBar-->
                        <el-aside id="sidebar" class="4u">
                            <el-card>
                                <el-image shape="square" :size="100" style="width: 150px;height: 150px;" fit="cover"
                                     :src="'http://localhost:8880' + user.headImage"/>

                            </el-card>
                        </el-aside>
                    </el-container>
                    <div class="line"></div>
                    <!-- Content -->
                    <div id="content" class="8u skel-cell-important">
                        <el-card>
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="签到动态" name="first">
                                <el-timeline>
                                    <el-timeline-item :timestamp="sign.updateTime" placement="top"
                                                      v-for="(sign,index) in signs">
                                        <el-card>
                                            <h4>标题 ：{{sign.title}}</h4>

                                            <hr>
                                            <p>内容 ：
                                                {{sign.content}}
                                            </p>
                                            <div class="demo-image__preview">
                                                <el-image style="height: 370px;width: 630px" fit="cover" v-show="!(sign.mediaUrl == '')"
                                                          class="img full"
                                                          :src="'http://localhost:8880' + sign.mediaUrl"
                                                >
                                                </el-image>
                                            </div>
                                            <!--标签-->
                                            <p class="posted">来自频道：<el-tag type="success">{{sign.channelName}}</el-tag></p>
                                            <el-row id="icon-group2">
                                                <span style="vertical-align: middle;display: flex" @click="pinkSign(index)">
                                                    <svg class="iconfont" aria-hidden="true">
                                                        <use xlink:href="#icon-dianzan"></use>
                                                    </svg><p>{{sign.pinkNum}}</p>
                                                </span>
                                                <span style="vertical-align: middle;display: flex">
                                                    <svg class="iconfont" aria-hidden="true">
                                                        <use xlink:href="#icon-pinglun1"></use>
                                                    </svg><p>5</p>
                                                </span>
                                            </el-row>

                                        </el-card>
                                    </el-timeline-item>

                                </el-timeline>
                            </el-tab-pane>
                            <el-tab-pane label="瞬间动态" name="second">
                                <el-timeline>
                                    <el-timeline-item :timestamp="mom.updateTime" v-for="(mom,index) in moments" icon="el-icon-time" placement="top">
                                        <el-card class="box-card">
                                            <div class="line"></div>
                                            <div class="demo-image__preview">
                                                <a href="#" class="image full">
                                                    <el-image fit="cover" style="height: 370px;width: 630px" :src="'http://localhost:8880' + mom.mediaUrl" alt=""/>
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
                                                <span style="vertical-align: middle;display: flex" @click="pinkMoment(index)">
                                                    <svg class="iconfont" aria-hidden="true">
                                                        <use xlink:href="#icon-dianzan"></use>
                                                    </svg><p>{{mom.pinkNum}}</p>
                                                </span>
                                                <span  style="vertical-align: middle;display: flex" @click="onShow1(index,mom.id)">
                                                    <svg class="iconfont" aria-hidden="true">
                                                        <use xlink:href="#icon-pinglun1" @click="comment"></use>
                                                    </svg><p>{{mom.num}}</p>
                                                </span>
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
                            </el-tab-pane>
                        </el-tabs>
                        </el-card>
                    </div>
                </div>
            </el-container>
            <!--底栏-->
            <el-footer>
                <Bottom></Bottom>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Bottom from "../components/Bottom";
    import Header from "../components/Header";
    import Aside from "../components/Aside";

    export default {
        name: "userDetail",
        components: {Aside, Header, Bottom},
        inject: ['reload'],
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            goBack() {
                console.log('go back');
            },
            onShow: function (index) {
                this.moments[index].isHide = false;
                // this.isHide = false;    //点击onShow切换为false，显示为展开画面
            },
            onHide: function (index) {
                this.moments[index].isHide = true;
                // this.isHide = true;    //点击onHide切换为true，显示为折叠画面
            },
            pinkMoment(index) {
                const _this = this
                let createId = this.moments[index].id
                console.log(createId)
                _this.$axios.get("/create/pink?createItemId="+createId).then(res => {
                    console.log(res, "点赞结果")
                    _this.reload()
                })
            },
            pinkSign(index){
                const _this = this
                let signId = this.signs[index].id
                console.log("sssss",signId)
                _this.$axios.get("/sign/pink?signId="+signId).then(res => {
                    console.log(res, "点赞结果")
                    _this.reload()
                })
            },
            submit(createItemId){
                const content = this.comment
                this.$axios.get("/create/comment",{params:{createItemId,content}}).then(res =>{
                    console.log("评论之后",res)
                    this.reload()
                })
            },
            onShow1(index,createId) {
                const _this = this
                this.getComment(createId);
                this.moments[index].show1 = !this.moments[index].show1;

            },
            getComment(createItemId){
                this.$axios.post("/comment/detail?createItemId="+createItemId).then(res =>{
                    let commentList = res.data.data
                    commentList.forEach((item,index) =>{
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

        },
        data() {
            return {
                comment:'',
                commentNum:'',
                moments: {
                    isHide:'',
                    show1:''
                },
                comments:{},
                user: {},
                activeName: 'first',
                isHide: true, //初始值为true，显示为折叠画面
                signs:{}
            }
        },
        created() {
            const userId = this.$route.query.userId
            console.log('等到的userId：：', userId)
            const _this = this
            this.$axios.get("/user/byId?userId=" + userId).then(res => {
                _this.user = res.data.data
                console.log('得到的用户', _this.user)
            });
            this.$axios.get("/create/listByUserId?userId="+userId).then(res =>{
                let momentList = res.data.data;
                momentList.forEach((item, index) => {
                    item.isHide = true;
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
                _this.moments = momentList
                console.log('得到的瞬间内容',_this.moments)
            })
            this.$axios.get("/sign/listByUserId?userId="+userId).then(res =>{
                _this.signs = res.data.data;
                console.log('得到的签到内容',_this.moments)
            })
        }
    }
</script>

<style scoped>
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

    #icon-group,#icon-group2 {

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

    .el-header {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-footer h2 {

        display: block;
        color: #FFF;

    }


    .el-main {
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

    #nav > ul > li > a,
    #nav > ul > li > span {
        display: block;
        padding: 1em 1.5em;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 200;
        font-size: 1em;
        outline: 0;
        color: rgba(255, 255, 255, .7);
    }


    #nav > ul > li > a:hover {
        color: #FFF;
    }

    #nav li.active a {
        background: none;
        border-radius: 40px;
        border: 2px solid;
        border-color: rgba(255, 255, 255, .8);
        color: #FFF;
    }

    #nav > ul > li > ul {
        display: none;
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

    #sidebar h2 {
        display: block;
        padding-bottom: 2em;
        font-size: 1.4em;
    }

</style>