<template>
        <div id="content" class="8u skel-cell-important">
            <section>
                <header>
                    <h2>今日签到</h2>
                    <span class="byline">Integer sit amet pede vel arcu aliquet pretium</span>
                </header>
                <div style="margin: 20px 0;"></div>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName" maxlength="10" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="headImage">
                        <el-input v-model="ruleForm.headImage"></el-input>
                    </el-form-item>

                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" v-model="ruleForm.headImage"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即签到</el-button>
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


                ruleForm: {
                    userName: 'this.$store.getters.userName',
                    headImage: '',
                    sex:'',
                    signature:''

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
            }
        },
        methods: {
            getUserData(id){

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
        created() {
            this.ruleForm.userName = this.$store.getters.userName;
            this.ruleForm.headImage = this.$store.getters.headImage;
            this.ruleForm.sex = this.$store.getters.sex;
            this.ruleForm.signature = this.$store.getters.signature;

        }
    }
</script>

<style scoped>

</style>