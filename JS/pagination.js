export default {
  template: '#pagination',
  props: ['pagination'],
  methods: {
    chagePage(page) {
      this.$emit('page-chage', page)
    }
  },
}