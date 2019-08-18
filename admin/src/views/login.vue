<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card" :model="user">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="用户名">
                    <el-input type="text" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        data() {
            return {
                labelPosition: 'right',
                user: {
                    username: '',
                    password: ''
                }

            }
        },
        methods: {
            async toLogin() {
                const resu = await this.$http.post('session', this.user)
                if (resu.status == 201) {
                    this.$message.error('账号/密码输入不正确');
                } else if (resu.status == 200) {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    sessionStorage.token = resu.data.token
                    this.$router.push('/')
                } else {

                }
            },
            getSubmit() {
                this.toLogin()
            }

        }

    }
</script>
<style>
    .login-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 10em;
    }

    .el-card__header {
        background-color: #efefef;
    }

    .login-card {
        width: 30em;
        margin: 0 auto;
    }

</style>
