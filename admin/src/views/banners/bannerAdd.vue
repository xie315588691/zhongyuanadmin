<template>
    <div>
        <h3>{{id?'编辑':'添加'}}轮播图</h3>
        <el-form :label-position="labelPosition" label-width="80px" :model="banners">
            <el-form-item label="名称">
                <el-input v-model="banners.name"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'uploads'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="banners.bannerurl" :src="banners.bannerurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleBannerSave">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "bannerAdd",
        props: {
            id: {}
        },
        data() {
            return {
                labelPosition: 'right',
                banners: {
                    name: '',
                    bannerurl: ''
                }
            };
        },
        created() {
            if (this.id) {
                this.getBannerOne()
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.banners.bannerurl = file.response.urlPath;
            },
            async handleBannerSave() {
                if (this.id) {
                    const resu = await this.$http.patch('banners/' + this.banners.id, this.banners)
                    if (resu.status == 200) {
                        this.$message({
                            message: '修改轮播图成功',
                            type: 'success'
                        });
                        this.$router.push('/article/list')
                    } else {
                        this.$message.error('修改轮播图失败');
                    }
                } else {
                    const resu = await this.$http.post('banners', this.banners)
                    if (resu.status == 200) {
                        this.$message({
                            message: '添加轮播图成功',
                            type: 'success'
                        });
                        this.$router.push('/banner/list')
                    } else {
                        this.$message.error('添加轮播图失败');
                    }
                }

            },
            async getBannerOne() {
                const resu = await this.$http.get('banners/' + this.id)
                if (resu.status == 200) {
                    this.banners = resu.data[0]
                } else {
                    this.$message.error('获取轮播图失败');
                }
            }

        }


    }
</script>

<style scoped>

</style>