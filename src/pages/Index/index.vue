<template>
  <div class="index">
    <!-- <swiper :list="banner_list" style="width:100%;" :aspect-ratio="300/800" dots-position="center"></swiper> -->
    <loading v-model="is_uninit" text="加载中"></loading>
    <div>
     <tab :line-width=3 active-color='#20A0FF' v-model="swiper_index" class="toggle_tab">
      <tab-item class="vux-center" :selected="toggle_tab_active === item" v-for="item in toggle_tab_lists" @click="toggle_tab_active = item;">
        {{item}}
      </tab-item>
    </tab>
    <swiper v-model="swiper_index" :threshold="100" :height="swiper_height" :show-dots="false">
      <swiper-item>
        <scroller lock-x scrollbar-y :height="swiper_height" ref="scroller" :use-pullup="true" :pullup-config="pullup_opt" @on-pullup-loading="pullup" class="scroller_list">
          <div>
            <section class="film-box" v-for="item in film_data.subjects">
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
                  <x-button plain mini type="primary" class="primary_btn" v-if="!item.flag">影评</x-button>
                  <x-button plain mini type="primary" class="want_btn" v-else-if="item.flag === 'coming_soon'">想看</x-button>
                </div>
              </div>
            </section>
            <load-more v-if="is_pullup"></load-more>
            <load-more v-if="is_no_data" :show-loading="false" background-color="#fbf9fe"></load-more>
          </div>
        </scroller>
      </swiper-item>
      <swiper-item>
        456
      </swiper-item>
    </swiper>
    <tabbar class="menu_tab">
      <tabbar-item selected>
        <img slot="icon" src="../../assets/icno/film_blue.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../../assets/icno/classify_gray.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item show-dot link="/home">
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
  import { Tab, TabItem, Swiper, SwiperItem, Tabbar, TabbarItem, Flexbox, FlexboxItem, XButton, Scroller, LoadMore, Loading } from 'vux'

  export default {
    name: 'index',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Tabbar,
      TabbarItem,
      Flexbox,
      FlexboxItem,
      XButton,
      Scroller,
      LoadMore,
      Loading
    },
    data () {
      return {
        // 广告轮播列表
        banner_list: [
        {url: 'javascript:', img: 'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff'},
        {url: 'javascript:', img: 'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff'},
        {url: 'javascript:', img: 'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'}
        ],
        // 切换选项卡
        toggle_tab_lists: ['正在上映', '热门推荐'],
        toggle_tab_active: '正在上映',
        // swiper滑动页
        swiper_index: 0,
        // 默认swiper和scroller容器的高度
        swiper_height: '200px',
        // 上拉组件配置
        pullup_opt: {
          content: '',
          pullUpHeight: 200,
          height: 60,
          autoRefresh: false,
          downContent: '',
          upContent: '',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        // 电影数据
        film_data: {},
        // 是否初始化数据
        is_uninit: true,
        // 是否上拉动作
        is_pullup: false,
        // 是否已无加载数据
        is_no_data: false,
        // 是否加载完 即将上映
        is_coming_done: false
      }
    },
    mounted: function () {
      this.initSwiperScrollerHeight()
      this.initFilmData()
    },
    methods: {
      // 初始化swiper和scroller容器的高度
      initSwiperScrollerHeight () {
        let screenH = window.screen.height
        let toggleTabH = document.getElementsByClassName('toggle_tab')[0].getBoundingClientRect().height
        let menuTabH = document.getElementsByClassName('menu_tab')[0].getBoundingClientRect().height
        this.swiper_height = `${screenH - toggleTabH - menuTabH}px`
      },
      /**
      * 初始化数据
      */
      initFilmData () {
        this.$http.get('/douban/v2/movie/in_theaters').then(response => {
          this.film_data = response.body
          // scroller容器重载数据
          this.$nextTick(() => {
            this.$refs.scroller.reset({
              top: 0
            })
          })
          this.is_uninit = false
        }, error => {
          console.log(error)
        })
      },
      /**
      * 滚动
      */
      scroll () {
        console.log('scroll')
      },
      /**
      * 上拉刷新
      */
      pullup () {
        this.is_pullup = true
        if (!this.is_coming_done) {
          console.log('pullup')
          this.$http.get('/douban/v2/movie/coming_soon').then(response => {
            let data = response.body.subjects
            // 为data添加标记为'coming_soon'
            for (let item of data) {
              item.flag = 'coming_soon'
            }
            // 拼接数据
            this.film_data.subjects = this.film_data.subjects.concat(response.body.subjects)
            // scroller容器增加数据
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
            this.$refs.scroller.donePullup()
            // 设置 是否加载完即将上映 标志位is_coming_done
            this.is_coming_done = true
            this.is_pullup = false
          }, error => {
            console.log(error)
          })
        } else {
          // 加载完即将上映部分则禁用Pullup
          // this.$nextTick(() => {
          //   this.$refs.scroller.disablePullup()
          // })
          let that = this
          setTimeout(function () {
            that.is_pullup = false
            that.is_no_data = true
          }, 1000)
        }
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
</style>
