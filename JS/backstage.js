import config from "./config.js";

const app = Vue.createApp({
  data() {
    return {
      productsData: [],
      pagination:{}
    };
  },
  methods: {
    loginCheck() {
      axios.post(`${config.api_url}/v2/api/user/check`)
        .then((res) => {
          console.log(res);
            this.getProductsData()
        })
        .catch( error => {
          alert(error.data.message)
            window.location = './index.html'
        })
    },
    getProductsData() {
      axios.get(`${config.api_url}/v2/api/${config.api_path}/admin/products`)
        .then(res => {
          this.productsData = res.data.products;
          this.pagination = res.data.pagination
        })
    },
  },
  mounted() {
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.loginCheck()
  },
})

app.mount('#app')