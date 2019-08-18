new Vue({
    el: "#warpper",
    data: {
        articles: [],
        currentPage: 1,
        totalPage: 10,
        pageSize: 16,
        scrollTag: false,
        currentUrl: 'index',
    },
    created() {
        this.getNews()
        const url = window.location.pathname.substr(1)
        if (!url) {
            this.currentUrl = 'index'
        } else {
            this.currentUrl = url
        }
    },
    methods: {
        async getNews() {
            const resu = await axios.post('/news', {
                currentPage: this.currentPage,
                pageSize: this.pageSize
            })
            if (resu.status == 200) {
                console.log(resu);
                this.articles = resu.data.resu
                this.totalPage = resu.data.total

            } else {
                alert("网页加载失败！")
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getNews()

        },
        async handleCurrentChange(val) {
            this.currentPage = val
            this.getNews()
        }
    },
    mounted() {
        let _this = this
        window.addEventListener('scroll', function () {
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            if (top == 0 || top < 0) {
                _this.scrollTag = false;
            } else {
                _this.scrollTag = true
            }

        })
    }

})