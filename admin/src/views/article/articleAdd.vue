<template>
    <div>
        <h3>{{id?'编辑':'添加'}}文章</h3>
        <el-form :label-position="labelPosition" :rules="rules" ref="article" label-width="80px" :model="article"
                 class="demo-ruleForm">

            <el-form-item label="栏目" prop="menu">
                <el-select v-model="article.menu" placeholder="请选择文章所属栏目">
                    <el-option :label="item.name" :value="item.id" v-for="item in menus" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="略缩图">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'uploads'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="article.imgurl" :src="article.imgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keywords">
                <el-input v-model="article.keywords"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="descript">
                <el-input type="textarea" v-model="article.descript"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="body">
                <vue-editor v-model="article.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getArticleSubmit('article')">{{id?'保存':'添加'}}文章</el-button>
                <el-button @click="resetForm('article')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from "vue2-editor";

    export default {
        name: "articleAdd",
        props: {
            id: {}
        },
        components: {
            VueEditor
        },
        data() {
            var checkNuLL = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户不能为空'));
                } else {
                    callback()
                }

            };
            return {
                labelPosition: 'right',
                menus: [],
                article: {
                    title: '',
                    keywords: '',
                    menu: '',
                    descript: '',
                    imgurl: '',
                    body: '',
                    createtime: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 100, message: '长度在 3 到 100个字符', trigger: 'blur'}
                    ],
                    keywords: [
                        {required: true, message: '请输入关键字', trigger: 'blur'},
                        {min: 3, max: 100, message: '长度在 3 到 100个字符', trigger: 'blur'}
                    ],
                    menu: [
                        {required: true, message: '请选择栏目', trigger: 'blur'},
                    ],
                    descript: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 3, max: 220, message: '长度在 3 到 200个字符', trigger: 'blur'}
                    ],
                    body: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                        {min: 100,  message: '文章最少在100字以上', trigger: 'blur'}
                    ]
                }
            };

        },
        created() {
            this.getMenus()
            if (this.id) {
                this.getArticleOne()
            }

        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.article.imgurl = file.response.urlPath;
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            getArticleSubmit(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.articleAdd()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            async getMenus() {

                const resu = await this.$http.get('menus')
                if (resu.status == 201) {
                    this.menus = resu.data
                } else {
                    this.$message.error('获取菜单失败');
                }
            },


            async articleAdd() {
                if (this.id) {
                    const resu = await this.$http.patch('articles/' + this.id, this.article)
                    if (resu.status == 200) {
                        this.$message({
                            message: '修改文章成功',
                            type: 'success'
                        });
                        this.$router.push('/article/list')
                    } else {
                        this.$message.error('修改文章失败');
                    }
                } else {
                    const resu = await this.$http.post('articles', this.article)
                    if (resu.status == 200) {
                        this.$message({
                            message: '文章添加成功',
                            type: 'success'
                        });
                        this.$router.push('/article/list')
                    } else {
                        this.$message.error('文章添加失败');
                    }
                }


            },

            async getArticleOne() {
                const resu = await this.$http.get('articles/' + this.id)
                if (resu.status == 200) {
                    this.article = resu.data[0];
                } else {
                    this.$message.error('获取文章失败');
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>