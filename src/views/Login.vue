<template>
    <div class="content">
        <div class="form sign-in">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h2>欢迎回到<span class="font">多彩生活小站</span></h2>
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
<!--                <p class="forgot-pass"><a href="javascript:">忘记密码？</a></p>-->
                <el-form-item>
                    <el-button class="submit" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="button" class="fb-btn" @click="submitAdminForm('ruleForm')"><span>管理员登录</span></el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="sub-cont">
            <div class="img">
                <div class="img__text m--up">
                    <h2>还未注册？</h2>
                    <p>立即注册，发现大量机会！</p>
                </div>
                <div class="img__text m--in">
                    <h2>已有帐号？</h2>
                    <p>有帐号就登录吧，好久不见了！</p>
                </div>
                <div class="img__btn">
                    <span class="m--up">注 册</span>
                    <span class="m--in">登 录</span>
                </div>
            </div>
            <div class="form sign-up">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <h2>立即注册</h2>
                    <el-form-item label="账号" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit" @click="registerForm('ruleForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'

    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ]
                }
            };
        },
        mounted() {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'static/js/script.js';
            document.body.appendChild(s);
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/user/login", qs.stringify(this.ruleForm)).then(res => {
                            const userInfo = res.data.data
                            console.log(userInfo)
                            _this.$store.commit("SET_USERINFO", userInfo)
                            this.$router.push("/lifes")
                        })
                    }

                });
            },
            submitAdminForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/user/adminLogin", qs.stringify(this.ruleForm)).then(res => {
                            const userInfo = res.data.data
                            console.log(res)
                            _this.$store.commit("SET_USERINFO", userInfo)
                            console.log('管理员登录名', _this.$store.getters.getUser.userName)
                            this.$router.push("/admin")
                        })
                    }

                });
            },
            registerForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/user/register", qs.stringify(this.ruleForm)).then(res => {
                            const userInfo = res.data.data
                            console.log(res)
                            console.log(userInfo)
                            _this.$alert('注册成功，快去登录吧', '提示', {
                                confirmButtonText: '确定',
                            });
                        })
                    }
                });

            }
        }
    }

</script>

<style scoped>
    .content {
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 900px;
        height: 550px;
        margin: -300px 0 0 -450px;
        background: #fff;
    }
    .fb-btn {
        border: 2px solid #d3dae9;
        color: #8fa1c7;
    }
    .fb-btn span {
        font-weight: bold;
        color: #455a81;
    }
    .font{
        background: linear-gradient(to right, #E93E2A, blue, #43D3B4);
        -webkit-background-clip: text;
        color: transparent;
    }
    .form {
        position: relative;
        width: 640px;
        height: 100%;
        transition: -webkit-transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
        padding: 50px 30px 0;
    }
    .demo-ruleForm >>> .el-input{
        display: block;
        text-align: center;
        color: #909399;
        text-transform: uppercase;
    }
    .demo-ruleForm >>> .el-form-item{
        padding-top: 30px;

    }
    .demo-ruleForm >>> .el-button{
        display: block;
        margin: 0 auto;
        width: 400px;
        height: 40px;
        border-radius: 30px;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
    }
    .sign-in {
        transition-timing-function: ease-out;
    }

    .sign-up {
        -webkit-transform: translate3d(-900px, 0, 0);
        transform: translate3d(-900px, 0, 0);
    }

    .content.s--signup .sign-in {
        transition-timing-function: ease-in-out;
        transition-duration: 0.6s;
        -webkit-transform: translate3d(640px, 0, 0);
        transform: translate3d(640px, 0, 0);
    }

    .content.s--signup .sign-up {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    h2 {
        width: 100%;
        font-size: 26px;
        text-align: center;
    }

    .submit {
        margin-top: 40px;
        margin-bottom: 20px;
        background: #d4af7a;
        text-transform: uppercase;
    }

    .sub-cont {
        overflow: hidden;
        position: absolute;
        left: 640px;
        top: 0;
        width: 900px;
        height: 100%;
        padding-left: 260px;
        background: #fff;
        transition: -webkit-transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
    }
    .content.s--signup .sub-cont {
        -webkit-transform: translate3d(-640px, 0, 0);
        transform: translate3d(-640px, 0, 0);
    }
    .forgot-pass {
        margin-top: 15px;
        text-align: center;
        font-size: 12px;
        color: #cfcfcf;
    }

    .forgot-pass a {
        color: #cfcfcf;
    }

    .img {
        overflow: hidden;
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 260px;
        height: 100%;
        padding-top: 360px;
    }

    .img:before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 900px;
        height: 100%;
        background-image: url(../images/bg.jpg);
        background-size: cover;
        transition: -webkit-transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
    }

    .img:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }

    .img__text {
        z-index: 2;
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        padding: 0 20px;
        text-align: center;
        color: #fff;
        transition: -webkit-transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out;
        transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
    }

    .img__text h2 {
        margin-bottom: 10px;
        font-weight: normal;
    }

    .img__text p {
        font-size: 14px;
        line-height: 1.5;
    }

    .content.s--signup .img__text.m--up {
        -webkit-transform: translateX(520px);
        transform: translateX(520px);
    }

    .img__text.m--in {
        -webkit-transform: translateX(-520px);
        transform: translateX(-520px);
    }

    .content.s--signup .img__text.m--in {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }

    .img__btn {
        overflow: hidden;
        z-index: 2;
        position: relative;
        width: 100px;
        height: 36px;
        margin: 0 auto;
        background: transparent;
        color: #fff;
        text-transform: uppercase;
        font-size: 15px;
        cursor: pointer;
    }

    .img__btn:after {
        content: '';
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 30px;
    }

    .img__btn span {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: -webkit-transform 0.6s;
        transition: transform 0.6s;
        transition: transform 0.6s, -webkit-transform 0.6s;
    }

    .img__btn span.m--in {
        -webkit-transform: translateY(-72px);
        transform: translateY(-72px);
    }



    .content.s--signup .img__btn span.m--in {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    .content.s--signup .img__btn span.m--up {
        -webkit-transform: translateY(72px);
        transform: translateY(72px);
    }




    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
        background-color: #EDEDED !important;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .mlogo {
        height: 60%;
        margin-top: 1.5%;
    }

    .demo-ruleForm {
        max-width: 500px;
        margin-top: 20px;
    }
</style>