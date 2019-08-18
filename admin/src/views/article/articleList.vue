<template>
    <div>
        <!--        搜索-->
        <el-form :inline="true" :model="page" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="page.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="page.menu" placeholder="分类">
                    <el-option :label="item.name" :value="item.id" v-for="item in menus" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="articles">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column label="标题" width="500">
                <template slot-scope="scope">
                    <a :href="'http://www.qibaoying.com/news/'+scope.row.id" >{{scope.row.title }}</a>
                </template>
            </el-table-column>
            <el-table-column label="栏目" width="120">
                <template slot-scope="scope">
                    {{ arr[scope.row.menu ]}}
                </template>
            </el-table-column>
            <el-table-column label="发布时间">
                <template slot-scope="scope">
                    {{scope.row.createtime | dataFormat }}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click=" $router.push( '/article/edit/'+scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete( scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "articleList",
        data() {
            return {
                page: {
                    currentPage: 1,
                    total: 10,
                    pageSize: 10,
                    menu: '',
                    title: ''
                },
                articles: [],
                arr: {},
                article: {
                    menu: '',
                    title: ''
                },
                menus: []

            }
        },
        created() {
            this.getMenus()
            this.getArticle()
        },
        methods: {
            handleSizeChange(val) {
                this.page.pageSize = val
                this.getArticle()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val
                this.getArticle()
            },
            handleSelectionChange(val) {
                console.log(val);
                // this.page.pageSize = val
                // this.getArticle()
            },
            async getArticle() {
                const resu = await this.$http.post('articleList', this.page)

                if (resu.status == 200) {
                    this.articles = resu.data.resu
                    this.page.total = resu.data.total
                } else {
                    this.$message.error('文章列表获取失败');
                }
            },

            async getMenus() {
                const resu = await this.$http.get('menus')
                if (resu.status == 201) {
                    this.menus = resu.data
                    resu.data.forEach(item => {
                        this.arr[item.id] = item.name;
                    })

                } else {
                    this.$message.error('获取菜单失败');
                }
            },

            async handleDelete(id) {
                const resu = await this.$http.delete('/articles/' + id)
                if (resu.status == 200) {
                    this.$message({
                        message: '删除文章成功',
                        type: 'success'
                    });
                    this.getArticle()
                } else {
                    this.$message.error('删除文章失败');
                }

            },

            async onSubmit() {
                this.getArticle()
            }
        },

    }
</script>

<style scoped>
    .el-pagination {
        margin: 30px 0 50px;
    }
    .cell a{
        color: #000;
        text-decoration: none;
        font-weight: 700;
    }
</style>