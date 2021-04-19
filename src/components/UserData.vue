<template>
        <div id="content" class="8u skel-cell-important">
            <section>
                <header>
                    <h2>完善资料</h2>
                    <span class="byline">Integer sit amet pede vel arcu aliquet pretium</span>
                </header>
                <div style="margin: 20px 0;"></div>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
<!--                        <ul v-if='flag'><input v-model="ruleForm.userName" maxlength="10" type="text" disabled/><span @click='edit()'><i class="el-icon-edit"></i></span></ul>-->
<!--                    <el-input v-model="ruleForm.userName" maxlength="10" type="text" v-else @change='input()'/>-->
                    <el-input v-model="ruleForm.userName" maxlength="10" type="text"/>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                        <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item label="签名" prop="signature">
                        <el-input v-model="ruleForm.signature" maxlength="50" type="text"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </div>
</template>

<script>
    import qs from "qs";

    export default {
        name: "UserData",
        data() {


            return {
                flag:true,
                ruleForm: {
                    sex:''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名 ', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    signature: [
                        {required: true, message: '请输入签名', trigger: 'blur'},
                        {min: 1, max: 500, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            getUserData(){
                const _this = this
                _this.ruleForm = this.$store.getters.getUser
                console.log( _this.ruleForm)
                console.log( _this.ruleForm.userName)
                console.log( _this.ruleForm.sex)
            },
            edit(){
                this.flag = false
            },
            input(){
                this.flag = true
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        const _this = this
                        _this.$axios.post('/user/update', this.ruleForm).then(res => {
                            console.log(res)
                            _this.$alert('已修改，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/login")
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
        created() {
            this.getUserData()

        }
    }
</script>

<style scoped>

</style>