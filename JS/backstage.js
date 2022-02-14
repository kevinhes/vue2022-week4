import config from "./config.js";
import productModal from "./productModal.js";
import deleteModal from "./deletemodal.js";
import pagination from "./pagination.js";

const app = Vue.createApp({
  data() {
    return {
      productsData: [],
      pagination:{},
      isNew: false,
      tempProduct: {},
    };
  },
  components: {
    productModal,
    deleteModal,
    pagination,
  },
  methods: {
    loginCheck() {
      axios.post(`${config.api_url}/v2/api/user/check`)
        .then((res) => {
            this.getProductsData()
        })
        .catch( error => {
          alert(error.data.message)
          window.location = './index.html'
        })
    },
    getProductsData(page = 1) {
      axios.get(`${config.api_url}/v2/api/${config.api_path}/admin/products/?page=${page}`)
        .then(res => {
          this.productsData = res.data.products;
          this.pagination = res.data.pagination
        })
    },
    openModal(status, product) {
      if(status === 'new'){
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        this.$refs.refProductModal.openModal()
      } else if (status === 'edit'){
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.refProductModal.openModal()
      } else {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.refDeleteModal.openModal()
      }
    }
  },
  mounted() {
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.loginCheck()
  },
})

app.mount('#app')