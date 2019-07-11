<template>
  <div class="big">
    <div class="tabbar_btn">
      <mt-navbar v-model="selected" :class="isfixed?'top_fixed':''">
        <mt-tab-item id="detail" class="top_list">详情描述</mt-tab-item>
        <mt-tab-item id="shop" class="top_list">规格参数</mt-tab-item>
        <mt-tab-item id="sale" class="top_list">物流与售后</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="detail">
        <ul>
          <li>
            <img src="../../../assets/show/details_1.jpg" alt="">
            <img src="../../../assets/show/details_2.jpg" alt="">
            <img src="../../../assets/show/details_3.jpg" alt="">
            <img src="../../../assets/show/details_4.jpg" alt="">
            <img src="../../../assets/show/details_5.jpg" alt="">
            <img src="../../../assets/show/details_6.jpg" alt="">
            <img src="../../../assets/show/details_7.jpg" alt="">
            <img src="../../../assets/show/details_8.jpg" alt="">
            <img src="../../../assets/show/details_9.jpg" alt="">
            <img src="../../../assets/show/details_10.jpg" alt="">
            <img src="../../../assets/show/details_11.jpg" alt="">
            <img src="../../../assets/show/details_12.jpg" alt="">
            <img src="../../../assets/show/details_13.jpg" alt="">
            <img src="../../../assets/show/details_14.jpg" alt="">
            <img src="../../../assets/show/details_15.jpg" alt="">
            <img src="../../../assets/show/details_16.jpg" alt="">
            <img src="../../../assets/show/details_17.jpg" alt="">
            <img src="../../../assets/show/details_18.jpg" alt="">
            <img src="../../../assets/show/details_19.jpg" alt="">
            <img src="../../../assets/show/details_20.jpg" alt="">
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="shop">
        <div class="shop_de">
          <ul>
            <li class="li_style"></li>
            <li><span>品牌：</span><div><span style="font-size:14px;">天岸创奇文化创意</span></div></li>
            <li class="li_style"></li>
            <li><span>上架日期：</span><div><span style="font-size:14px;">2019年4月18日</span></div></li>
            <li class="li_style"></li>
            <li><span>发售日期：</span><div><span style="font-size:14px;">2019年2月20日</span></div></li>
            <li class="li_style"></li>
            <li><span>角色名：</span><div><span style="font-size:14px;">布朗熊</span></div></li>
            <li class="li_style"></li>
            <li><span>作品名：</span><div><span style="font-size:14px;">LINE FRIENDS</span></div></li>
            <li class="li_style"></li>
            <li><span>绘师：</span><div><span style="font-size:14px;">Jeremiah</span></div></li>
            <li class="li_style"></li>
            <li><span>尺寸：</span><div><span style="font-size:14px;">W38mm×H230mm×D30mm</span></div></li>
            <li class="li_style"></li>
            <li><span>材质：</span><div><span style="font-size:14px;">ABS，METAL</span></div></li>
            <li class="li_style"></li>
            <li><span>商品说明：</span><div><span style="font-size:14px;">请远离幼儿接触，请勿大力拉扯钥匙扣，远离火源，产品颜色以实物为准，因手工测量1~3厘米误差属于正常范围。</span></div></li>
            <li class="li_style"></li>
            <li><span>生产商：</span><div><span style="font-size:14px;">天岸创奇文化创意</span></div></li>
            <li class="li_style"></li>
            <li><span>销售商：</span><div><span style="font-size:14px;">{{value}}</span></div></li>
            <li class="li_style"></li>
            <li><span>版权：</span><div><span style="font-size:14px;">© LINE</span></div></li>
          </ul>
        </div>       
      </mt-tab-container-item>
      <mt-tab-container-item id="sale">
        <ul>
          <li><img src="../../../assets/show/afterSale.jpg" alt=""></li>
        </ul>        
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      selected:"detail",
      isfixed:false,
      value:"SOLOYO LOLI",
    }
  },
  created(){
    this.toparent();
  },
  mounted(){
    window.addEventListener("scroll",this.handleScroll);
  },
  methods:{
    handleScroll(){
      var scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>=1120){
        this.isfixed=true;
      }else{
        this.isfixed=false;
      }
    },
    toparent(){
      this.$emit("showparent",this.value);
    }   
  }
}
</script>

<style scoped>
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom:3px solid #ff7b39;
    background-color:pink;
    color:#fff !important;
    font-size:20px;
  }
  .top_fixed{
    position:fixed;
    width:100%;
    top:0;
    left:0;
    z-index:100;
  }
  .top_list{
    color:#aaa !important;
    background-color:rgba(229,229,229,.6);
    /* border:1px solid rgba(229,229,229,.9); */
    border-radius:5px;
  }
  ul{
    margin-top:5px;
  }
  img{
    width:100%;
  }
  .shop_de{
    margin-left:10px;
  }
  .shop_de ul li{
    position:relative;
    display:flex;
    justify-content:start;
    margin:15px 0;
    /* height:22px; */
  }
  .shop_de ul .li_style{
    border-bottom:1px dashed #e1e1e1;
    margin-right:10px;
  }
  .shop_de ul li>span:first-child{
    color:#aaa;
    font-size:14px;
  }
  .shop_de ul li div{
    margin-left:50px;
  }
</style>
