<template>
    <div>
        <section>
            <header>
                <el-button type="primary"><router-link :to="{path:'signDetail'}">签到</router-link></el-button>
                <el-calendar v-model="value" id="cal">
                </el-calendar>

                <h2>签到排行榜</h2>
            </header>
            <ul class="style">
                <li>
                    <p class="posted">August 11, 2002 | (10 ) Comments</p>
                    <img src="../images/pic04.jpg" alt=""/>
                    <p class="text">Nullam non wisi a sem eleifend. Donec mattis libero eget
                        urna. Pellentesque viverra enim.</p>
                </li>
                <li>
                    <p class="posted">August 11, 2002 | (10 ) Comments</p>
                    <img src="../images/pic05.jpg" alt=""/>
                    <p class="text">Nullam non wisi a sem eleifend. Donec mattis libero eget
                        urna. Pellentesque viverra enim.</p>
                </li>
                <li>
                    <p class="posted">August 11, 2002 | (10 ) Comments</p>
                    <img src="../images/pic06.jpg" alt=""/>
                    <p class="text">Nullam non wisi a sem eleifend. Donec mattis libero eget
                        urna. Pellentesque viverra enim.</p>
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
                value: new Date()
            }
        },
    }
</script>

<style scoped>
   #cal{
       margin-bottom: 35px;
       box-shadow: 0 1px 3px #ccc;
       border: 1px solid #ededed;
   }
</style>