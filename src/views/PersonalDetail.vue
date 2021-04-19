<template>
    <div>

        <el-container>
            <el-header id="header">
                <div class="container">

                    <Header></Header>

                </div>
            </el-header>
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
                                    <el-menu-item
                                            index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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

            };
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }


    }
</script>

<style scoped>

    .el-menu-item{
        padding: 10px 10px 10px ;
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

    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
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

    body {
        -webkit-text-size-adjust: none
    }

    /* Box Model */

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }

    /* Container */

    body {
        min-width: 1200px;
    }

    .container {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    /* Modifiers */

    .container.small {
        width: 900px;
    }

    .container.big {
        width: 100%;
        max-width: 1500px;
        min-width: 1200px;
    }

    /* Grid */

    /* Cells */

    .\31 u {
        width: 100%
    }

    .\31 u {
        width: 91.6666666667%
    }

    .\31 u {
        width: 83.3333333333%
    }

    .\39 u {
        width: 75%
    }

    .\38 u {
        width: 66.6666666667%
    }

    .\37 u {
        width: 58.3333333333%
    }

    .\36 u {
        width: 50%
    }

    .\35 u {
        width: 41.6666666667%
    }

    .\34 u {
        width: 33.3333333333%
    }

    .\33 u {
        width: 25%
    }

    .\32 u {
        width: 16.6666666667%
    }

    .\31 u {
        width: 8.3333333333%
    }

    .\-11u {
        margin-left: 91.6666666667%
    }

    .\-10u {
        margin-left: 83.3333333333%
    }

    .\-9u {
        margin-left: 75%
    }

    .\-8u {
        margin-left: 66.6666666667%
    }

    .\-7u {
        margin-left: 58.3333333333%
    }

    .\-6u {
        margin-left: 50%
    }

    .\-5u {
        margin-left: 41.6666666667%
    }

    .\-4u {
        margin-left: 33.3333333333%
    }

    .\-3u {
        margin-left: 25%
    }

    .\-2u {
        margin-left: 16.6666666667%
    }

    .\-1u {
        margin-left: 8.3333333333%
    }

    .row > * {
        padding: 50px 0 0 50px;
        float: left;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }

    .row + .row > * {
        padding-top: 50px;
    }

    .row {
        margin-left: -50px;
    }

    /* Rows */

    .row:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
    }

    .row:first-child > * {
        padding-top: 0;
    }

    .row > * {
        padding-top: 0;
    }

    /* Modifiers */

    /* Flush */

    .row.flush {
        margin-left: 0;
    }

    .row.flush > * {
        padding: 0 !important;
    }

    /* Quarter */

    .row.quarter > * {
        padding: 12.5px 0 0 12.5px;
    }

    .row.quarter + .row.quarter > * {
        padding-top: 12.5px;
    }

    .row.quarter {
        margin-left: -12.5px;
    }

    /* Half */

    .row.half > * {
        padding: 25px 0 0 25px;
    }

    .row.half + .row.half > * {
        padding-top: 25px;
    }

    .row.half {
        margin-left: -25px;
    }

    /* One and (a) Half */

    .row.oneandhalf > * {
        padding: 75px 0 0 75px;
    }

    .row.oneandhalf + .row.oneandhalf > * {
        padding-top: 75px;
    }

    .row.oneandhalf {
        margin-left: -75px;
    }

    /* Double */

    .row.double > * {
        padding: 100px 0 0 100px;
    }

    .row.double + .row.double > * {
        padding-top: 100px;
    }

    .row.double {
        margin-left: -100px;
    }

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
    /*********************************************************************************/
    /* Main                                                                          */
    /*********************************************************************************/

    #main {
        padding: 6em 0em 4em 0em;
    }

    #main {
        position: relative;
        background: #fff;
    }

    #content {
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


    /* Lists */

    ul.default
    {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul.default li
    {
        padding: 0.60em 0em;
        border-top: 1px solid;
        border-color: rgba(255,255,255,.1);
    }

    ul.default li:first-child
    {
        padding-top: 0;
        border-top: none;
    }

    ul.default a
    {
        text-decoration: none;
        color: rgba(255,255,255,.5);
    }

    ul.default a:hover
    {
        text-decoration: underline;
    }

    ul.style {
    }

    ul.style li {
        margin: 0;
        padding: 2em 0em 1.5em 0em;
        border-top: 1px solid #ECECEC;
    }

    ul.style li:first-child
    {
        padding-top: 0;
        border-top: none;
    }

    ul.style img {
        float: left;
        margin-right: 20px;
    }

    ul.style p {
    }

    ul.style .posted {
        padding: 0em 0em 1em 0em;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 8pt;
        color: #A2A2A2;
    }

    ul.style .first {
        padding-top: 0px;
        border-top: none;
    }

    div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}table{border-collapse:collapse;border-spacing:0;}body{-webkit-text-size-adjust:none}


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
</style>