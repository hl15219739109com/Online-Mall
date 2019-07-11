<template>
  <div class="log_top">
    <div class="log_content">
      <div class="content_left" @click="back">
        <a href="javascript:;">
          <img src="../../../assets/fanhui.png" alt="">
        </a>       
      </div>
      <div class="content_center">
        购物车
      </div>
      <div class="content_right" @click="showlist">
        <a href="javascript:;">
          <img src="../../../assets/liebiao.png" alt="" style="margin-left:50px;">
        </a>      
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
  .log_content{
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
</style>
