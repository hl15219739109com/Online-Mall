<template>
  <div class="car_big">
    <div class="car_top">
      <cartop></cartop>
    </div>
    <div class="car_carlist">
      <div class="isnotlogin" v-if="!islogin">
        <i style="color:#999;font-weight:700;font-size:20px;margin-right:10px;" @click="sub">登陆</i><span style="color:333;font-weight:500;">查看购物车详情</span>
      </div>
      <div class="carlist_title" v-if="islogin">
        <span style="color:#f60;font-weight:700;font-size:26px;margin-right:10px;">{{userName}}</span><span>订单详情</span>
      </div>
      <div class="caricon">
        <div @click="selectedAll">
          <input type="checkbox" v-model="checked" :class="checked?'selectedimg':''" name="" id="selectall" style="margin-right:10px;"><label for="selectall" v-if="!checked">全选</label>
          <label for="selectall" v-if="checked">取消全选</label>
        </div>       
      </div>
      <div class="nolist" v-if="nolist">
        <div class="nolist_title">
          <i>购物车空空如也，先添加一些<span style="font-size:22px;font-weight:600;padding:0 5px;" @click="submit">商品</span>吧</i>
        </div>      
      </div>
      <div class="car_listshow" v-for="(item,index) of list" :key="index" :class="index==list.length-1?'lastone':''">
        <div class="show_seller">
          <div @change="selected(index)" :data-i="`${index}`">
            <input type="checkbox" :class="item.cb?'selectedimg':''" v-model="item.cb" name="" :id="`selected[${index}]`" style="margin-right:10px;"><label :for="`selected[${index}]`">{{item.seller}}</label>
          </div>          
        </div>
        <div class="white_top"></div>     
        <div class="show_content">
          <div class="content_img_left">
            <img class="del_img" :src="`http://127.0.0.1:3000/${item.proPic}`" alt="">
          </div>
          <div class="content_details_middle">
            <div class="proname">
              {{item.proName}}
            </div>
            <div class="proprice">
              <div class="price">
                ¥&nbsp;{{item.proPrice}}
              </div>
              <div class="type">
                {{item.proType}}
              </div>
            </div>
            <div class="procount">
              <input type="text" :value="`${item.proCount}`"><img @click="reduce" :data-reduce="`${item.proCount}`" :data-index="`${index}`" src="../../assets/show/reduce.png" class="reduce" alt=""><img @click="increase" :data-increase="`${item.proCount}`" :data-index="`${index}`" src="../../assets/show/increase.png" class="increase" alt="">
            </div>
            <div class="priceSum">
              ¥&nbsp;<span>{{(item.proPrice*item.proCount).toFixed(2)}}</span>
            </div>
          </div>
          <div class="content_del_right">
            <div>
              <div class="delected" @click="delOne" :data-index="index" :data-id="item.id">删除</div>
              <div class="collection">收藏</div>
            </div>           
          </div>
        </div>    
        <div class="white"></div>
      </div>
      <div class="listshow_priceAllSum bottomend" :class="isbottom?'bottomend':''">
        <div class="AllSum">
          <div class="all_details">
            <div class="select">
              已选<span style="color:#ff7b39;font-size:18px;">{{selectedCount}}</span>件商品
            </div>
            <div class="priceAll">
              总计（不含运费）：<span v-if="isselect" style="font-size:22px;color:#f70b2b;font-weight:700;">0元</span><span v-if="!isselect" style="font-size:22px;color:#f70b2b;font-weight:700;">{{Alltotal.toFixed(2)}}元</span>
            </div>
          </div>
          <div class="submitBtn">
            <a href="javascript:;">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartop from "./common/Cartitle"
export default {
  data(){
    return {
      list:[],
      checked:false,
      islogin:false,
      nolist:false,
      selectedCount:0,
      isbottom:false,
      isselect:true,
      Alltotal:0,
      userName:"",
    }
  },
  components:{
    cartop,
  },
  created(){
    this.carlist();
    var userName=sessionStorage.getItem("userName");
    if(userName){
      this.userName=userName;
      this.islogin=true;
    }else{
      this.userName="";
    }
  },
  mounted(){
    window.addEventListener("scroll",this.handleTop);
    this.carlist();
  },
  methods:{
    submit(){
      this.$emit("toparent","index");
    },
    // 检测移动端中滚动条的高度
    handleTop(){
      var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
      if(scrollTop>=0){
        this.isbottom=true;
      }else{
        this.isbottom=false;
      }
      // console.log(scrollTop,window.innerHeight-62)
    },
    // 当用户减少商品数量
    reduce(e){
      var rs=--e.target.dataset.reduce;
      var index=e.target.dataset.index;
      var state=this.list[index].cb;
      var sum=0;
      this.isselect=false;
      if(rs<=1){
        this.list[index].proCount=1;
        this.list[index].price=1*this.list[index].proPrice;
      }else{
        this.list[index].proCount=rs;
        this.list[index].price=rs*this.list[index].proPrice;      
      }
      this.selected(index);
    },
    // 增减商品数量
    increase(e){
      var rs=++e.target.dataset.increase;
      var index=e.target.dataset.index;
      var state=this.list[index].cb;
      var sum=0;
      this.Alltotal=0;
      this.isselect=false;
      this.list[index].proCount=rs;
      this.list[index].price=rs*this.list[index].proPrice;
      this.selected(index);
    },
    // 请求后台数据，
    carlist(){
      var url="carlist";
      this.axios.get(url,{params:{userName:sessionStorage.getItem("userName")}}).then(res=>{       
        var rows=res.data.data;
        for(var item of rows){
          item.cb=false;
          item.price=item.proPrice;
          item.count=item.proCount;
        }
        this.list=rows;
        console.log(this.list);
        if(res.data.data.length==0){
          this.nolist=true;
        }         
      })
    },
    // 全选商品时
    selectedAll(e){
      var rs=e.target.checked;
      this.isselect=false;
      this.Alltotal=0;
      for(var item of this.list){
        item.cb=rs;
        if(item.cb){
          this.selectedCount=this.list.length;
          this.Alltotal+=item.proPrice*item.proCount;
        }else{
          this.selectedCount=0;
          this.Alltotal=0;
        }
      }     
    },
    // 选中单个商品
    selected(index){
      var isclick=this.list[index].cb;
      var increase=0;
      var reduce=0;
      this.Alltotal=0;
      this.isselect=false;
      for(var item of this.list){
        if(item.cb){
          increase++;
          this.isselect=false;
          this.Alltotal+=item.proPrice*item.proCount;
          if(increase==this.list.length){
            this.checked=true;
          }else{
            this.checked=false;
          }
          this.selectedCount=increase;      
        }else{
          reduce++;
          if(reduce==this.list.length){
            this.selectedCount=0;
            this.isselect=true;
            this.Alltotal=0;
            this.checked=false;
          }
        }
      }
    },
    // 删除单个商品
    delOne(e){
      var id=e.target.dataset.id;
      var index=e.target.dataset.index;
      this.$messagebox({
        title:"提示消息",
        message:"是否删除该条商品",
        showConfirmButton:true,
        showCancelButton:true,
      }).then(result=>{
        if(result=="cancel"){
          return;
        }else{
          var url="delone";
          this.axios.get(url,{params:{id}}).then(res=>{
            this.carlist();
            this.Alltotal=0;
            this.selectedCount=0;
            this.checked=false;
          })
        }
      })
    },
    sub(){
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
  .nolist .nolist_title{
    background-color:#f8f8f8;
    display: flex;
    justify-content: center;
    padding:185px 0;
    font-size:20px;
    color:#aaa;
  }
  .isnotlogin{
    display:flex;
    justify-content: center;
    padding:20px 0;
  }
  .car_carlist .carlist_title{
    font-size:16px;
    font-weight: 600;
    color:#111;
    margin-top:60px;
    margin-left:15px;
    margin-bottom:20px;
  }
  .car_carlist .caricon{
    padding:15px;
    background-color:#fff;
    line-height:22px;
  }
  input[type=checkbox]{
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 1px;
    position: relative;
    top: -2px;
    margin-left: 5px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
    transform: scale(1.2);
  }
  .car_carlist .car_listshow .show_seller{
    padding:15px;
  }
  .car_carlist .car_listshow .show_seller>input{
    margin-right:10px;
  }
  .car_carlist .car_listshow .white_top{
    margin-left:-15px;
    height:20px;
    background-color:#fff;
    border-bottom:1px dashed #e1e1e1;
  }
  .car_carlist .car_listshow .white{
    margin-left:-15px;
    height:20px;
    background-color:#fff;
    border-top:1px dashed #e1e1e1;
  }
  .car_carlist .car_listshow .show_content{
    display:flex;
    padding:10px 15px;
    background-color:#fff;
  }
  .car_carlist .car_listshow .show_content .del_img{
    width:100px;
    height:100px;
    border:1px solid rgba(0,9,0,.1);
    border-radius:4px;
  }
  .car_carlist .car_listshow .show_content .content_details_middle{
    margin-left:20px;
  }
  .car_carlist .car_listshow .show_content .content_details_middle .proname{
    font-size:14px;
    color:#111;
    font-weight:600;
  }
  .car_carlist .car_listshow .show_content .content_details_middle .proprice{
    display:flex;
    margin-top:20px;
    align-items: center;
  }
  .car_carlist .car_listshow .show_content .content_details_middle .proprice .price{
    font-size:14px;
    color:#f70d2d;
  }
  .car_carlist .car_listshow .show_content .content_details_middle .proprice .type{
    font-size:12px;
    color:#aaa;
    margin-left:30px;
  }
  .procount{
    position:relative;
    margin-top:10px;
  }
  .procount>input{
    width:100px;
    height:32px;
    margin-top:-15px;
    margin-bottom:0;
    text-align: center;
  }
  .reduce{
    position:absolute;
    top:-3px;
    left:2px;
  }
  .increase{
    position:absolute;
    top:-3px;
    left:72px;
  }
  .priceSum{
    color:#ff7b39;
    font-size:12px;
    font-weight: bold;
    margin-top:-16px;
    margin-left:110px;
  }
  .car_carlist .car_listshow .show_content .content_del_right{
    font-size:14px;
    color:#111;
    display:flex;
    justify-content:flex-end;
    align-items: center;
    flex-grow: 1;
  }
  .car_carlist .car_listshow .show_content .content_del_right>div{
    /* margin-right:30px; */
    white-space:nowrap;
  }
  .car_carlist .listshow_priceAllSum{
    margin-top:20px;
    background-color:#fff;
  }
  .car_carlist .listshow_priceAllSum .AllSum{
    padding:20px;
  }
  .car_carlist .listshow_priceAllSum .AllSum .all_details{
    font-size:14px;
    color:#111;
    display:flex;
    justify-content:flex-end;
  }
  .car_carlist .listshow_priceAllSum .AllSum .all_details .select{
    margin-right:30px;
  }
  .car_carlist .listshow_priceAllSum .AllSum .submitBtn{
    display:flex;
    justify-content: flex-end;
    margin-top:20px;
  }
  .car_carlist .listshow_priceAllSum .AllSum .submitBtn>a{
    display: block;
    width:170px;
    height:46px;
    background-color:#ff7b39;
    font-size:18px;
    color:#fff;
    text-align: center;
    line-height:46px;
    font-weight: 700;
    border-radius:2px;
  }
  .bottomend{
    position:fixed;
    width:100%;
    left:0;
    bottom:60px;
    margin-top:10px;
    z-index:10;
    border:2px solid rgba(255,123,57,.3);
  }
  .lastone{
    margin-bottom:150px;
  }
  .selectedimg:before{
    display:block;
    position:relative;
    content:"";
    background-image:url("../../assets/show/selected.png");
    height:20px;
    width:20px;
    bottom:4px;
  }
</style>