<template>
    <div>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item @click="handleClearSession">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span @click="handleClearSession">退出</span>
        <span>Admain</span>
    </div>
</template>

<script>
    export default {
        name: "header",
        methods: {
            handleClearSession() {
                sessionStorage.clear()
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    span {
        margin-right: 10px;
        cursor: pointer;
    }
</style>