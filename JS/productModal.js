import config from "./config.js";

export default {
  template: '#productModalTemplate',
  data() {
    return {
      modal: '',
    };
  },
  props: ['tempProduct', 'isNew'],
  methods: {
    openModal() {
      this.modal.show()
    },
    updataProduct() {
      if(this.isNew === true){
        axios.post(`${config.api_url}/v2/api/${config.api_path}/admin/product`, {data: this.tempProduct})
        .then(res => {
          alert(res.data.message);
          this.modal.hide()
          this.$emit('get-products-data')
        })
        .catch(error =>{
          console.log(error);
        })
      } else if (this.isNew === false) {
        axios.put(`${config.api_url}/v2/api/${config.api_path}/admin/product/${this.tempProduct.id}`, {data: this.tempProduct})
        .then(res => {
          alert(res.data.message);
          this.modal.hide()
          this.$emit('get-products-data')
        })
        .catch(error =>{
          console.log(error);
        })
      }
    },
    creatImg() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('')
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.productModal);
  },
}