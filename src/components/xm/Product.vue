<template>
  <div class="pro_big">
    <div class="pro_top">
      <div class="top_icon">
        <div class="icon_back" @click="back">
          <img src="../../assets/show/back.png" alt="">
        </div>
        <div class="icon_home" @click="home">
          <img src="../../assets/show/home.png" alt="">
        </div>
      </div>
    </div>
    <div class="pro_middle" v-for="(item,index) of productlist" :key="index">
      <div class="middle_img">
        <mt-swipe style="width:100%;height:400px;margin-top:-15px;" :auto="3000">
          <!-- <mt-swipe-item v-for="(it,inde) of arr.length-1" :key="inde"><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic1}`" alt=""></mt-swipe-item> -->
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic1}`" alt=""></mt-swipe-item>
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic2}`" alt=""></mt-swipe-item>
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic3}`" alt=""></mt-swipe-item>
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic4}`" alt=""></mt-swipe-item>
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic5}`" alt=""></mt-swipe-item>
          <mt-swipe-item><img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/${item.Propic[0].pic6}`" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="middle_show"></div>
      <div class="middle_details">
        <div class="show_middle">
          <div class="middle_font">
            {{item.Prodel[0].Proname}}
          </div>
          <div class="middle_state">
            热销中
          </div>
          <div class="middle_details">
            <ul>
              <li style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></li>
              <li><span>状态</span><div><span style="font-size:14px;">售卖中</span></div></li>
              <li style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></li>
              <li v-if="active==0"><span>价格</span><div><span style="font-size:16px;color:#999;font-weight:700;">{{item.Propri[0].pri1}}元</span></div></li>
              <li v-if="active==1"><span>价格</span><div><span style="font-size:16px;color:#999;font-weight:700;">{{item.Propri[0].pri2}}元</span></div></li>
              <li v-if="active==2"><span>价格</span><div><span style="font-size:16px;color:#999;font-weight:700;">{{item.Propri[0].pri3}}元</span></div></li>
              <li v-if="active==3"><span>价格</span><div><span style="font-size:16px;color:#999;font-weight:700;">{{item.Propri[0].pri4}}元</span></div></li>
              <li style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></li>
              <li><span>数量</span><div><input type="text" :value="`${proCount}`"></div><img src="../../assets/show/reduce.png" @click="reduce" class="reduce" alt=""><img src="../../assets/show/increase.png" @click="increase" class="increase" alt=""></li>
              <li style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></li>
              <li><span>规格</span>
                <div class="show_list" @click="showlist">
                  <span data-num="0" :data-type="`${item.Protype[0].type1}`" data-img="show_list6.jpg" :class="active==0?'actived':''">{{item.Protype[0].type1}}</span><a class="fill"></a>
                  <span data-num="1" :data-type="`${item.Protype[0].type2}`" data-img="show_list6.jpg" :class="active==1?'actived':''">{{item.Protype[0].type2}}</span><a class="fill"></a>
                  <span data-num="2" :data-type="`${item.Protype[0].type3}`" data-img="show_list6.jpg" :class="active==2?'actived':''">{{item.Protype[0].type3}}</span><a class="fill"></a>
                  <span data-num="3" :data-type="`${item.Protype[0].type4}`" data-img="show_list6.jpg" :class="active==3?'actived':''">{{item.Protype[0].type4}}</span><a class="fill"></a>
                </div>
              </li>
              <li style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></li>
            </ul>
            <div class="show_img">
              <img v-if="active==0" :src="`http://127.0.0.1:3000/${item.Propic[0].pic3}`" alt="">
              <img v-if="active==1" :src="`http://127.0.0.1:3000/${item.Propic[0].pic5}`" alt="">
              <img v-if="active==2" :src="`http://127.0.0.1:3000/${item.Propic[0].pic6}`" alt="">
              <img v-if="active==3" :src="`http://127.0.0.1:3000/${item.Propic[0].pic4}`" alt="">
            </div>
            <div style="border-bottom:1px dashed #e1e1e1;margin-right:10px;"></div>
          </div>
        </div>
      </div>
      <div class="show_list_icon">
        <div class="icon_join" @click="submit">
          加入购物车
        </div>
        <div class="icon_purchase">
          立即购买
        </div>
      </div>
      <div class="show_bottom_details">
        <productlist :id="`${id}`"></productlist>
      </div>

      <div class="sure_details" :class="issubmit?'clic_sure_details':'close_details'">
      <div class="details_list">
        <div class="list_top">
          <div class="top_title">
            确认订单信息
          </div>
          <div class="top_close" @click="close">
            <img src="../../assets/show/close.png" alt="">
          </div>
        </div>
        <div class="list_middle">
          <div class="middle_img1">
            <img class="myselectedImg" v-if="active==0" :src="`http://127.0.0.1:3000/${item.Propic[0].pic3}`" alt="">
            <img class="myselectedImg" v-if="active==1" :src="`http://127.0.0.1:3000/${item.Propic[0].pic5}`" alt="">
            <img class="myselectedImg" v-if="active==2" :src="`http://127.0.0.1:3000/${item.Propic[0].pic6}`" alt="">
            <img class="myselectedImg" v-if="active==3" :src="`http://127.0.0.1:3000/${item.Propic[0].pic4}`" alt="">
          </div>
          <ul>
            <li class="li_style"></li>
            <li><span>商品名：</span><div><span style="font-size:14px;">{{item.Prodel[0].Proname}}</span></div></li>
            <li class="li_style"></li>
            <li v-if="active==0"><span>类型：</span><div><span style="font-size:14px;">{{item.Protype[0].type1}}</span></div></li>
            <li v-if="active==1"><span>类型：</span><div><span style="font-size:14px;">{{item.Protype[0].type2}}</span></div></li>
            <li v-if="active==2"><span>类型：</span><div><span style="font-size:14px;">{{item.Protype[0].type3}}</span></div></li>
            <li v-if="active==3"><span>类型：</span><div><span style="font-size:14px;">{{item.Protype[0].type4}}</span></div></li>
            <li class="li_style"></li>
            <li v-if="active==0"><span>商品单价：</span><div><span style="font-size:20px;color:#f70d2d">{{item.Propri[0].pri1}}&nbsp;元</span></div></li>
            <li v-if="active==1"><span>商品单价：</span><div><span style="font-size:20px;color:#f70d2d">{{item.Propri[0].pri2}}&nbsp;元</span></div></li>
            <li v-if="active==2"><span>商品单价：</span><div><span style="font-size:20px;color:#f70d2d">{{item.Propri[0].pri3}}&nbsp;元</span></div></li>
            <li v-if="active==3"><span>商品单价：</span><div><span style="font-size:20px;color:#f70d2d">{{item.Propri[0].pri4}}&nbsp;元</span></div></li>
            <li class="li_style"></li>
            <li><span>商品数量：</span><div><span style="font-size:20px;color:#f70d2d">{{proCount}}&nbsp;个</span></div></li>
            <li class="li_style"></li>
            <li><span>商品店家：</span><div><span style="font-size:14px;">SOLOYO LILO@</span></div></li>
            <li class="li_style"></li>
            <li v-if="active==0"><span>价格汇总：</span><div><span style="font-size:20px;color:#f70d2d">{{(item.Propri[0].pri1*proCount).toFixed(2)}}&nbsp;元</span></div></li>
            <li v-if="active==1"><span>价格汇总：</span><div><span style="font-size:20px;color:#f70d2d">{{(item.Propri[0].pri2*proCount).toFixed(2)}}&nbsp;元</span></div></li>
            <li v-if="active==2"><span>价格汇总：</span><div><span style="font-size:20px;color:#f70d2d">{{(item.Propri[0].pri3*proCount).toFixed(2)}}&nbsp;元</span></div></li>
            <li v-if="active==3"><span>价格汇总：</span><div><span style="font-size:20px;color:#f70d2d">{{(item.Propri[0].pri4*proCount).toFixed(2)}}&nbsp;元</span></div></li>
            <li class="li_style"></li>
          </ul>
        </div>
        <div class="list_bottom_submit">
          <div class="submit_title" @click="submitProduct">
            提交订单
          </div>        
        </div>
      </div>
    </div>

    </div>

  </div>
</template>

<script>
import productlist from "./common/Productlist"
export default {
  data(){
    return {
      productlist:[],
      pic:[],
      arr:[],
      active:0,
      issubmit:false,
      seller:"",
      proName:"",
      proPrice:'',
      proPic:"",
      proType:"",
      proCount:1,
    }
  },
  components:{
    productlist,
  },
  props:["id"],
  created(){
    this.resproduct();
  },
  methods:{
    resproduct(){
      var url="searchid";
      this.axios.get(url,{params:{id:this.id}}).then(res=>{
        if(res.data.code==1){
          var rows=res.data.data;
          this.productlist.push(rows);
          console.log(this.productlist);
          //   for(var item of this.productlist){
          //   this.pic.push(item.Propic[0]);
          //   this.arr=Object.keys(this.pic[0]);
          //   console.log(this.pic);          
          // }
          this.seller=this.productlist[0].Prodel[0].Proseller;
          this.proName=this.productlist[0].Prodel[0].Proname;
          this.proPrice=this.productlist[0].Propri[0].pri1;
          this.proPic=this.productlist[0].Propic[0].pic3;
          this.proType=this.productlist[0].Protype[0].type1;
          this.proCount=1;
        }else{
          alert("不好意思，还没有添加该号商品详情哟");
          this.$router.push("/");
          return;
        }       
      })
    },
    back(){
      history.go(-1);
    },
    home(){
      this.$router.push("/");
    },
    reduce(){
      this.proCount--;
      if(this.proCount<=1){
        this.proCount=1;
      }
    },
    increase(){
      this.proCount++;
    },
    showlist(e){
      var istrue=e.target.dataset.num==0 || e.target.dataset.num==1 || e.target.dataset.num==2 || e.target.dataset.num==3;
      if(istrue){
        var num=e.target.dataset.num;      
        this.proCount=1;
        if(num==0){
          this.active=0;
        }
        if(num==1){
          this.active=1;
          this.proPrice=this.productlist[0].Propri[0].pri2;
          this.proPic=this.productlist[0].Propic[0].pic5;
          this.proType=this.productlist[0].Protype[0].type2;
        }
        if(num==2){
          this.active=2;
          this.proPrice=this.productlist[0].Propri[0].pri3;
          this.proPic=this.productlist[0].Propic[0].pic6;
          this.proType=this.productlist[0].Protype[0].type3;
        }
        if(num==3){
          this.active=3;
          this.proPrice=this.productlist[0].Propri[0].pri4;
          this.proPic=this.productlist[0].Propic[0].pic4;
          this.proType=this.productlist[0].Protype[0].type4;
        }
        // console.log(sessionStorage.getItem("userName"),this.seller,this.proName,this.proPrice,this.proPic,this.proType,this.proCount);
      }        
    },
    submit(){
      this.issubmit=true;
    },
    close(){
      this.issubmit=false;
    },
    submitProduct(){
      if(sessionStorage.getItem("userName")){
        var url="intoPro";
        this.axios.get(url,{params:{userName:sessionStorage.getItem("userName"),seller:this.seller,proName:this.proName,proPrice:this.proPrice,proPic:this.proPic,proType:this.proType,proCount:this.proCount}}).then(res=>{
          if(res.data.code==1){
            this.$toast({
              title:"提示",
              message:"添加购物车成功",
              duration:800,
            })
            this.close();
            this.$router.push("/");
          }
        })
      }else{
        this.$toast({
          title:"提示",
          message:"你还没有登陆，请先登陆",
          duration:800
        })
        this.$router.push("/login");
      }     
    },
  }
}
</script>

<style scoped>
  .actived{
    position: relative;
    color:#ff7b39;
    border:2px solid #ff7b39 !important;
    box-sizing: border-box !important;
  }
  .actived::after{
    position:absolute;
    content:"";
    bottom:0;
    right:0;
    border:6px solid transparent;
    border-right-color:#ff7b39;
    border-bottom-color:#ff7b39;
  }
  .show_list_icon{
    display:flex;
    justify-content:center;
    margin-top:5px;
    margin-bottom:10px;
  }
  .show_list_icon>div{
    width:40%;
    height:46px;
    text-align: center;
    line-height: 46px;
    font-weight: 700;
    font-size: 17px;
    color:#fff;
    background-color:#ff7b39;
    border-radius:25px;
  }
  .show_list_icon .icon_purchase{
    margin-left:20px;
    background-color:#ffb249;
  }
  .pro_big{
    width:100%;
  }
  .pro_top .top_icon{
    display:flex;
    justify-content:space-between;
    padding:10px;
  }
  .middle_show{
    border-bottom:2px solid rgba(229,229,229,.6);
  }
  .show_middle{
    margin-top:10px;
    margin-left:10px;
  }
  .show_middle .middle_font{
    font-size:20px;
    font-weight: 600;
  }
  .show_middle .middle_state{
    width:60px;
    height:30px;
    font-size:14px;
    text-align: center;
    line-height:30px;
    background-color:#4accad;
    color:#fff;
    border-radius:8px;
  }
  .show_middle .middle_details ul li{
    position:relative;
    display:flex;
    justify-content:start;
    margin:15px 0;
  }
  .show_middle .middle_details ul li>span:first-child{
    color:#aaa;
    font-size:14px;
  }
  .show_middle .middle_details ul li div{
    margin-left:50px;
  }
  .show_middle .middle_details ul li div>input{
    width:100px;
    height:32px;
    margin-top:-15px;
    margin-bottom:0;
    text-align: center;
  }
  .show_middle .middle_details ul li img{
    position:absolute;
  }
  .show_middle .middle_details ul li .reduce{
    top:-3px;
    left:79px;
  }
  .show_middle .middle_details ul li .increase{
    top:-4px;
    left:150px;
  }
  .show_middle .middle_details ul li .show_list{
    display:flex;
  }
  .show_middle .middle_details ul li .show_list>span{
    display:block;
    padding:5px 10px;
    border:2px solid #000;
    margin-top:-5px;
    font-weight:700;
    font-size:14px;
    box-sizing: border-box;
  }
  .fill{
    width:15px;
    height:0;
  }
  .show_middle .middle_details .show_img{
    margin-top:-10px;
    margin-left:-10px;
  }
  .show_middle .middle_details .show_img img{
    width:100%;
    height:300px;
  }
  .clic_sure_details{
    position:fixed !important;
    bottom:0 !important;
    width:100% !important;
    transition: bottom .3s linear;
  }
  .close_details{
    transition: bottom .3s linear;
  }
  .sure_details{
    position:fixed;
    bottom:-100%;
    width:100%;
    background-color:#f8f8f8;
    border-top-right-radius: 35px;
    border-top-left-radius: 35px;
  }
  .sure_details .details_list .list_top{
    display:flex;
    justify-content:space-between;
    padding:10px 15px;
    padding-left:162px;
  }
  .sure_details .details_list .list_top .top_title{
    margin-top:8px;
    font-weight: 700;
  }
  /* .sure_details .details_list .list_top .top_close{
  } */
  .sure_details .details_list .list_middle{
    margin-top:-15px;
    background-color:#f4f1f1;
  }
  .sure_details .details_list .list_middle ul li{
    position:relative;
    display:flex;
    justify-content:start;
    margin:15px 0;
  }
  .sure_details .details_list .list_middle ul .li_style{
    border-bottom:1px dashed #e1e1e1;
    margin-right:10px;
  }
  .sure_details .details_list .list_middle ul li>span:first-child{
    color:#aaa;
    font-size:14px;
  }
  .sure_details .details_list .list_middle ul li div{
    margin-left:50px;
  }
  .sure_details .details_list .list_bottom_submit{
    display: flex;
    justify-content: center;
    background-color:#f4f1f1;
    padding:20px 0;
    margin-top:-15px;
  }
  .sure_details .details_list .list_bottom_submit .submit_title{
    background-color:#ff7b39;
    color:#fff;
    width:60%;
    height:45px;
    text-align: center;
    line-height: 45px;
    border-radius:25px;
  }
  .middle_img1{
    margin-top:20px;
    margin-bottom:-20px;
    text-align: center;
  }
  .myselectedImg{
    height:150px;
  }
</style>