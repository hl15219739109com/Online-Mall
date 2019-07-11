<template>
  <div class="reg_top">
    <div class="reg_content">
      <div class="content_left" @click="back">
        <a href="javascript:;">
          <img src="../../../assets/fanhui.png" alt="">
        </a>       
      </div>
      <div class="content_center">
        用户注册
      </div>
      <div class="content_right" @click="showlist">
        <a href="javascript:;">
          <img src="../../../assets/liebiao.png" alt="" style="margin-left:50px;">
        </a>
        <div class="showlist" v-show="isshow">
          <ul>
            <li><a href="javascript:;" @click="index">商品首页</a></li>
            <li><a href="javascript:;">关于我们</a></li>
            <li><a href="javascript:;">反馈中心</a></li>
          </ul>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isshow:false,
    }
  },
  methods:{
    back(){
      history.go(-1);
    },
    showlist(){
      this.isshow=!this.isshow;
    },
    index(){
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
  .reg_content{
    display:flex;
    justify-content:space-between;
    width:100%;
    height:45px;
    align-items:center;
    background-color:#efefef;
    padding:0 10px;
    border-bottom:1px solid #bfbfbf;
  }
  .content_center{
    font-size:18px;
  }
  .content_right{
    position:relative;
  }
  .showlist{
    width:100%;
    position:absolute;
    top:35px;
    left:25%;
  }
  .showlist ul li{
    background-color:#efefef;
  }
  .showlist ul li>a{
    color:#000;
    font-size:14px;
  }
</style>
