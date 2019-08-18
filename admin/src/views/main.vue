<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <asideBox></asideBox>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <headerBox></headerBox>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
    import asideBox from '../components/asideBox.vue'
    import headerBox from '../components/header.vue'

    export default {
        components: {
            asideBox,
            headerBox
        }
    };
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

</style>