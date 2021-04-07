<template>
    <div class="mcontant">
        <div class="block">
            <el-avatar :size="50" :src="user.headerImg"/>
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

                    <li><el-link v-show="!hasLogin" href="/login">登录</el-link></li>
                    <li><el-link v-show="hasLogin" @click="logout">退出</el-link></li>
                </ul>
            </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                user:{
                    userName:'bbbb',
                    headerImg:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
            }
        },
        methods:{
            logout(){
                this.$axios.post("/user/logout").then(res =>{
                    this.$router.push("/login")
                })

            }
        },
        hasLogin:false

    }
</script>

<style scoped>
    .mcontant{
        max-width: 960px;
        margin: 0 auto;
        text-align: center;

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