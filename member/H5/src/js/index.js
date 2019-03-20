require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {
	function init() {
		getUser() //获取信息
		lookClick() //点击事件
		search();
	}
	function search(){
		
		document.querySelector(".search").addEventListener("input",function(){
			var text = document.querySelector(".search").value;
			mui.ajax('/api/getUserSea',{
				data:{
					name:text
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					var str = '';
					res.data.forEach(function(item) {
						str +=
							`<li class="mui-table-view-cell">
							<span>${item.name}</span>
							<button type="button" class="mui-btn mui-btn-primary look" data-id="${item._id}">查看</button>
							<button type="button" class="mui-btn mui-btn-danger delete" data-id="${item._id}">删除</button>
						</li>`
					})
					document.querySelector(".list").innerHTML = str;
					
				},
				error:function(xhr,type,errorThrown){
					
				}
			});
		})
		
		
	}
	function getUser() {
		mui.ajax('api/getUser', {
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				console.log(res)
				reander(res.data);//渲染数据（实参）
			}
		});
	}
	
	//渲染数据方法（形参）
	function reander(resDate){
		var str = '';
		resDate.forEach(function(item) {
			str +=
				`<li class="mui-table-view-cell">
				<span>${item.name}</span>
				<button type="button" class="mui-btn mui-btn-primary look" data-id="${item._id}">查看</button>
				<button type="button" class="mui-btn mui-btn-danger delete" data-id="${item._id}">删除</button>
			</li>`
		})
		document.querySelector(".list").innerHTML = str;
	}

	function lookClick() {
		//查看成员信息（按钮）
		mui(".list").on('tap', '.look', function() {//事件绑定
			let id = this.getAttribute("data-id"); //取按钮的自定义属性值
			localStorage.setItem("id",id); //把值存在本地缓存
			window.location.href = "../page/details.html" //  

		})
		//删除
		mui(".list").on('tap', '.delete', function() {
			//保存当前的this,防止丢失
			let _this = this;
			
			mui.confirm('确定删除？', '警告', ['取消', '确认'], function(e) {
				if (e.index) {
					mui.ajax('/api/deleteUser', {
						data: {
							id: _this.getAttribute("data-id")
						},
						dataType: 'json', //服务器返回json格式数据
						type: 'post', //HTTP请求类型
						timeout: 10000, //超时时间设置为10秒；
						success: function(res) {
							mui.alert(res.msg, function() {
								//删除节点
								_this.parentNode.remove();
							});
						}
					});
				}
			}, 'div')



			



		})
	}




	init();
})
