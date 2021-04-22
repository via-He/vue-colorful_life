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
                                        <h2>今日签到</h2>
                                        <span class="byline">Integer sit amet pede vel arcu aliquet pretium</span>
                                    </header>
                                    <div style="margin: 20px 0;"></div>

                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                             class="demo-ruleForm">
                                        <el-form-item label="标题" prop="title">
                                            <el-input v-model="ruleForm.title"></el-input>
                                        </el-form-item>

                                        <el-form-item label="内容" prop="content">
                                            <el-input type="textarea" v-model="ruleForm.content"></el-input>
                                        </el-form-item>

                                        <el-form-item label="频道" prop="description">

                                            <el-select v-model="ruleForm.channelName"
                                                       placeholder="选择频道">
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-upload
                                                    action="http://localhost:8880/upload"
                                                    list-type="picture-card"
                                                    :auto-upload="true">
                                                <i slot="default" class="el-icon-plus"></i>
                                                <div slot="file" slot-scope="{file}">
                                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
<!--                                                    <video controls="controls" :src="file.url" alt=""></video>-->
                                                    <span class="el-upload-list__item-actions">
                                                        <span class="el-upload-list__item-preview"
                                                              @click="handlePictureCardPreview(file)">
                                                          <i class="el-icon-zoom-in"></i>
                                                        </span>
                                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                                          <i class="el-icon-delete"></i>
                                                        </span>
                                                  </span>
                                                </div>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible">
                                                <img width="100%" :src="dialogImageUrl" alt="">
                                            </el-dialog>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="submitForm('ruleForm')">立即签到</el-button>
                                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                                        </el-form-item>
                                    </el-form>
                                </section>
                            </div>
                            <!--SideBar-->
                            <el-aside id="sidebar" class="4u">
                                <Aside></Aside>
                            </el-aside>

                            <!-- Footer -->
                            <div id="featured">
                                <div class="container">
                                    <div class="row">

                                    </div>
                                </div>
                            </div>
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
    import qs from 'qs'

    export default {
        name: "SignDetail",
        components: {Bottom, Aside, Header},
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                ruleForm: {
                    title: '',
                    content: '',
                    channelName: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],

                    content: [
                        {trequired: true, message: '请输入内容', trigger: 'blur'},
                        {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
                    ]
                },
                options: [{
                    value: '选项1',
                    label: '学习'
                }, {
                    value: '选项2',
                    label: '成长'
                }, {
                    value: '选项3',
                    label: '情感'
                }, {
                    value: '选项4',
                    label: '思想'
                }, {
                    value: '选项5',
                    label: '旅游'
                }, {
                    value: '选项6',
                    label: '美食'
                }],
                channelName: [],
            }
        },
        methods: {
            goBack() {
                console.log('go back');
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(this.dialogImageUrl,'ddfffffffffffff')

            },
            uploadMedia(file) {
                const _this = this
                _this.$axios.post('/upload', file).then(res => {
                    console.log(res)
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        const _this = this
                        _this.$axios.post('/sign/signIn', qs.stringify(this.ruleForm)).then(res => {
                            console.log(res)
                            _this.$alert('今日签到成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/personal")
                                }
                            });

                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>

    .mpage {
        margin: 0 auto;
        text-align: center;
    }

    #content >>> .el-form .el-textarea__inner {
        line-height: 7 !important;
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