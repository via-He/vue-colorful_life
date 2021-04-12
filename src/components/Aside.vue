<template>
    <div>
        <section>
            <header>
                <el-button type="primary"><router-link :to="{path:'signDetail'}">签到</router-link></el-button>
                <span>我已累计签到{{personSignNum}}天</span>
                <div id="cal">
                    <el-calendar v-model="value">
                    </el-calendar>
                </div>
                <h2>签到排行榜</h2>
            </header>
            <ul class="style">
                <li v-for="sign in users">
                    <p class="posted"><span>{{sign.userName}}</span>累计签到天数：{{sign.signNum}}</p>
                    <img src="../images/pic04.jpg" alt=""/>
                    <span >{{sign.userName}}</span>
                    <p class="text">{{sign.signature}}</p>
                </li>

            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        data(){
            return {
                value: new Date(),
                personSignNum:'',
                users:'',


            }
        },
        methods:{
            getSignNum(){
                const _this = this
                _this.$axios.get("/sign/signNum").then(res =>{
                    console.log(res)
                    _this.personSignNum = res.data.data
                })
            },
            signOrder(){
                const _this = this
                _this.$axios.get("/signOrder").then(res =>{
                    console.log(res)
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
   #cal{
       margin-top: 30px;
       margin-bottom: 30px;
       padding-bottom: 10px;
       box-shadow: 0 1px 3px #ccc;
       border: 1px solid #ededed;
   }
   #cal >>>.el-calendar-table .el-calendar-day {
       height: 30px !important;

   }
</style>