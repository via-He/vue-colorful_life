<template>
    <div>

        <el-container>

            <!--头部-->
            <div v-if="(role === 0)">
                <Header></Header>
            </div>
            <div v-else>
                <AdminHeader></AdminHeader>
            </div>
            <!--主栏-->
            <el-container class="container">
                <el-main id="main">
                    <div class="container">
                        <div class="row">
                            <!-- Content -->
                            <div id="content" class="8u skel-cell-important">
                                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                    <el-tab-pane label="浏览所有公告" name="first">
                                        <el-timeline>
                                            <el-timeline-item :timestamp="notice.updateTime" v-for="(notice,index) in notices" icon="el-icon-time" placement="top">
                                                <el-card class="box-card">
                                                    <span class="iconfont icon-yonghu" id="yonghu">{{notice.creatorName}}</span>
                                                    <!--<svg class="iconfont" aria-hidden="true">
                                                        <use xlink:href="#icon-chuangjianzhe"></use>
                                                    </svg>{{userName}}-->
                                                    <div id="example">
                                                        <!-- 利用v-if…v-else切换 展开 和 收起 两个画面，template包裹多个元素 -->
                                                        <template v-if="notice.isHide">
                                                            <!-- 只显示摘要的画面 -->
                                                            <div class="hideBg">
                                                                <p class="summary">{{ notice.content }}</p>
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
                                                                <p>{{ notice.content }}</p>
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
                                                        <svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-dianzan"></use>
                                                        </svg>
                                                        <svg class="iconfont" aria-hidden="true" v-on:click="edit(notice.id,notice.content)">
                                                            <use xlink:href="#icon-bianji"></use>
                                                        </svg>
                                                        <i v-on:click="deleteNotice(notice.id)"><svg class="iconfont" aria-hidden="true">
                                                            <use xlink:href="#icon-shanchu3"></use>
                                                        </svg></i>
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
                                    </el-tab-pane>
                                    <el-tab-pane label="发布新公告" name="second" v-if="isShow">
                                        <el-card>
                                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                                     class="demo-ruleForm">
                                                <el-form-item label="内容" prop="content">
                                                    <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                                </el-form-item>
                                            </el-form>
                                        </el-card>
                                    </el-tab-pane>
                                    <div v-if="!((ruleForm1.id === '')&&(ruleForm1.id === null))">
                                    <el-tab-pane label="编辑公告" name="third" >
                                        <el-card>
                                            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px"
                                                     class="demo-ruleForm">
                                                <el-form-item prop="noticeId" label="id">
                                                    <el-input v-model="ruleForm1.noticeId" hidden readonly></el-input>
                                                </el-form-item>
                                                <el-form-item label="内容" prop="content">
                                                    <el-input type="textarea" v-model="ruleForm1.content" placeholder="请输入内容"></el-input>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button type="primary" @click="editForm('ruleForm1')">发布</el-button>
                                                    <el-button @click="resetForm('ruleForm1')">重置</el-button>
                                                </el-form-item>
                                            </el-form>
                                        </el-card>
                                    </el-tab-pane>
                                    </div>
                                </el-tabs>
                            </div>
                            <!--SideBar-->
                            <el-aside id="sidebar" class="4u" v-if="!(role === 1)">
                                <Aside></Aside>
                            </el-aside>

                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Element from "element-ui";
    import Bottom from "../components/Bottom";
    import Aside from "../components/Aside";
    import qs from "qs";
    import AdminHeader from "../components/admin/AdminHeader";

    export default {
        inject :['reload'],
        name: "Notice",
        components: {AdminHeader, Header, Bottom, Aside},
        data() {
            return {
                textarea: '',
                isShow: false,
                activeName: 'first',
                role:'',
                userName:'',
                notices:{},
                pageNum: 1,
                total: 0,
                pageSize: 5,
                ruleForm: {
                    content:'',
                },
                ruleForm1: {
                    content:'',
                    noticeId:''
                },
                rules:{
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                        {min: 1, max: 500, message: '长度在 10到 500 个字符', trigger: 'blur'}
                    ],
                },
                rules1:{
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                        {min: 1, max: 500, message: '长度在 10到 500 个字符', trigger: 'blur'}
                    ],
                    id:[{required :true},
                        {type: 'number'}]
                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            onShow: function (index) {
                this.notices[index].isHide = false;//点击onShow切换为false，显示为展开画面
            },
            onHide: function (index) {
                this.notices[index].isHide = true; //点击onHide切换为true，显示为折叠画面
            },

            page(pageNum,pageSize){
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/notice/list",
                    {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let noticeList = res.data.data.list;
                    noticeList.forEach((item) => {
                        item.isHide = true;
                    })
                    _this.notices = noticeList;
                    console.log('公告分页列表', _this.notices);
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    console.log(_this.pageSize, 'this.pagesize')
                    _this.total = res.data.data.total
                })
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        _this.$axios.post("/notice/admin/addNotice", qs.stringify(this.ruleForm)).then(res =>{
                            console.log(res)
                            _this.$alert('发布成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.reload()
                                }
                            });
                        })
                    }
                })
            },
            editForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        _this.$axios.post("/notice/admin/update", qs.stringify(this.ruleForm1)).then(res =>{
                            console.log(res)
                            _this.$alert('发布成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.reload()
                                }
                            });
                        })
                    }
                })
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getUserRole(){
                const _this = this
                _this.role = this.$store.getters.getUser.role
                _this.userName = this.$store.getters.getUser.userName
                console.log( _this.role)
                if (_this.role === 1){
                    this.isShow = true
                }
            },
            deleteNotice(noticeId) {
                const _this = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$axios.get("/notice/delete?noticeId=" + noticeId).then(res => {
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
            edit(id,content){
                this.activeName = 'third',
                    this.ruleForm1.noticeId = id,
                    this.ruleForm1.content = content
            }
        },
        created() {
                this.page(1, 5)
                this.getUserRole()
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
    #icon-group{

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

    #yonghu{
        color: #909399;
        line-height: 1;
        font-size: 17px;
    }
    #content >>> .el-form .el-textarea__inner {
        line-height: 7 !important;
    }

    .icon{
        width: 40px;
        height: 40px;
        font-size: 20px;
        display:flex;
        justify-content: flex-start;
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

    /*通用复制*/
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

    /*********************************************************************************/
    /* Nav                                                                           */
    /*********************************************************************************/

    #nav ul
    {
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
</style>