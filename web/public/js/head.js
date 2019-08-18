new Vue({
    el: '#warpper',
    data: {
        scrollTag: false,
        currentUrl: 'index',
    },
    methods: {},
    created() {
        const url = window.location.pathname.substr(1)
        if (!url) {
            this.currentUrl = 'index'
        } else {
            this.currentUrl = url
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