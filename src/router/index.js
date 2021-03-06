import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件，把路由关联到vue。固定要加的
Vue.use(VueRouter)

// 路由配置
const routes = [
	{
		path: "/login",
		// 除了首页之外的页面都可以用懒加载,@符号代表的src这个目录
		// .vue这个扩展名可以忽略
		component: () => import("@/views/Login")
	},
	// 注册页路由
	{
		path: "/register",
		component: () => import("@/views/Resgister")

	}, 
	// 个人中心路由
	{
		path: "/personal",
		component: () => import("@/views/Personal"),
		// meta可以自定义数据，可以选择在路由上任意添加自己的数据
		meta:{
			// 代表这个页面需要授权
			authorization:true
		}
	},
	// 个人信息
	{
		path:"/edit-profile",
		component:()=>import("@/views/EditProfile"),
		// meta可以自定义数据，可以选择在路由上任意添加自己的数据
		meta:{
			// 代表这个页面需要授权
			authorization:true
		}

	},
	// 我的关注页路由
	{
		path:"/follow",
		component:()=>import("@/views/Follow"),
		// meta可以自定义数据，可以选择在路由上任意添加自己的数据
		meta:{
			// 代表这个页面需要授权
			authorization:true
		}

	},
	// 我的跟帖页路由
	{
		path:"/comments",
		component:()=>import("@/views/Comments"),
		// meta可以自定义数据，可以选择在路由上任意添加自己的数据
		meta:{
			// 代表这个页面需要授权
			authorization:true
		}

	},
	// 我的跟帖页路由
	{
		path:"/star",
		component:()=>import("@/views/Star"),
		// meta可以自定义数据，可以选择在路由上任意添加自己的数据
		meta:{
			// 代表这个页面需要授权
			authorization:true
		}

	},{
		path:"/",
		component:()=>import("@/views/Index"),
	},{
		path:"/category",
		component:()=>import("@/views/Category"),
	},
	{
		path:"/search",
		component:()=>import("@/views/Search"),
	},
	{
		// 文章详情页
		path:"/post/:id",
		component:()=>import("@/views/Post"),
	},
	{
		// 视频文章详情页
		path:"/video/:id",
		component:()=>import("@/views/Video"),
	},
	{
		// 视频文章详情页
		path:"/postcomment/:id",
		component:()=>import("@/views/PostComment"),
	}


]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	//路由配置
	routes
})

export default router
