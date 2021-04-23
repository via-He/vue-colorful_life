<template>
    <div>
        <el-container>
            <!--头部-->
            <el-header id="header">
                <div class="container">
                    <AdminHeader></AdminHeader>
                </div>
            </el-header>
            <!--主栏-->
            <el-container class="container">
                <el-main id="main">
                    <div class="container">
                        <div class="row">

                            <!-- Content -->
                            <div id="content" class="8u skel-cell-important">
                                <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
                                    <el-tab-pane name="first" label="签到管理">
                                        <!--签到列表-->
                                            <el-timeline>
                                                <el-timeline-item :timestamp="sign.updateTime"
                                                                  placement="top" v-for="(sign,index) in signs" >
                                                    <el-card>
                                                        <h4>标题 ：{{sign.title}}</h4>
                                                        <i class="el-icon-delete" v-on:click="deleteSign(life.id)"></i>
                                                        <hr>
                                                        <p>内容 ：
                                                            {{sign.content}}
                                                        </p>
                                                        <div class="demo-image__preview">
                                                            <el-image v-show="!(sign.mediaUrl == '')"
                                                                      class="img full"
                                                                      :src="'http://localhost:8880' + sign.mediaUrl"
                                                                      :preview-src-list="srcList">
                                                            </el-image>
                                                        </div>
                                                        <!--标签-->
                                                        <el-tag closable>
                                                            {{sign.channelName}}
                                                        </el-tag>
                                                    </el-card>
                                                </el-timeline-item>
                                            </el-timeline>
                                            <el-pagination class="mpage"
                                                           layout="prev, pager, next"
                                                           :current-page="pageNum"
                                                           :page-size="pageSize"
                                                           :total="total"
                                                           @current-change="signpage"
                                            >
                                            </el-pagination>
                                    </el-tab-pane>
                                    <el-tab-pane label="瞬间管理" name="second">
                                        <el-timeline>
                                            <el-timeline-item :timestamp="mom.updateTime" v-for="(mom,index) in moments"
                                                              icon="el-icon-time" placement="top">
                                                <el-card class="box-card">
                                                    <el-tag type="success">{{mom.channelName}}</el-tag>
                                                    <div class="line"></div>
                                                    <div class="demo-image__preview">
                                                        <a href="#" class="image full">
                                                            <el-image :src="'http://localhost:8880' + mom.mediaUrl"
                                                                      alt=""/>
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

                                                    <el-row class="icon">
                                                        <i class="el-icon-star-off" v-if="mom.isHide"></i>
                                                        <i class="el-icon-star-on" v-else v-on:click="pink"
                                                           style="margin-left: 10px;width: 10px"></i>
                                                        <i class="el-icon-chat-dot-round" @click="comment"></i>
                                                        <i class="el-icon-delete-solid"
                                                           v-on:click="deleteMoment(mom.id)"></i>
                                                    </el-row>
                                                    <el-pagination class="mpage"
                                                                   layout="prev, pager, next"
                                                                   :current-page="pageNum"
                                                                   :page-size="pageSize"
                                                                   :total="total"
                                                                   @current-change="momentpage"
                                                    >
                                                    </el-pagination>
                                                </el-card>
                                            </el-timeline-item>
                                        </el-timeline>
                                    </el-tab-pane>
                                </el-tabs>
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
    import AdminHeader from "../../components/admin/AdminHeader";
    import Bottom from "../../components/Bottom";
    export default {
        name: "CreateAdmin",
        components: {Bottom, AdminHeader},
        data() {
            return {
                activeName: 'first',
                signs: {},
                moments: {},
                pageNum: 1,
                pageSize: 5,
                total: 0
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            signpage(pageNum, pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get('/admin/listSignForAdmin', {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    console.log("签到查询内容集合")
                    _this.signs = res.data.data.list
                    console.log(_this.signs)
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total
                })
            },
            momentpage(pageNum, pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get('/admin/listAllForAdmin', {params: {pageNum, pageSize}}).then(res => {
                    console.log(res)
                    let momentList = res.data.data.list;
                    console.log("瞬间查询内容集合")
                    momentList.forEach((item, index) => {
                        item.isHide = true;
                    })
                    _this.moments = momentList;
                    console.log(_this.channels)
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total = res.data.data.total
                })
            },
        },
        created() {
            this.signpage(1, 5)
            this.momentpage(1, 5)
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>