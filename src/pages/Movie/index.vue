<template>
	<div class="movie">
    <loading v-model="is_uninit" text="加载中"></loading>
    <article v-if="!is_uninit">
      <section class="movie-header light-blue-bg">
        <div class="header-l">
          <img :src="movie_data.images.medium" />
        </div>
        <div class="header-r light-gray">
          <p class="header-font white">{{ movie_data.title }}</p>
          <p class="star-yellow">{{ movie_data.wish_count }}人想看</p>
          <p><span v-for="genre in movie_data.genres">{{ genre }} </span></p>
          <p><span v-for="country in movie_data.countries">{{ country }} </span></p>
          <p class="header-star">
            <img v-for="yes in Math.floor(movie_data.rating.stars / 10)" src="../../assets/icno/star_yes.png" />
            <img v-for="half in (5 - Math.floor(movie_data.rating.stars / 10) - Math.floor((50 - movie_data.rating.stars) / 10))" src="../../assets/icno/star_half.png" />
            <img v-for="no in Math.floor((50 - movie_data.rating.stars) / 10)" src="../../assets/icno/star_no.png" /><span class="star-yellow">{{ movie_data.rating.average }}</span>
          </p>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
  import { Loading } from 'vux'
  export default {
    name: 'movie',
    components: {
      Loading
    },
    data () {
      return {
        id: this.$route.query.id,
        movie_data: {},
        is_uninit: true
      }
    },
    mounted: function () {
      console.log(this.id)
      this.initData()
    },
    methods: {
      initData () {
        this.$http.get(`/douban/v2/movie/subject/${this.id}`).then(response => {
          this.movie_data = response.body
          console.log(this.movie_data)
          this.is_uninit = false
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .movie-header,
  .header-l,
  .header-r,
  .header-star
  {
    display: flex;
    display: -webkit-flex;
  }
  /*header*/
  .movie-header{
    width: 100%;
    height: 8rem;
    padding-top: 1rem;
    overflow: hidden;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
  }
  .header-l{
    width: 38%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .header-l img{
    max-height: 92%;
  }
  .header-r{
    width: 60%;
    height: 100%;
    font-size: .8rem;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  .header-font{
    font-size: 1rem;
  }
  .header-star{
    margin: 1rem 0 .2rem 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .header-star span{
    margin-left: .5rem;
    font-size: 1.5rem;
  }
  .header-star img{
    width: 1rem;
    height: 1rem;
  }
</style>
