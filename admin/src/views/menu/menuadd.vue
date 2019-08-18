<template>
    <div>
        <h3>{{id?'编辑':'添加'}}菜单</h3>
        <el-form :label-position="labelPosition" label-width="80px" :model="menu">
            <el-form-item label="上级菜单">
                <el-select v-model="menu.pid" placeholder="请选择上级菜单">
                    <el-option :label="item.name" :value="item.id" v-for="item in menuList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="menu.name"></el-input>
            </el-form-item>
            <el-form-item label="域名">
                <el-input v-model="menu.menuurl"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="menuAdd">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        name: "menuadd",
        data() {
            return {
                labelPosition: 'right',
                menu: {
                    name: '',
                    menuurl: '',
                    pid: ''
                },
                menuList: []

            };
        },
        created() {
            this.getMenus()
            if (this.id) {
                this.getMenuOne()
            }

        },
        methods: {
            async menuAdd() {
                if (this.menu.id) {
                    const resu = await this.$http.patch('menus/' + this.id, this.menu)
                    if (resu.status == 201) {
                        this.$message({
                            message: '修改菜单列表成功',
                            type: 'success'
                        });
                        this.$router.push('/menu/list')
                    } else {
                        this.$message.error('修改菜单列表失败');
                    }
                } else {
                    const resu = await this.$http.post('menus', this.menu)
                    if (resu.status == 201) {
                        this.$message({
                            message: '添加菜单列表成功',
                            type: 'success'
                        });
                        this.$router.push('/menu/list')
                    } else {
                        this.$message.error('添加菜单列表失败');
                    }
                }

            },
            async getMenuOne() {
                const resu = await this.$http.get('menus/' + this.id)
                if (resu.status == 201) {
                    this.menu = resu.data[0];
                } else {
                    this.$message.error('获取菜单失败');
                }
            },
            async getMenus() {
                const resu = await this.$http.get('menus')
                if (resu.status == 201) {
                    this.menuList = resu.data
                } else {
                    this.$message.error('获取分类失败');
                }
            }

        }
    }
</script>

<style scoped>

</style>