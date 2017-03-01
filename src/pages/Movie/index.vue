<template>
	<div class="movie dark-white-bg">
    <loading v-model="is_uninit" text="加载中"></loading>
    <article v-if="!is_uninit">
      <section class="movie-header light-blue-bg">
        <div class="header-l">
          <img :src="movie_data.images.large" />
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
      <section class="movie-summary white-bg black">
        <div :class="[summary_hide ? 'summary-ctx-hide' : 'summary-ctx']">
          {{ movie_data.summary }}
        </div>
        <div class="summary-footer blue" @click="summary_hide = !summary_hide">
          {{ summary_hide ? '展开':'收起'}}
        </div>
      </section>
      <section class="actors white-bg">
        <div class="actors-header">演职人员</div>
        <scroller lock-y :scrollbar-x="false">
          <div class="actors-scroller" :style="{ width:actors_scroller + 'rem' }">
            <div class="actors-lists black directors" v-for="director in movie_data.directors">
              <img :src="director.avatars.large" />
              <div class="list-text">
                <p>{{ director.name }}</p>
                <p>导演</p>
              </div>
            </div>
            <div class="actors-lists black cast" v-for="cast in movie_data.casts">
              <img :src="cast.avatars.large" />
              <div class="list-text">
                <p>{{ cast.name }}</p>
                <p>主演</p>
              </div>
            </div>
            <!-- <div class="actors-lists" style="display:inline-block;" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div> -->
          </div>
        </scroller>
      </section>
      <section class="white-bg">
        <p>hahahahha</p>
        <p>hahahahha</p>
        <p>hahahahha</p>
      </section>
    </article>
  </div>
</template>
<script>
  import { Loading, Scroller } from 'vux'
  export default {
    name: 'movie',
    components: {
      Loading,
      Scroller
    },
    data () {
      return {
        id: this.$route.query.id,
        movie_data: {},
        // 是否初始化数据（请求完movie_data）
        is_uninit: true,
        // summary是否收起
        summary_hide: true
      }
    },
    mounted: function () {
      console.log(this.id)
      this.initData()
    },
    computed: {
      // actors-scroller容器的宽度 length*6.2 rem
      actors_scroller () {
        return (this.movie_data.directors.length + this.movie_data.casts.length) * 6.2
      }
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
  .header-star,
  .actors-lists
  {
    display: flex;
    display: -webkit-flex;
  }
  /*header*/
  .movie-header{
    width: 100%;
    height: 9rem;
    padding-top: 1rem;
    overflow: hidden;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
  }
  .header-l{
    width: 46%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .header-l img{
    max-height: 100%;
  }
  .header-r{
    width: 55%;
    height: 100%;
    font-size: .8rem;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  .header-font{
    font-size: 1.1rem;
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
  /*summary*/
  .movie-summary{
    font-size: 1rem;
    padding: 1.5rem 1rem 1rem 1rem;
    margin-bottom: .5rem;
  }
  .movie-summary .summary-ctx{
    line-height: 1.5rem;
    min-height: 7.5rem;
  }
  .movie-summary .summary-ctx-hide{
    line-height: 1.5rem;
    height: 6rem;
    overflow: hidden;
  }
  .movie-summary .summary-footer{
    text-align: center;
    padding-top: .6rem;
  }
  /*actors scroller*/
  .actors{
    padding: 1rem;
    margin-bottom: .5rem;
  }
  .actors-header{
    font-size: 1rem;
    font-weight: 600;
    padding-bottom: .5rem;
  }
  .scroller{
    /*width: 500px;*/
  }
  .actors-lists{
    width: 6rem;
    height: 11.5rem;
    margin-right: .2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    float: left;
  }
  .actors-lists .list-text{
    width: 100%;
    font-size: .8rem;
    text-align: center;
  }
  .actors-lists p{
    width: 100%;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .actors-lists img{
    width: 100%;
    max-height: 8.5rem;
  }
</style>
