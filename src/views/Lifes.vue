<template>
    <div>
        <el-container>
            <!--头部-->
                    <Header></Header>

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
                                        <span class="byline">Integer sit amet pede vel arcu aliquet pretium</span>
                                    </header>
<!--                                    <a href="#" class="image full"><img src="../images/pic07.jpg" alt=""/></a>-->
                                    <div class="block">
                                        <el-timeline>
                                            <el-timeline-item :timestamp="life.updateTime" placement="top" v-for="life in
                                            lifes">
                                                <el-card>
                                                    <h4>{{life.channelName}}</h4>
                                                    <p>{{life.content}}</p>
                                                </el-card>
                                            </el-timeline-item>

                                        </el-timeline>
                                    </div>
                                    <div class="block">
                                        <el-pagination class="mpage"
                                                layout="prev, pager, next"
                                                :total="1000">
                                        </el-pagination>
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
    import Header from "../components/Header";
    import Aside from "../components/Aside";
    import Bottom from "../components/Bottom";
    import AdminHeader from "../components/admin/AdminHeader";
    export default {
        name: "Lifes",
        components: {AdminHeader, Bottom, Aside, Header},
        data(){
            return{
                role:'',
                lifes:{},
                pageNum:1,
                total:0,
                pageSize:5
            }
        },

        methods:{

            page(pageNum,pageSize){
                console.log("分页查询")
                console.log(sessionStorage.getItem("user"))
                const _this = this
                _this.$axios.get("/sign/listSign",
                    {params:{pageNum,pageSize }}).then(res =>{
                    console.log(res)
                    _this.lifes = res.data.data.list
                    _this.pageNum = res.data.data.pageNum
                    _this.pageNum = res.data.data.pageSize
                    _this.total= res.data.data.total
                })
            },
            getUserRole(){
                const _this = this
                _this.role = this.$store.getters.getUser.role
                console.log('用户角色为：', _this.role)
            },
        },
        created() {
            this.page(1,5)
            this.getUserRole()
        }

    }


</script>

<style scoped>

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
#sidebar h2
{
    display: block;
    padding-bottom: 2em;
    font-size: 1.4em;
}
</style>