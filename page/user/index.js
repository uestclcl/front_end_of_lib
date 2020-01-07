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

		bookList: [],

		...iGetUserInfo
	},

	onLoad: function () {
		var that = this;
		console.log('getUserInfo start');
		tt.login({
			success: function (res) {
				//获取借阅图书
				that.getBorrowedBooks();
				tt.getUserInfo({
					withCredentials: that.data.withCredentials,
					success: function (res) {
						console.log('getUserInfo success')
						console.log(arguments);
						tt.showToast({
							title: 'success',
							showCancel: false
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
			}, fail: function () {
				console.log(`login fail`);
			}
		});

		console.log('getUserInfo end')
	},

	//绑定还书事件
	onReturnBook: function (e) {
		console.log('还书事件');
		let bookId = e.currentTarget.dataset.id;
		this.returnBook(bookId);
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
	//获取用户的借阅信息
	getBorrowedBooks: function () {
		console.log("获取借阅的图书");
		let that = this;
		tt.request({
			url: 'http://localhost:8080/users/books/borrowed/', // 目标服务器url
			data: {
				sessionId: tt.getStorageSync('session_id')
			},
			success: (res) => {
				that.setData({
					bookList: res.data
				})
			}
		});
	},
	//还书
	returnBook: function (bookId) {
		console.log('还书');
		let that = this;
		tt.request({
			url: 'http://localhost:8080/users/book/' + bookId, // 目标服务器url
			method: 'PUT',
			success: (res) => {
				let list = that.data.bookList;
				for (let i in list) {
					if (list[i].bookId == bookId) {
						list.splice(i, 1);//i表示删除元素的位置，1表示删除个数
					}
				}
				tt.setStorageSync('updated', true);
				that.setData({
					bookList: list
				}),
					tt.showModal({
						title: res.data,
						showCancel: false
					});
			}
		});
	}
})
