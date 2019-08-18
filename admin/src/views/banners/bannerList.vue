<template>
    <div>
        <h3>轮播图列表</h3>
        <el-table
                ref="multipleTable"
                :data="banners"
                tooltip-effect="dark"
                style="width: 100%"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="名称"
                    prop="name"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="图片URL"
                    prop="bannerurl"
                    width="320">
            </el-table-column>
            <el-table-column label="图片地址"
                             width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.bannerurl" width="300">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="$router.push('/banner/edit/'+scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleBannerDelete(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "bannerList",
        data() {
            return {
                banners: []
            }
        },
        created() {
            this.getBanners()
        },
        methods: {
            async getBanners() {
                const resu = await this.$http.get('banners')
                if (resu.status == 200) {
                    this.banners = resu.data
                } else {
                    this.$message.error('获取轮播图失败');
                }
            },
            handleSelectionChange(el) {
                console.log(el);
            },
            async handleBannerDelete(id) {
                const resu = await this.$http.delete('banners/' + id)
                if (resu.status == 200) {
                    this.$message({
                        message: '删除菜单列表成功',
                        type: 'success'
                    });
                    this.getBanners()

                } else {
                    this.$message.error('删除轮播图失败');
                }
            }
        }
    }
</script>

<style scoped>

</style>