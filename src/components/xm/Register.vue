<template>
  <div>
    <regtop></regtop>
    <div class="logo">
      <img src="../../assets/signin1.png" alt="">
    </div>
    <div class="reg_right">
      已有账号，<a href="javascript:;" @click="sub">马上登录</a>
    </div>
    <div class="line"></div>
    <div class="reg_name">
      <div>
        <img class="reg_img" src="../../assets/yonghu.png" alt="">
      </div>     
      <mt-field v-model="uname" placeholder="请输入11位手机号码" style="width:63%" @blur.native.capture="isname"></mt-field>
    </div>
    <div class="reg_password">
      <div>
        <img class="lo_img" src="../../assets/mima.png" alt="">
      </div>     
      <mt-field v-model="upwd" type="password" placeholder="请设置6到8位的数字密码" style="width:63%" @blur.native.capture="isupwd"></mt-field>
    </div>
    <div class="reg_sure">
      <div>
        <img class="lo_img" src="../../assets/yanzhengma.png" alt="">
      </div>     
      <mt-field v-model="sure" placeholder="请输入验证码" style="width:38%" @blur.native.capture="issure"></mt-field>
      <mt-button style="width:25%" class="mycolor" @click="random">获取验证码</mt-button>
    </div>
    <div class="reg">
      <mt-button size="large" style="width:70%;border-radius:50px;" type="danger" @click="reg">立即注册</mt-button>
    </div>
    <div class="reg_mode">
      <div class="text">快速登录：</div>
      <div class="mode">
        <a href=""><img src="../../assets/weixin.png" alt=""></a>
        <a href=""><img src="../../assets/umidd17.png" alt=""></a>
        <a href=""><img src="../../assets/weibo.png" alt=""></a>
        <a href=""><img src="../../assets/QQ.png" alt=""></a>
      </div>
    </div>
    <div class="reg_bottom">
      @ 2019 XuanmengMall Inc
    </div>
  </div>
</template>

<script>
import regtop from "./common/Regtop"
export default {
  data(){
    return {
      uname:"",
      upwd:"",
      sure:"",
      brr:[],
      cantrue:true,
      time:60,
      html:"",
      canname:false,
      canupwd:false,
      cansure:false,
    }
  },
  components:{
    regtop,
  },
  methods:{
    sub(){
      this.$router.push("/login");
    },
    isname(){
      if(this.uname==""){
        this.$toast({
          message:"手机号码为空",
          duration:800,
        });
        return;
      }
      var reg=/^1[3-9]\d{9}$/;
      if(reg.test(this.uname)){
        this.axios.get("isreg",{params:{uname:this.uname}}).then(res=>{
          if(res.data.code==1){
            this.$toast({
              message:res.data.msg,
              duration:800
            })
            console.log(res.data.data);
            return;
          }
          return;
        })
        this.$toast({
          message:"该号码符合条件",
          duration:800,
        })
        this.canname=true;
      }else{
        this.$toast({
          message:"请输入合法的手机号码",
          duration:800,
        })
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
      var reg=/^\d{6,8}$/;
      if(reg.test(this.upwd)){
        this.$toast({
          message:"密码符合要求",
          duration:800,
        })
        this.canupwd=true;
      }else{
        this.$toast({
          message:"设置的密码不符合要求",
          duration:800,
        })
        return;
      }
    },
    issure(){
      if(this.sure==""){
        this.$toast({
          message:"验证码码为空",
          duration:800,
          });
        return;
      }
      if(this.sure!=this.brr.join("")){
        this.$toast({
          message:"请输入正确的验证码",
          duration:800,
        })
        return;
      }else{
        this.$toast({
          message:"验证码通过",
          duration:800,
        })
        this.cansure=true;
      }
    },
    reg(){
      if(this.uname==""){
        this.$toast({
          message:"用户名为空",
          duration:800,
        });
        return;
      }
      if(this.upwd==""){
        this.$toast({
          message:"密码为空",
          duration:800,
          });
          return;
      }
      if(this.sure==""){
        this.$toast({
          message:"验证码码为空",
          duration:800,
          });
        return;
      }
      if(this.canname&&this.canupwd&&this.cansure){
        var url="reg";
        // 方法一
        let postData=this.qs.stringify({uname:this.uname,upwd:this.upwd});
        console.log(postData);
        this.axios({
          method:"post",
          url,
          data:postData,

          // 方法二
          // data:{
          //   uname:this.uname,
          //   upwd:this.upwd,
          // },
          // transformRequest:[(data)=>{
          //   data=this.qs.stringify(data);
          //   return data;
          // }],
          // headers:{'Content-Type':'application/x-www-form-urlencoded'}

        }).then((result)=>{
          if(result.data.code==1){
            this.$toast({
              message:result.data.msg,
              duration:800,
            })
            this.$router.push("/login");
          }
        })
        // this.axios.post(url,{data:{uname:this.uname,upwd:this.upwd}}).then((result)=>{
        //   console.log(11);
        // })
        }else{
          alert("验证不通过，请重新输入");
        }
      
    },
    suijishu(){
      for(var i=0;i<6;i++){
        var index=Math.floor(Math.random()*10);
        this.brr[i]=index;
      }
    },
    random(){
      if(this.cantrue){
        this.suijishu();
        this.html=`<div style="color:pink;font-size:36px;">${this.brr.join(" ")}</div>`;
        this.$messagebox({
          title:"本次验证码为：",
          message:this.html,
          showConfirmButton:true,
          showCancelButton:true,
          cancelButtonText:'重新获取验证码'
        }).then((action)=>{
          if(action=="cancel"){
            this.random();
          }else{
            this.cantrue=false;
            var t=setInterval(()=>{
              this.time-=1;
              if(this.time==0){
                clearInterval(t);
                this.time=60;
                this.cantrue=true;
              }
            },1000)
          }
        })
      }else{
        const html=`<div style="font-size:32px">请于<span style="color:red;">${this.time}</span>秒后重新获取</div>`
        this.$messagebox({
          title:"提示",
          message:html,
        })
      }      
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
  .reg_right{
    display:flex;
    justify-content:flex-end;
    margin-right:10%;
    margin-top:30px;
    color:#666;
    font-size:14px;
  }
  .reg_right>a{
    color:#999;
  }
  .line{
    margin-top:10px;
    border:0.5px solid rgba(0,0,0,.1);
    width:100%;
  }
  .reg_name,.reg_password,.reg_sure{
    display:flex;
    justify-content: center;
    margin-top:20px;
  }
  .reg_name>div,.reg_password>div,.reg_sure>div{
    display: flex;
    align-items:center;
    height:44px;
    margin-right:20px;
  }
  .mycolor{
    color:#fff;
    background-color:forestgreen;
  }
  .reg{
    display:flex;
    justify-content: center;
    margin-top:20px;
  }
  .reg_mode{
    display:flex;
    margin-top:50px;
    justify-content: center;
  }
  .text{
    font-size:14px;
    margin-right:10px;
  }
  .reg_mode>.mode>a{
    padding:0 5px;
  }
  .reg_bottom{
    display:flex;
    justify-content: center;
    margin-top:30px;
    font-size:16px;
    color:coral;
  }
</style>
