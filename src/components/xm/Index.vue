<template>
    <div class="index_content">
			<div class="top">
				<mt-tab-container v-model="selected" class="page-tabbar-container">
					<mt-tab-container-item id="index" class="itemone">
						<div class="top_banner">
							<div class="islogin">
								{{login_title}}<span class="btn_login" @click="loginin">{{login_state}}</span><span @click="loginout">{{login_out}}</span>
							</div>
							<mt-swipe style="width:100%;height:275px" :auto="3000">
									<mt-swipe-item><img style="width:100%;height:100%" src="../../assets/index/banner1.jpg" alt=""></mt-swipe-item>
									<mt-swipe-item><img style="width:100%;height:100%" src="../../assets/index/banner2.jpg" alt=""></mt-swipe-item>
									<mt-swipe-item><img style="width:100%;height:100%" src="../../assets/index/banner3.jpg" alt=""></mt-swipe-item>
									<mt-swipe-item><img style="width:100%;height:100%" src="../../assets/index/banner4.jpg" alt=""></mt-swipe-item>
									<mt-swipe-item><img style="width:100%;height:100%" src="../../assets/index/banner5.jpg" alt=""></mt-swipe-item>
							</mt-swipe>
						</div>      
						<div class="list_nav">
								<ul>
										<li><a href="">品牌故事</a></li>
										<li><a href="">全部产品</a></li>
										<li><a href="">最新活动</a></li>
								</ul>
								<ul>
										<li><a href="">积分兑换</a></li>
										<li><a href="">在线预约</a></li>
										<li><a href="">门店查询</a></li>
								</ul>
						</div>
						<div class="search">
							<img class="myimg" src="../../assets/index/search.png" alt="">
							<input type="text" style="width:90%;padding-left:45px;font-size:14px;" placeholder="搜索商品">
						</div>
						<div class="content_a">
							<a href=""><img src="../../assets/index/content1.jpg" width="100%" alt=""></a>
							<a href=""><img src="../../assets/index/content2.jpg" width="100%" alt=""></a>
							<a href=""><img src="../../assets/index/content3.jpg" width="100%" alt=""></a>
						</div>

						<div class="container">
							<div class="content" v-for="(item,index) of list" :key="index">
								<div class="content_img"><img :src="`http://127.0.0.1:3000/`+item.pic" alt=""></div>
								<div class="content_details">{{item.details}}</div>
								<div class="content_price">
									<div class="price">¥{{item.price}}</div>
									<div class="shopp" @click="showProduct(item.id)"><img src="../../assets/index/shopp.png" alt=""></div>
								</div>
							</div>
						</div>	
						<div class="footer">
							<ul>
								<li><a href="" style="color:#f00;">店铺主页</a></li>
								<li><a href="">会员中心</a></li>
								<li><a href="">关于我们</a></li>
								<li><a href="">店面查询</a></li>
								<li><a href="">反馈中心</a></li>
							</ul>
							<div class="footer_logo">
								<img src="../../assets/index/logo.png" alt="">
							</div>
							<div class="footer_font">
								Webmeng 提供技术支持
							</div>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="show">
						<show v-on:tiao="zhuan"></show>
					</mt-tab-container-item>
					<mt-tab-container-item id="car" class="itemone">
						<car v-on:toparent="forchild"></car>
					</mt-tab-container-item>
					<mt-tab-container-item id="me">
						<user></user>
					</mt-tab-container-item>
				</mt-tab-container>			
			</div>        
			<div class="bottom">
				<mt-tabbar v-model="selected" fixed>
					<mt-tab-item id="index" @click.native="changeState(0)">
						<tabbaricon :selectedImage="require('../../assets/home_selected.png')" :normalImage="require('../../assets/home_select.png')" :focused="currentIndex[0].isSelect"></tabbaricon><span class="font_icon">主页</span>
					</mt-tab-item>
					<mt-tab-item id="show" @click.native="changeState(1)">
						<tabbaricon :selectedImage="require('../../assets/shopper_selected.png')" :normalImage="require('../../assets/shopper_select.png')" :focused="currentIndex[1].isSelect"></tabbaricon><span class="font_icon">商品展示</span>
					</mt-tab-item>
					<mt-tab-item id="car" @click.native="changeState(2)">
						<tabbaricon :selectedImage="require('../../assets/cart_selected.png')" :normalImage="require('../../assets/cart_select.png')" :focused="currentIndex[2].isSelect"></tabbaricon><span class="font_icon">购物车</span>
					</mt-tab-item>
					<mt-tab-item id="me" @click.native="changeState(3)">
						<tabbaricon :selectedImage="require('../../assets/user_selected.png')" :normalImage="require('../../assets/user_select.png')" :focused="currentIndex[3].isSelect"></tabbaricon><span class="font_icon">我的</span>
					</mt-tab-item>
				</mt-tabbar>
			</div>
    </div>
</template>

<script>
import login from "./Login"
import tabbaricon from "./common/Tabbaricon"
import user from "./User"
import show from "./Show"
import car from "./Car"
export default {
    data(){
        return {
					selected:"index",
					message:"",
					login_title:"你好，欢迎",
					login_state:"登陆",
					login_out:"",
					list:[],
					currentIndex:[{isSelect:true},{isSelect:false},{isSelect:false},{isSelect:false}]
				}
		},
		components:{
			login,
			tabbaricon,
			user,
			show,
			car,
		},
		methods:{
			forchild(message){
				this.selected=message;
				this.changeState(0);
			},
			changeState(n){
				for(var i=0;i<this.currentIndex.length;i++){
					if(i==n){
						this.currentIndex[i].isSelect=true;
					}else{
						this.currentIndex[i].isSelect=false;
					}
				}
			},
			zhuan(message){
				this.selected=message;
			},
			loadmore(){
				var url="loadmore";
				this.axios.get(url).then(res=>{
					for(var item of res.data.data){
						this.list.push(item);
					}					
				})
			},
			showProduct(id){
				if(sessionStorage.getItem("userName")){
					this.$router.push("/product/"+id)
				}else{
					this.$toast({
						message:"请先登录",
					})
					var t=setTimeout(()=>{
						this.$router.push("/login");
					},1500)							
				}		
			},
			loginout(){
				sessionStorage.clear();
				this.$router.go(0);
			},
			loginin(){
				if(sessionStorage.getItem("userName")){
					return;
				}else{
					this.$router.push("/login");
				}
			}
		},
		created(){
			this.loadmore();
			console.log(this.list);
			var islogin=sessionStorage.getItem("userName");
			if(islogin){
				this.login_title="欢迎回来";
				this.login_state=islogin;
				this.login_out="退出";
			}
		}	
}
</script>

<style scoped>
	.islogin{
		display:flex;
		justify-content: flex-end;
		font-size:16px;
		font-weight: 700;
		padding:10px;
		color:#bfc3c3;
		background-color:#f8f8f8;
	}
	.islogin .btn_login{
		margin:0 10px;
		color:#f60;
		font-weight: 900;
	}
	.font_icon{
		color:rgba(51,51,51,.6);
		font-size:14px;
		font-weight: bold;
	}
	.itemone{
		background-color:#f8f8f8;
	}
	.top_banner{
		width:100%;
	}
	.list_nav{
		margin-top:10px;
	}
	.list_nav ul{
		display:flex;
		justify-content:center;
	}
	.list_nav ul li{
		padding:20px 30px;
	}
	.list_nav ul li>a{
		color:#333;
		font-size:16px;
		padding-bottom:5px;
		border-bottom:2px solid #b4b4b4;
	}
	.search{
		position:relative;
		display:flex;
		justify-content: center;
	}
	.myimg{
		position:absolute;
		display:flex;
		width:24px;
		height:24px;
		top:50%;
		left:8%;
		margin-top:-19px;
	}
	.container{
		display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
	}
	.content{
		display:flex;
		flex-direction:column;
		justify-content: space-between;
		background-color:#fff;
		width:48%;
		margin:2px 3px;
    padding:2px;
	}
	.content .content_img>img{
		width:100%;
	}
	.content .content_details{
		color:#333;
		font-size:13px;
	}
	.content .content_price{
		display:flex;
		justify-content:space-between;
		align-items:center;
		font-size:13px;
		color:#f60;
	}
	.footer{
		margin-top:50px;
	}
	.footer ul{
		display:flex;
		justify-content:center;
		font-size:12px;
	}
	.footer ul li>a{
		color:#333;
		padding:0 10px;
	}
	.footer_logo,.footer_font{
		display:flex;
		justify-content:center;
		margin-top:10px;
		color:#bfc3c3;
		font-size:12px;
	}
</style>