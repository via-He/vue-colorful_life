<template>
        <div id="content" class="8u skel-cell-important">
            <section>
                <header>
                    <h2>完善资料</h2>
                    <span class="byline">世界因你而美丽，生活因你而精彩~</span>
                </header>
                <div style="margin: 20px 0;"></div>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="头像" prop="headImage">
                        <el-image v-if="ruleForm.headImage" shape="square" fit="cover" :size="100" style="width: 150px;height: 150px;" :src="'http://localhost:8880' + ruleForm.headImage"/>
                        <i v-else class="avatar-uploader-icon"></i>
                        <el-upload v-model="ruleForm.headImage"
                                   action="http://localhost:8880/upload"
                                   list-type="picture-card"
                                   :show-file-list="true"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload"
                        >
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <!--上传后回显图片-->
                                <el-image fit="cover" style="width: 150px;height: 150px;" class="el-upload-list__item-thumbnail"  :src="file.url" alt=""/>
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
                        <el-dialog :visible.sync="dialogVisible" >
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="用户名" prop="userName">
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
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
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
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(this.dialogImageUrl,'ddfffffffffffff')

            },
            handleAvatarSuccess(res) {
                // 把图片名给img
                this.ruleForm.headImage = res.data;
                console.log('上传后的图片地址',res.data)
                console.log('上传后的图片地址',this.ruleForm.userName)
            },
            beforeAvatarUpload(file) {
                // 设置限定格式
                const img_mimetype = ['image/jpeg','image/jpg','image/png']
                const isJPG =  img_mimetype.includes(file.type);
                // const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像只能是图片格式!');
                    return false;
                }
              /*  if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }*/
                return isJPG ;
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