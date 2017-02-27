<template>
	<div>
   id:{{ $route.query.id }}
 </div>
</template>
<script>
  export default {
    name: 'movie',
    data () {
      return {
        id: ''
      }
    },
    created: function () {
      this.id = this.$route.query.id
      console.log(this.id)
    },
    mounted: function () {
      this.initData()
    },
    methods: {
      initData () {
        this.$http.get(`/douban/v2/movie/subject/${this.id}`).then(response => {
          console.log(response.body)
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="less">
</style>
