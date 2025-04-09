<template>
    <div class="login-wrapper">
        <div class="login-form">
            <div class="title">express后台管理系统</div>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { loginUser } from '@/api/user'
import { setStore } from '@/utils/storage'
export default {
    data(){
        return{
            form: {
                username: 'admin',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        submitLogin(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    loginUser(this.form).then(res => {
                        if(res.code === 200){
                            setStore('token',res.token)
                            setStore('userInfo', res.data)
                            this.$message.success(res.msg)
                            this.$router.push('/')
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
    position: relative;
    background: url(~@/assets/images/login_bg.png) center;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .login-form{
        padding: 200px 100px;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        .title{
            font-size: 30px;
            margin-bottom: 50px;
        }
        .el-button{
            width: 100%;
        }
    }
}
</style>