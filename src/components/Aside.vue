<template>
    <div>
        <section>
            <el-card>
                <el-row id="searchId">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="searchinput">
                </el-input>
                <el-button id="searchBtn" icon="el-icon-search" type="info" plain></el-button>
                </el-row>
            </el-card>
            <el-card>
                <header>
                    <el-button type="primary">
                        <router-link :to="{path:'signDetail'}">签到</router-link>
                    </el-button>
                </header>
                <span>我已累计签到{{personSignNum}}天</span>
            </el-card>
            <div id="cal">
                <el-calendar v-model="value">
                </el-calendar>
            </div>
            <h2>签到排行榜</h2>
            <ul class="style">
                <li v-for="sign in users">
                    <p class="posted"><span>{{sign.userName}}</span>累计签到天数：{{sign.signNum}}</p>
                    <img src="../images/pic04.jpg" alt=""/>
                    <span>{{sign.userName}}</span>
                    <p class="text">{{sign.signature}}</p>
                </li>

            </ul>
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
                users: '',
                searchinput:''

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
            signOrder() {
                const _this = this
                _this.$axios.get("/signOrder").then(res => {
                    console.log('签到排行榜：', res)
                    _this.users = res.data.data

                })
            }
        },
        created() {
            this.getSignNum();
            this.signOrder()
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