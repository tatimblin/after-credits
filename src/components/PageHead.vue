<script>
export default {
  name: 'page-head',
  props: ['title'],
  created() {
    document.title = this.title;
  },
  watch: {
    title() {
      document.title = this.title;
    }
  },
  render() {

  },
}
</script>
