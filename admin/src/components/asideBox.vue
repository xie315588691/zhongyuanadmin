<template>
    <el-menu :default-openeds="['1', '2']" router :default-active="$route.path">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>文章列表</template>
            <el-menu-item-group>
                <template slot="title">文章管理</template>
                <el-menu-item index="/article/list">文章列表</el-menu-item>
                <el-menu-item index="/article/add">添加文章</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <template slot="title">导航菜单</template>
                <el-menu-item index="/menu/list">菜单列表</el-menu-item>
                <el-menu-item index="/menu/add">添加菜单</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <template slot="title">轮播图</template>
                <el-menu-item index="/banner/list">轮播图列表</el-menu-item>
                <el-menu-item index="/banner/add">添加轮播图</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <template slot="title">留言管理</template>
                <el-menu-item index="/message/list">留言列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>网站设置</template>
            <el-menu-item-group>
                <el-menu-item index="/pageInfo">网站SEO</el-menu-item>
                <el-menu-item index="/personInfo">个人信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "aside"
    }
</script>

<style scoped>
    .el-aside {
        color: #333;
    }
</style>