<template>
  <div class="index">
    <!-- <swiper :list="banner_list" style="width:100%;" :aspect-ratio="300/800" dots-position="center"></swiper> -->
    <div>
     <tab :line-width=3 active-color='#20A0FF' v-model="swiper_index" class="toggle_tab">
      <tab-item class="vux-center" :selected="toggle_tab_active === item" v-for="item in toggle_tab_lists" @click="toggle_tab_active = item;">
        {{item}}
      </tab-item>
    </tab>
    <swiper v-model="swiper_index" :height="swiper_height" :show-dots="false">
      <swiper-item>
        <scroller lock-x scrollbar-y :height="swiper_height" ref="scroller" class="scroller_list">
          <div>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
            <section class="film-box">
              <div class="film-img">
                <img src="../../assets/logo.png" />
              </div>
              <div class="film-text">
                <div class="film-name">西游伏妖篇</div>
                <div class="film-star">
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_yes.png" />
                  <img src="../../assets/icno/star_no.png" />
                </div>
                <div class="film-director">导演：徐克</div>
                <div class="film-actors">主演：吴亦凡 林更新 姚晨</div>
              </div>
              <div class="film-btn">
                <div class="film-btn-box">
                  <x-button plain mini type="primary">影评</x-button>
                </div>
              </div>
            </section>
          </div>
        </scroller>
      </swiper-item>
      <swiper-item>
        456
      </swiper-item>
    </swiper>
    <tabbar class="menu_tab">
      <tabbar-item>
        <img slot="icon" src="../../assets/icno/film_blue.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../../assets/icno/classify_gray.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item show-dot selected link="/home">
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
  import { Tab, TabItem, Swiper, SwiperItem, Tabbar, TabbarItem, Flexbox, FlexboxItem, XButton, Scroller } from 'vux'

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
      Scroller
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
        swiper_height: '200px'
      }
    },
    mounted: function () {
      this.initSwiperScrollerHeight()
    },
    methods: {
      // 初始化swiper和scroller容器的高度
      initSwiperScrollerHeight () {
        let screenH = window.screen.height
        let toggleTabH = document.getElementsByClassName('toggle_tab')[0].getBoundingClientRect().height
        let menuTabH = document.getElementsByClassName('menu_tab')[0].getBoundingClientRect().height
        this.swiper_height = `${screenH - toggleTabH - menuTabH}px`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    width: 100%;
    height: 6rem;
    margin: .5rem auto 0 auto;
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
    width: 100%;
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
  .film-box .film-text .film-director,
  .film-box .film-text .film-actors{
    font-size: .8rem;
    color: #707070;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .weui_btn_plain_primary{
    color: #20A0FF;
    border: 1px solid #20A0FF;
  }
</style>
