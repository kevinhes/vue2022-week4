import config from "./config.js";

export default {
  template: '#deleteModalTemplate',  
  data() {
    return {
      modal: '',
    };
  },
  props: ['tempProduct',],
  methods: {
    openModal() {
      this.modal.show()
    },
    deleteProduct() {
      axios.delete(`${config.api_url}/v2/api/${config.api_path}/admin/product/${this.tempProduct.id}`)
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
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.delProductModal);
  },
}