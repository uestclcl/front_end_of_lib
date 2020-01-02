import i18n from '../i18n/index'
const iLogin = i18n.login
const app = getApp()
const iGetUserInfo = i18n.get_user_info

Page({
  data: {
    book: '../../image/book.png',
    book1: '../../image/book1.jpg',
    book2: '../../image/book2.jpg',
    book3: '../../image/book3.jpg',
    
    usname:'用户',
    bookname: '书名',
    author: '作者',
    date: '上架日期',
    state: '状态',
    avalible: "可借图书",
    lended: "已借图书",
    hasLogin: false,
    code: tt.getStorageSync('login.code'),
    ...iLogin,
    		hasUserInfo: false,
		withCredentials: false,
		userInfo: {},
		rawData: "",
		signature: "",
		encryptedData: "",
		iv: "",
		...iGetUserInfo
  },
// -------------------------------------------
	getUserInfo: function () {
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
			}, fail: function () {
				console.log(`login fail`);
			}
		});

		console.log('getUserInfo end')
	},  
// -------------------------------------------
// checkSession: function () {
//     tt.checkSession({
//       success: res => {
//         console.log(JSON.stringify(res))
//         tt.showModal({
//           title: 'success',
//         })
//       },
//       fail: res => {
//         console.log(JSON.stringify(res))
//         tt.showModal({
//           title: 'fail',
//         })
//       }
//     })
//   },
  
  onLoad: function () {
    console.log('Welcome to Mini Code')

    var that = this;
    
 // ----------------------------------------
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
			}, fail: function () {
				console.log(`login fail`);
			}
		});

		console.log('getUserInfo end')
// -----------------------------------------

    // tt.checkSession({
    //   success: function () {
    //     console.log('session not expired.');
    //     that.setData({
    //       hasLogin: true
    //     });
    //   },
    //   fail: function () {
    //     console.log('session expired');
    //     that.setData({
    //       hasLogin: false
    //     });
    //   }
    // })
  },
borrowBook: function (e) {
// console.log(tt.usname);
// console.log(userInfo.nickName);
// console.log({{userInfo.nickName}});
console.log("请求借书");
  },


  login: function () {
    var that = this
    tt.login({
      success: function (res) {
        if (res.code) {
          that.setData({
            hasLogin: true,
            code: res.code
          });

          try {
            tt.setStorageSync('login.code', res.code);
          } catch (error) {
            console.log(`setStorageSync failed`);
          }

        } else {
          tt.showModal({
            title: 'function call success, but login failed.'
          });
        }
      },
      fail: function () {
        tt.showModal({
          title: 'login failed.'
        });
      }
    })
  }
})
