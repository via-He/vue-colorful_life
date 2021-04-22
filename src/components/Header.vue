<template>
    <el-header id="header" >
        <div class="container">
    <div class="mcontant">
        <div class="block">
            <a href="#" >
                <el-avatar fit="fill"  :size="70" style="height: 70px; width: 70px" :src="'http://localhost:8880' + user.headerImg"/>
            </a>

            <div>{{user.userName}}</div>
        </div>
        <div>
            <div class="container">
                <!-- Logo -->
                <div id="logo">
                    <h1><a href="#">Colorful Life</a></h1>
                </div>
            <!-- Nav -->
            <nav id="nav">
                <ul>
                    <li class="active"><a href="/lifes">首页</a></li>
                    <li><a href="/channel">频道</a></li>
                    <li><a href="/personal">我的博客</a></li>
                    <li><a href="/notice">公告</a></li>

                    <li><el-link v-show="!hasLogin" href="/login">登录</el-link></li>
                    <li><el-link v-show="hasLogin" @click="logout">退出</el-link></li>
                </ul>
            </nav>
            </div>
        </div>
    </div>
        </div>
    </el-header>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                user:{
                    userName:'bbbb',
                    headerImg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                hasLogin:false,
            }
        },
        methods:{
            logout(){
                const  _this = this
                this.$axios.post("/user/logout").then(res =>{
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })

            }
        },
        created() {
            if (this.$store.getters.getUser.userName){
                this.user.userName = this.$store.getters.getUser.userName
                this.user.headerImg = this.$store.getters.getUser.headImage
                this.hasLogin = true
            }
            console.log('当前用户',this.$store.getters.getUser.userName)
            console.log('当前头像',this.user.headerImg)
        }

    }
</script>

<style scoped>
    .mcontant{
        max-width: 960px;
        margin: 0 auto;
        text-align: center;

    }
    #header {
        height: 600px !important;
        position: relative;
        background: #2a2f27 url(../images/banner.jpg) no-repeat;
        background-size: cover;
        padding: 5em 0em;
        text-align: center;
        vertical-align: baseline;
    }
    .el-container #header{
        padding: 15em 0em ;
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
        color:  #1d1d1d;
    }

    #nav li.active a {
        background: none;
        border-radius: 40px;
        border: 2px solid;
        border-color:  #1d1d1d;
        color:  #1d1d1d;
    }

    #nav > ul > li > ul {
        display: none;
    }


</style>