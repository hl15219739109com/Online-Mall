<template>
  <div class="user_container_bg">
    <div class="top">
      <div class="back" @click="back">
        <a href="javascript:;"><img style="width:22px;height:22px;" src="../../assets/user/back.png" alt=""></a>
      </div>
      <div class="logo_img">
        <img src="../../assets/user/login.png" alt="">
      </div>
      <div class="logo_font">
        <div class="login_in" v-if="islogin">
          {{login_state}}
        </div>
        <div class="login_in" @click="log" v-if="!islogin">
          {{login_state}}
        </div>
        <div class="reg_in" @click="regout" v-if="islogin">
          {{login_states}}
        </div>
        <div class="reg_in" @click="reg" v-if="!islogin">
          {{login_states}}
        </div>
      </div>
    </div>
    <div class="setitem_order">
      <div class="order_top">
        <span>我的订单</span>
        <div class="order_top_right">
          <a href="javascript:;">查看全部订单</a>
          <img src="../../assets/user/go.png" style="vertical-align:bottom;" alt="">
        </div>        
      </div>
      <div class="order_middle"></div>
      <div class="order_bottom">
        <ul>
          <li class="list">
            <a href="javascript:;">
              <img src="../../assets/user/order_icon1.png" style="margin-left:5px;" alt="">
              <p>待付款</p>
            </a>
          </li>
          <li>
            <div class="bottom_line"></div>
          </li>
          <li class="list">
            <a href="javascript:;">
              <img src="../../assets/user/order_icon2.png" style="margin-left:5px;" alt="">
              <p>待发货</p>
            </a>
          </li>
          <li>
            <div class="bottom_line"></div>
          </li>
          <li class="list">
            <a href="javascript:;">
              <img src="../../assets/user/order_icon3.png" style="margin-left:5px;" alt="">
              <p>待收货</p>
            </a>
          </li>
          <li>
            <div class="bottom_line"></div>
          </li>
          <li class="list">
            <a href="javascript:;">
              <img src="../../assets/user/order_icon4.png" style="margin-left:5px;" alt="">
              <p>退补款</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="member_item">
      <ul>
        <li>
          <a href="javascript:;">
            <img src="../../assets/user/download.png" alt="">
            <p>我的收藏</p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../../assets/user/address.png" alt="">
            <p>我的地址</p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../../assets/user/money.png" alt="">
            <p>我的红包</p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../../assets/user/discount.png" alt="">
            <p>我的优惠</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="other_item">
      <ul>
        <li><a href="javascript:;"><span>M码通道</span><img src="../../assets/user/go.png" alt=""></a></li>
        <li><a href="javascript:;"><span>手机号订单查询</span><img src="../../assets/user/go.png" alt=""></a></li>
        <li><a href="javascript:;"><span>以旧换新</span><img src="../../assets/user/go.png" alt=""></a></li>
        <li><a href="javascript:;"><span>百城速达</span><img src="../../assets/user/go.png" alt=""></a></li>
        <li><a href="javascript:;"><span>联系客服</span><img src="../../assets/user/go.png" alt=""></a></li>
        <li><a href="javascript:;"><span>意见反馈</span><img src="../../assets/user/go.png" alt=""></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      login_state:"点击登录",
      login_states:"点击注册",
      islogin:false,
    }
  },
  methods:{
    back(){
      history.go(-1);
    },
    log(){
      this.$router.push("/login");
    },
    reg(){
      this.$router.push("/register");
    },
    regout(){
      sessionStorage.clear();
      this.$router.go(0);
    }
  },
  created(){
    var userName=sessionStorage.getItem("userName");
    if(userName){
      this.login_state=userName;
      this.login_states="点击注销";
      this.islogin=true;
    }else{
      this.login_state="点击登录";
      this.login_states="点击注册";
    }
  }
}
</script>

<style scoped>
  .user_container_bg{
    background-color:#eee;
    height:100%;
  }
  .top{
    background-image:url("../../assets/user/user_top_bg.jpg");
    background-size:100% 100%;
    width:100%;
    height:162px;
    border-bottom:2px solid #e5e5e5;
  }
  .back{
    display:flex;
    justify-content: start;
    padding-top:20px;
    margin-left:15px;
  }
  .logo_img{
    display:flex;
    justify-content:center;
    margin-top:-27px;
  }
  .logo_img img{
    width: 95px;
    height: 95px;
    line-height: 89px;
    display: block;
    border:5px solid #fff;
    border-radius: 50%;
  }
  .top .logo_font{
    display:flex;
    justify-content:center;
  }
  .top .logo_font>div{
    padding:10px;
    color:#fff;
    /* font-size:18px; */
    font-size: 1.2rem;
  }
  .setitem_order{
    width:100%;
    height:137px;
    background-color:#fff;
    margin-top:10px;
  }
  .setitem_order .order_top{
    height:50px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:0 20px;
  }
  .setitem_order .order_top>span{
    color:#444;
    font-size:18px;
  }
  .setitem_order .order_top .order_top_right>a{
    color:#999;
    font-size:14px;
  }
  .setitem_order .order_middle{
    border:0.3px solid rgba(229,229,229,.3);
  }
  .setitem_order{
    border-bottom:2px solid #e5e5e5;
  }
  .setitem_order .order_bottom ul{
    height:90px;
    display:flex;
    justify-content: space-around;
    align-items:center;
  }
  .setitem_order .order_bottom ul .list{
    padding:0 15px;
  }
  .setitem_order .order_bottom .bottom_line{
    position:relative;
    top:50%;
    width:1px;
    height:35px;
    margin-top:-15px;
    border-right:1px solid #ddd;
  }
  .member_item{
    background-color:#fff;
    margin-top:10px;
    border-bottom:2px solid #e5e5e5;
  }
  .member_item ul{
    height:90px;
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  .member_item ul>li>a>img{
    width:60%;
    margin-left:10px;
  }
  .other_item{
    margin-top:10px;
    background-color:#fff;
  }
  .other_item ul li>a{
    display:block;
    height:70px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:17px;
    color:#333;
    padding:0 20px;
    border-bottom:0.3px solid rgba(229,229,229,1);
  }
</style>
