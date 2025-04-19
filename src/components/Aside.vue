<template>
    <div>
        <section>
            <el-card>
                <el-row id="searchId">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="keyword">
                </el-input>
                <router-link :to="{path:'search',query: {keyword}}" style="text-decoration: none"><el-button id="searchBtn" icon="el-icon-search" type="info" plain></el-button></router-link>
                </el-row>
            </el-card>
            <el-card>
                <header>
                    <el-button type="primary">
                        <router-link :to="{path:'signEdit'}" style="text-decoration: none"><h1>今日没签到哟</h1></router-link>
                    </el-button>
                    <span>我已累计签到&emsp;&emsp;<span style="color: #29ac9b;font-family: Constantia;font-size: 30px">{{personSignNum}}</span>&emsp;&emsp;天</span>
                    <el-button style="margin-top: 20px">
                        <router-link :to="{path:'momentEdit'}" style="text-decoration: none">
                            <svg class="iconfont" aria-hidden="true">
                                <use xlink:href="#icon-chuangjian"></use>
                            </svg>
                            <h1>记下每一个瞬间</h1></router-link>
                    </el-button>
                </header>

            </el-card>
            <div id="cal">
                <el-calendar v-model="value">
                </el-calendar>
            </div>
            <h2>签到排行榜</h2>

            <ul class="style">
                <li v-for="sign in users">
                    <router-link :to="{path:'userDetail',query: {userId:sign.id}}" style="text-decoration: none">
                    <p class="posted">
                        <span style="color: #2a2f27">{{sign.userName}}</span>&emsp;&emsp;
                        累计签到天数：&emsp;<span style="color: #29ac9b;font-family: Constantia;font-size: large">{{sign.signNum}}</span>
                    </p>
                    <el-image fit="cover" :src="`${process.env.VUE_APP_IMAGE_BASE}` + sign.headImage" class="el-avatar"  style="width: 60px;height: 60px" alt=""/>
                    </router-link>
                    <p class="text">{{sign.signature}}</p>
                </li>
            </ul>
            <div class="block">
                <el-pagination class="mpage"
                               layout="prev, pager, next"
                               :current-page="pageNum"
                               :page-size="pageSize"
                               :total="total"
                               @current-change="signOrder"
                >
                </el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        data() {
            return {
                value: new Date(),
                personSignNum: '',
                pageNum:1,
                total:0,
                pageSize:4,
                users: '',
                keyword:''

            }
        },
        methods: {
            getSignNum() {
                const _this = this
                _this.$axios.get("/sign/signNum").then(res => {
                    console.log('签到天数：', res)
                    _this.personSignNum = res.data.data
                })
            },
            signOrder(pageNum,pageSize) {
                const _this = this
                pageSize = _this.pageSize
                _this.$axios.get("/signOrder",{params:{pageNum,pageSize }}).then(res => {
                    console.log('签到排行榜：', res)
                    _this.users = res.data.data.list
                    console.log(_this.users)
                    _this.pageNum = res.data.data.pageNum
                    _this.pageSize = res.data.data.pageSize
                    _this.total= res.data.data.total

                })
            }
        },
        created() {
            this.getSignNum();
            this.signOrder(1,4)
        }
    }
</script>

<style scoped>
    #cal {
        margin-top: 30px;
        margin-bottom: 30px;
        padding-bottom: 10px;
        box-shadow: 0 1px 3px #ccc;
        border: 1px solid #ededed;
    }

    #cal >>> .el-calendar-table .el-calendar-day {
        height: 30px !important;

    }
    #searchId{
        display:flex;
        justify-content: flex-start;
    }
    #searchId >>> .el-input__inner{
        /*width: 70% !important;*/
        float: left;

    }
    #searchBtn{
        float: right;
        display:inline-block;
    }
</style>