<template>
    <div>
        <h3>网站SEO</h3>
        <el-form ref="form" :model="webseo" label-width="120px">
            <el-form-item label="网站标题">
                <el-input v-model="webseo.title"></el-input>
            </el-form-item>
            <el-form-item label="网站关键字">
                <el-input v-model="webseo.keywords"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
                <el-input type="textarea" v-model="webseo.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSeoSubmit">修改</el-button>
                <el-button @click="handleToIndex">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "webseo",
        data() {
            return {
                webseo: {
                    title: '',
                    keywords: '',
                    description: ''
                }
            }
        },
        created() {

            this.getWebSeo()
        },
        methods: {
            async handleSeoSubmit() {
                const resu = await this.$http.patch('webseo', this.webseo)
                console.log(resu);
                if (resu.status == 200) {
                    this.$message({
                        message: '网站seo修改成功',
                        type: 'success'
                    });
                    this.$router.push('/pageInfo')
                } else {
                    this.$message.error('网站seo修改失败');
                }
            },
            async getWebSeo() {
                const resu = await this.$http.get('webseo')
                if (resu.status == 200) {
                    this.webseo = resu.data[0]
                } else {
                    this.$message.error('获取seo失败');
                }
            },
            handleToIndex(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>