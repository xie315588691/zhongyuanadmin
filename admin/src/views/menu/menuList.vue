<template>
    <div>
        <h3>菜单列表</h3>
        <el-table
                ref="multipleTable"
                :data="menu"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
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
                    label="上级分类"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row.pid==0?'无上级分类': arr[scope.row.pid]}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="menuurl"
                    label="域名"
                    width="120">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click=" $router.push( '/menu/edit/'+scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete( scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menu: [],
                arr: {}
            }
        },
        created() {
            this.getMenus()
        },
        methods: {
            async getMenus() {
                const resu = await this.$http.get('menus')
                if (resu.status == 201) {
                    this.menu = resu.data
                    resu.data.forEach(item => {
                        this.arr[item.id] = item.name;
                    })
                } else {
                    this.$message.error('获取菜单失败');
                }
            },
            handleSelectionChange(val) {
                // this.multipleSelection = val;
            },
            async handleDelete(id) {
                const resu = await this.$http.delete('menus/' + id)
                if (resu.status == 201) {
                    this.$message({
                        message: '删除菜单列表成功',
                        type: 'success'
                    });
                    this.getMenus()
                } else {
                    this.$message.error('删除菜单失败');
                }

            },


        }
    }
</script>