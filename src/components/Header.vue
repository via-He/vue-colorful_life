<template>
    <div id="header">
        <div class="container">

            <div class="container">
                <!-- Logo -->
                <div id="logo">
                    <h1><a href="#">Colorful Life</a></h1>
                    <span>欢迎来到多彩生活记小站</span>
                </div>
                <div class="block" style="margin-top: 10px">
                    <a href="#">
                        <el-image class="el-avatar--circle" fit="cover" style="height: 70px; width: 70px"
                                   :src="'http://localhost:8880' + user.headerImg"/>
                    </a>
                    <div><a href="#" style="color: #FFF;text-decoration:none;" >{{user.userName}}</a></div>
                </div>
                <!-- Nav -->
                <nav id="nav">
                    <ul>
                        <li class="active"><a href="/lifes"><h1>首页</h1></a></li>
                        <li><a href="/channel"><h1>频道</h1></a></li>
                        <li><a href="/personal"><h1>我的博客</h1></a></li>
                        <li><a href="/notice"><h1>公告</h1></a></li>

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
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                user: {
                    userName: 'bbbb',
                    headerImg: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                hasLogin: false,
            }
        },
        methods: {
            logout() {
                const _this = this
                this.$axios.post("/user/logout").then(res => {
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })

            }
        },
        created() {
            if (this.$store.getters.getUser.userName) {
                this.user.userName = this.$store.getters.getUser.userName
                this.user.headerImg = this.$store.getters.getUser.headImage
                this.hasLogin = true
            }
            console.log('当前用户', this.$store.getters.getUser.userName)
            console.log('当前头像', this.user.headerImg)
        }

    }
</script>

<style scoped>
    /* .mcontant {
         max-width: 960px;
         margin: 0 auto;
         text-align: center;

     }
 */
    #header {
        height: 600px !important;
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


</style>