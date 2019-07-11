<template>
  <div>
    <titlebar></titlebar>
    <div class="logo">
      <img src="../../assets/signin1.png" alt="">
    </div>
    <div class="login_name">
      <div>
        <img class="lo_img" src="../../assets/yonghu.png" alt="">
      </div>     
      <mt-field v-model="uname" placeholder="请输入已注册的手机号" style="width:63%" @blur.native.capture="isname"></mt-field>
    </div>
    <div class="login_password">
      <div>
        <img class="lo_img" src="../../assets/mima.png" alt="">
      </div>     
      <mt-field v-model="upwd" placeholder="请输入密码" style="width:63%" type="password" @blur.native.capture="isupwd"></mt-field>
    </div>
    <div class="submit">
      <mt-button size="large" style="width:70%;border-radius:50px;" type="primary" @click="sub">登录</mt-button>
    </div>
    <div class="reg">
      <mt-button size="large" style="width:70%;border-radius:50px;" type="danger" @click="reg">注册新用户</mt-button>
    </div>
    <div class="log_mode">
      <div class="text">快速登录：</div>
      <div class="mode">
        <a href=""><img src="../../assets/weixin.png" alt=""></a>
        <a href=""><img src="../../assets/umidd17.png" alt=""></a>
        <a href=""><img src="../../assets/weibo.png" alt=""></a>
        <a href=""><img src="../../assets/QQ.png" alt=""></a>
      </div>
    </div>
    <div class="log_bottom">
      @ 2019 XuanmengMall Inc
    </div>
  </div>
</template>

<script>
import titlebar from "./common/Titlebar"
export default {
  data(){
    return {
      uname:"",
      upwd:"",
    }
  },
  components:{
    titlebar,
  },
  methods:{
    isname(){
      if(this.uname==""){
        this.$toast({
          message:"手机号为空",
          duration:800,
        });
        return;
      }
    },
    isupwd(){
      if(this.upwd==""){
        this.$toast({
          message:"密码为空",
          duration:800,
        });
        return;
      }
    },
    sub(){
      if(this.uname==""||this.upwd==""){
        this.$toast({
          message:"手机号或密码不能为空",
          duration:800,
        })
      }else{
        this.axios.get("log",{params:{uname:this.uname,upwd:this.upwd}}).then(res=>{
          if(res.data.code==1){
            this.$toast({
              message:"登录成功",
              duration:800,
            })
            sessionStorage.setItem("userName",this.uname);
            this.$router.push("/");
          }else{
            alert("手机号或密码错误,请重新确认输入");
          }
        })
      }
    },
    reg(){
      this.$router.push("/register");
    }
  }
}
</script>

<style scoped>
  .logo{
    display:flex;
    justify-content: center;
    margin-top:50px;
  }
  .lo_img{   
    width:30px;
    height:30px;
  }
  .login_name{
    display:flex;
    justify-content: center;
    margin-top:50px;
  }
  .login_password{
    display:flex;
    justify-content: center;
    margin-top:20px;
  }
  .login_name>div,.login_password>div{
    display: flex;
    align-items:center;
    height:44px;
    margin-right:20px;
  }
  .submit,.reg{
    display:flex;
    justify-content: center;
    margin-top:20px;
  }
  .log_mode{
    display:flex;
    margin-top:100px;
    justify-content: center;
  }
  .text{
    font-size:14px;
    margin-right:10px;
  }
  .log_mode>.mode>a{
    padding:0 5px;
  }
  .log_bottom{
    display:flex;
    justify-content: center;
    margin-top:30px;
    font-size:16px;
    color:coral;
  }
</style>
