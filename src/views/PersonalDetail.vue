<template>
    <div>

        <el-container>

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
                                          :src="'http://localhost:8880' + user.headerImg"/>
                            </a>
                            <div><a href="#" style="color: #FFF;text-decoration:none;" >{{user.userName}}</a></div>
                        </div>
                        <!-- Nav -->
                        <nav id="nav">
                            <ul>
                                <li><a href="/lifes"><h1>首页</h1></a></li>
                                <li ><a href="/channel"><h1>频道</h1></a></li>
                                <li  class="active"><a href="/personal"><h1>我的博客</h1></a></li>
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

            <el-container class="container">
                <el-main id="main">
                    <div class="container">
                        <div class="row">

                            <!-- Content -->
                            <div id="content" class="8u skel-cell-important">
                                <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal"
                                         @select="handleSelect">

                                        <el-menu-item index="/sign">我的签到</el-menu-item>
                                        <el-menu-item index="/moment">我的瞬间</el-menu-item>

                                    <el-menu-item index="/userData">个人资料</el-menu-item>
                                    <!--<el-menu-item
                                            index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
                                </el-menu>

                                <div class="line"></div>

                                <el-main>
                                    <router-view/>
                                </el-main>

                            </div>
                            <!--SideBar-->
                            <el-aside id="sidebar" class="4u">
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
    export default {
        name: "PersonalDetail",
        inject :['reload'],
        components: {Aside, Bottom, Header},
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '2',
                user: {
                    userName: 'bbbb',
                    headerImg: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    role:'',
                },
                hasLogin:false

            };
        },
        methods:{
            logout() {
                const _this = this
                this.$axios.post("/user/logout").then(res => {
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getUserRole(){
                if (this.$store.getters.getUser.userName) {
                    this.user.userName = this.$store.getters.getUser.userName
                    this.user.headerImg = this.$store.getters.getUser.headImage
                    this.role = this.$store.getters.getUser.role
                    this.hasLogin = true
                }
                console.log('当前用户', this.$store.getters.getUser.userName)
                console.log('当前头像', this.user.headerImg)
            },
        },
        created() {
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

    .el-menu-item{
        padding: 10px 10px 10px ;
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