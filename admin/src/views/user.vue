<template>
    <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldpass">
            <el-input type="password" v-model="user.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="user.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('user')">提交</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        data() {
            var checkNuLL = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户不能为空'));
                } else {
                    callback()
                }

            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.checkPass !== '') {
                        this.$refs.user.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: {
                    name: '',
                    pass: '',
                    checkPass: '',
                    oldpass: ''
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    name: [
                        {validator: checkNuLL, trigger: 'blur'}
                    ],
                    oldpass: [
                        {validator: checkNuLL, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changePsd()

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async changePsd() {
                const resu = await this.$http.post('/userEdit', this.user)
                if (resu.status == 201) {
                    this.$message.error('账号/密码输入不正确');
                } else if (resu.status == 200) {
                    this.$message({
                        message: '密码修改成功',
                        type: 'success'
                    });
                    this.resetForm('user')
                } else {
                    this.$message.error('您的操作不正确');
                }
            }
        }
    }
</script>

<style scoped>

</style>