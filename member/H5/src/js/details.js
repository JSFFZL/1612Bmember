require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {

	
	//全局变量
	let uid = localStorage.getItem("id");
	
	function init() {
		getUserDetailt();
	}
	
	///api/getUserDetailt
	function getUserDetailt(){
		mui.ajax('/api/getUserDetailt',{
			data:{
				id:uid
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				console.log(data)
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//详情的业务逻辑

	init();
})
