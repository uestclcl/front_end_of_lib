import i18n from '../i18n/index'
const iGetUserInfo = i18n.get_user_info

var app = getApp()
Page({
	data: {
		hasUserInfo: false,
		withCredentials: false,
		userInfo: {},
		rawData: "",
		signature: "",
		encryptedData: "",
		iv: "",
		
		bookList:[],

		...iGetUserInfo
	},

  	onLoad: function () {
    	var that = this;
		console.log('getUserInfo start');
		tt.login({
			success: function (res) {
				tt.getUserInfo({
					withCredentials: that.data.withCredentials,
					success: function (res) {
						console.log('getUserInfo success')
						console.log(arguments);
						tt.showToast({
							title: 'success'
						});
						that.setData({
							hasUserInfo: true,
							userInfo: res.userInfo,
							rawData: res.rawData ? res.rawData : "",
							signature: res.signature ? res.signature : "",
							encryptedData: res.encryptedData ? res.encryptedData : "",
							iv: res.iv ? res.iv : ""
						});
					},
					fail() {
						console.log('getUserInfo fail')
					}
				});
				that.getBorrowedBooks();
			}, fail: function () {
				console.log(`login fail`);
			}
		});

		console.log('getUserInfo end')
  	},

	onViewBook:function(e){
		console.log('查看图书事件');
		let bookId=e.currentTarget.dataset.id;
		tt.setStorageSync('book_id', bookId);
    	tt.switchTab({
      		url: '/page/index/index' // 指定页面的url
    	});
	},

	clear: function () {
		this.setData({
			hasUserInfo: false,
			userInfo: {},
			rawData: "",
			signature: "",
			encryptedData: "",
			iv: ""
		})
	},
	changeCrendentials(e) {
		this.setData({
			withCredentials: e.detail.value
		});
	},
	getBorrowedBooks:function(){
		console.log("获取借阅的图书");
		let that=this;
		tt.request({
		  url: 'http://localhost:8080/users/books/borrowed/', // 目标服务器url
		  data:{
			  sessionId:tt.getStorageSync('session_id')
		  },
		  success: (res) => {
			  that.setData({
				  bookList:res.data
			  })
		  }
		});
	},

})
