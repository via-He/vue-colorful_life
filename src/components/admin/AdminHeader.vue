<template>
    <!-- Header -->
    <header id="header">
        <div>{{userName}}&emsp; </div>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="55"></el-avatar>
        <h1>多彩生活管理后台</h1>
        <nav class="links">
            <ul>
                <li><a href="/admin"><h1>推荐管理</h1></a></li>
                <li><a href="/createAdmin"><h1>动态频道</h1></a></li>
                <li><a href="/user"><h1>用户管理</h1></a></li>
                <li><a href="/notice"><h1>公告管理</h1></a></li>
                <li><el-link v-show="!hasLogin" href="/login"><h1>登录</h1></el-link></li>
                <li><el-link v-show="hasLogin" @click="logout"><h1>退出</h1></el-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "AdminHeader",
        data(){
            return{
                hasLogin:false,
                userName:'admin'
            }

        },
        methods:{
            logout(){
                const  _this = this
                this.$axios.post("/user/logout").then(res =>{
                    _this.$store.commit("REMOVE_USERINFO")
                    this.$router.push("/login")
                })

            },

        },
        created() {
            if (this.$store.getters.getUser.userName){
                this.userName = this.$store.getters.getUser.userName
                this.hasLogin = true
            }
            console.log('当前用户',this.$store.getters.getUser.userName)
        }
    }
</script>

<style scoped>

    #header {
        display: -moz-flex;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        -moz-justify-content: space-between;
        -webkit-justify-content: space-between;
        -ms-justify-content: space-between;
        justify-content: space-between;
        background-color: #ffffff;
        border-bottom: solid 1px rgba(160, 160, 160, 0.3);
        height: 3.5em;
        left: 0;
        line-height: 3.5em;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10000;
    }

    #header ul {
        list-style: none;
        margin: 0;
        padding-left: 0;
    }

    #header ul li {
        display: inline-block;
        padding-left: 0;
    }

    #header h1 {
        height: inherit;
        line-height: inherit;
        padding: 0 0 0 1.5em;
        white-space: nowrap;
    }

    #header h1 a {
        font-size: 0.7em;
    }

    #header .links {
        -moz-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border-left: solid 1px rgba(160, 160, 160, 0.3);
        height: inherit;
        line-height: inherit;
        margin-left: 1.5em;
        overflow: hidden;
        padding-left: 1.5em;
    }

    #header .links ul li {
        border-left: solid 1px rgba(160, 160, 160, 0.3);
        line-height: 1;
        margin-left: 1em;
        padding-left: 1em;
    }

    #header .links ul li:first-child {
        border-left: 0;
        margin-left: 0;
        padding-left: 0;
    }

    #header .links ul li a {
        border-bottom: 0;
        font-family: "Raleway", Helvetica, sans-serif;
        font-size: 0.7em;
        font-weight: 400;
        letter-spacing: 0.25em;
        text-transform: uppercase;
    }

    #nav
    {
    }

    #nav > ul > li
    {
        display: inline-block;
    }

    #nav > ul > li:last-child
    {
        padding-right: 0;
    }

    #nav > ul > li > a,
    #nav > ul > li > span
    {
        display: block;
        padding: 1em 1.5em;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 200;
        font-size: 1em;
        outline: 0;
        color: rgba(255,255,255,.7);
    }


    #nav > ul > li > a:hover
    {
        color: #FFF;
    }

    #nav li.active a
    {
        background: none;
        border-radius: 40px;
        border: 2px solid;
        border-color: rgba(255,255,255,.8);
        color: #FFF;
    }

    #nav > ul > li > ul
    {
        display: none;
    }
    @media screen and (max-width: 980px) {

        #header .links {
            display: none;
        }

    }

    @media screen and (max-width: 736px) {

        #header {
            height: 2.75em;
            line-height: 2.75em;
        }

        #header h1 {
            padding: 0 0 0 1em;
        }

        #header .main .search {
            display: none;
        }

    }
</style>