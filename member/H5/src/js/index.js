require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {
	console.log(mui)


	function init() {
		getUser() //获取信息
		lookClick() //点击事件
	}

	function getUser() {
		mui.ajax('api/getUser', {
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				console.log(res)
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
			}
		});
	}

	function lookClick() {
		//查看
		mui(".list").on('tap', '.look', function() {
			let id = this.getAttribute("data-id")
			localStorage.setItem("id",id);
			window.location.href = "../page/details.html"

		})
		//删除
		mui(".list").on('tap', '.delete', function() {
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
