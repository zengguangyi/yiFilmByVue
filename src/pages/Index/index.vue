<template>
  <div class="index">
    <loading v-model="is_uninit" text="加载中"></loading>
    <div>
     <tab :line-width=3 active-color='#20A0FF' v-model="swiper_index" class="toggle_tab">
      <tab-item class="vux-center" :selected="toggle_tab_active === item" v-for="item in toggle_tab_lists" @click="toggle_tab_active = item;">
        {{item}}
      </tab-item>
    </tab>
    <div v-show="swiper_index === 0">
      <swiper :list="banner_list" style="width:100%;" :auto="true" :interval="5000" :loop="true" :aspect-ratio="300/800" dots-position="center"></swiper>
      <router-link :to="{path:'movie',query:{id: item.id}}" v-for="item in film_data.subjects" :id="item.id">
        <section class="film-box">
          <div class="film-img">
            <img :src="item.images.large" />
          </div>
          <div class="film-text">
            <div class="film-name">{{ item.title }}</div>
            <div class="film-star">
              <img v-for="yes in Math.floor(item.rating.stars / 10)" src="../../assets/icno/star_yes.png" />
              <img v-for="half in (5 - Math.floor(item.rating.stars / 10) - Math.floor((50 - item.rating.stars) / 10))" src="../../assets/icno/star_half.png" />
              <img v-for="no in Math.floor((50 - item.rating.stars) / 10)" src="../../assets/icno/star_no.png" />
              <span class="film-average">{{ item.rating.average.toFixed(1) }}</span>
            </div>
            <div class="film-director">导演：<span v-for="director in item.directors">{{ director.name }} </span></div>
            <div class="film-actors">主演：<span v-for="cast in item.casts">{{ cast.name }} </span></div>
          </div>
          <div class="film-btn">
            <div class="film-btn-box">
              <x-button plain mini type="primary" class="primary_btn">详情</x-button>
            </div>
          </div>
        </section>
      </router-link>
      <div class="blank"></div>
    </div>
    <div v-show="swiper_index === 1">
      <router-link :to="{path:'movie',query:{id: item.id}}" v-for="item in coming_soon_data.subjects">
        <section class="film-box">
          <div class="film-img">
            <img :src="item.images.small" />
          </div>
          <div class="film-text">
            <div class="film-name">{{ item.title }}</div>
            <div class="film-star">
              <img v-for="yes in Math.floor(item.rating.stars / 10)" src="../../assets/icno/star_yes.png" />
              <img v-for="half in (5 - Math.floor(item.rating.stars / 10) - Math.floor((50 - item.rating.stars) / 10))" src="../../assets/icno/star_half.png" />
              <img v-for="no in Math.floor((50 - item.rating.stars) / 10)" src="../../assets/icno/star_no.png" />
              <span class="film-average">{{ item.rating.average.toFixed(1) }}</span>
            </div>
            <div class="film-director">导演：<span v-for="director in item.directors">{{ director.name }} </span></div>
            <div class="film-actors">主演：<span v-for="cast in item.casts">{{ cast.name }} </span></div>
          </div>
          <div class="film-btn">
            <div class="film-btn-box">
              <x-button plain mini type="primary" class="want_btn">想看</x-button>
            </div>
          </div>
        </section>
      </router-link>
      <div class="blank"></div>
    </div>
    <tabbar class="menu_tab">
      <tabbar-item selected>
        <img slot="icon" src="../../assets/icno/film_blue.png">
        <span slot="label">热映</span>
      </tabbar-item>
      <tabbar-item show-dot link="/home?id=1">
        <img slot="icon" src="../../assets/icno/find_gray.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item show-dot icon-class="tabbar-text">
        <img slot="icon" src="../../assets/icno/mine_gray.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</div>
</template>

<script>
  import { Tab, TabItem, Tabbar, TabbarItem, Swiper, XButton, LoadMore, Loading, Card } from 'vux'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    components: {
      Tab,
      TabItem,
      Tabbar,
      TabbarItem,
      Swiper,
      XButton,
      LoadMore,
      Loading,
      Card
    },
    data () {
      return {
        // 广告轮播列表
        banner_list: [
        {url: 'javascript:', img: 'http://img5.mtime.cn/mg/2017/02/24/162949.56618381.jpg'},
        {url: 'javascript:', img: 'http://img5.mtime.cn/mg/2017/02/22/161024.35596382.jpg'},
        {url: 'javascript:', img: 'http://img5.mtime.cn/mg/2017/02/25/095830.58062869.jpg'}
        ],
        // 切换选项卡
        toggle_tab_lists: ['正在上映', '即将上映'],
        toggle_tab_active: '正在上映',
        // swiper滑动页
        swiper_index: 0,
        // 电影数据
        film_data: {},
        // 即将上映电影数据
        coming_soon_data: {},
        // 是否初始化数据
        is_uninit: true,
        is_coming_init: false,
        // 本地后台
        localhost: '/local'
      }
    },
    mounted: function () {
      // this.initSwiperScrollerHeight()
      this.initFilmData()
      // 测试本地后台连接
      // this.$http.get(`${this.localhost}/api/user/getUser`).then(response => {
      //   console.log(response.body)
      // }, error => {
      //   console.log(error)
      // })
    },
    watch: {
      /**
      * 监听swiper_index变化为'即将上映'tab时，请求推荐电影数据
      */
      swiper_index: function (val) {
        // 若未曾加载过 (is_coming_init = false)
        if (val === 1 && !this.is_coming_init) {
          this.is_uninit = true
          // 请求
          this.comingSoonData()
        }
      }
    },
    // computed: mapGetters([
    //   'evenOrOdd'
    // ]),
    methods: {
      /**
      * vuex传递参数
      */
      // toMovieDetail (ID) {
      //   this.$store.dispatch('sendMovieID', {
      //     movieID: ID
      //   })
      // },
      /**
      * 初始化数据
      */
      initFilmData () {
        this.$http.get('/douban/v2/movie/in_theaters').then(response => {
          this.film_data = response.body
          this.is_uninit = false
        }, error => {
          console.log(error)
        })
      },
      comingSoonData () {
        this.$http.get('/douban/v2/movie/coming_soon').then(response => {
          this.coming_soon_data = response.body
          this.is_uninit = false
          // 成功加载过的标志
          this.is_coming_init = true
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toggle_tab{
    width: 95%;
    margin: 0 auto;
  }
  .menu_tab{
    max-width: 640px;
    margin: 0 auto;
  }
  .weui_tabbar{
    position: fixed;
  } 
  .weui_tabbar_item{
    height: 48px;
    text-decoration: none;
  }
  .film-box,
  .film-box .film-img,
  .film-box .film-text,
  .film-box .film-btn{
    display: flex;
    display: -webkit-flex;
  }
  .film-box{
    width: 95%;
    height: 6rem;
    margin: 1rem auto .2rem auto;
    padding: .5rem 0 .2rem 0;
    border-top: 1px solid #e6e6e6;
    /*background-color: #20A0FF;*/
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .film-box .film-img{
    width: 20%;
    height: 90%;
    /*background-color: #F7BA2A;*/
    flex-direction: row;
    justify-content: center;
  }
  .film-box .film-text{
    width: 45%;
    height: 90%;
    /*background-color: #13CE66;*/
    flex-direction: column;
    justify-content: space-between;
  }
  .film-box .film-btn{
    width: 25%;
    height: 90%;
    /*background-color: #F7BA2A;*/
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .film-box .film-img img{
    /*width: 100%;*/
    max-height: 6rem;
  }
  .film-box .film-text .film-name{
    font-size: .9rem;
    color: #000;
  }
  .film-box .film-text .film-star img{
    width: 1rem;
    height: 1rem;
  }
  .film-box .film-text .film-star .film-average{
    font-size: .8rem;
    color: #ffc107;
  }
  .film-box .film-text .film-director,
  .film-box .film-text .film-actors{
    font-size: .8rem;
    color: #707070;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  /*列表按钮*/
  .primary_btn{
    color: #1D8CE0;
    border: 1px solid #1D8CE0;
  }
  .want_btn{
    color: #FF4949;
    border: 1px solid #FF4949;
  }
  /*底部空白*/
  .blank{
    height: 62px;
  }
</style>
