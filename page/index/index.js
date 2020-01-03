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
    bookname: '程序员的自我修养',
    bookId:'12345',
    author: '蒲云强',
    addedTime: '2019-12-11',
    state: '可借',
    avalible: "可借图书",
    lended: "已借图书",
    submit:"借书",
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
	// getUserInfo: function () {
	// 	var that = this;
	// 	console.log('getUserInfo start');
	// 	tt.login({
	// 		success: function (res) {
	// 			tt.getUserInfo({
	// 				withCredentials: that.data.withCredentials,
	// 				success: function (res) {
	// 					console.log('getUserInfo success')
	// 					console.log(arguments);
	// 					tt.showToast({
	// 						title: 'success'
	// 					});
	// 					that.setData({
	// 						hasUserInfo: true,
	// 						userInfo: res.userInfo,
	// 						rawData: res.rawData ? res.rawData : "",
	// 						signature: res.signature ? res.signature : "",
	// 						encryptedData: res.encryptedData ? res.encryptedData : "",
	// 						iv: res.iv ? res.iv : ""
	// 					});
	// 				},
	// 				fail() {
	// 					console.log('getUserInfo fail')
	// 				}
	// 			});
	// 		}, fail: function () {
	// 			console.log(`login fail`);
	// 		}
	// 	});

	// 	console.log('getUserInfo end')
	// },  
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
  
//   onLoad: function () {
//     console.log('Welcome to Mini Code')

//     var that = this;

    
//  // ----------------------------------------
//     console.log('getUserInfo start');
// 		tt.login({
// 			success: function (res) {
// 				tt.getUserInfo({
// 					withCredentials: that.data.withCredentials,
// 					success: function (res) {
// 						console.log('getUserInfo success')
// 						console.log(arguments);
// 						tt.showToast({
// 							title: 'success'
// 						});
// 						that.setData({
// 							hasUserInfo: true,
// 							userInfo: res.userInfo,
// 							rawData: res.rawData ? res.rawData : "",
// 							signature: res.signature ? res.signature : "",
// 							encryptedData: res.encryptedData ? res.encryptedData : "",
// 							iv: res.iv ? res.iv : ""
// 						});
// 					},
// 					fail() {
// 						console.log('getUserInfo fail')
// 					}
// 				});
// 			}, fail: function () {
// 				console.log(`login fail`);
// 			}
// 		});


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
    // },
borrowBook: function (e) {
console.log(this.data.userInfo.nickName);
// console.log(userInfo.nickName);
// console.log({{userInfo.nickName}});
console.log("请求借书");
  },


// 		console.log('getUserInfo end')
// // -----------------------------------------

//     // tt.checkSession({
//     //   success: function () {
//     //     console.log('session not expired.');
//     //     that.setData({
//     //       hasLogin: true
//     //     });
//     //   },
//     //   fail: function () {
//     //     console.log('session expired');
//     //     that.setData({
//     //       hasLogin: false
//     //     });
//     //   }
//     // })
//   },

  
onBorrowBook: function (e) {
    tt.request({
      url: 'http://localhost:8080/users/book/'+this.data.bookId, // 目标服务器url
      data:{
        sessionId:tt.getStorageSync('session_id')
      },
      success: (res) => {
        if(res.data=='借书成功'){
          
          this.setData({
            submit:'还书',
            state:'已借出'
          })
        }
        tt.showModal({
          title: res.data,
        })
      },
    });
  },

  // *************************************
  onLoad:function(){
    var that=this;
    tt.login({
      success(res){
        if(res.code){
          tt.request({
            url: 'http://localhost:8080/users/login', // 目标服务器url
            data:{
              code:res.code
            },
            success: (res) => {
              if(res.data){
                tt.setStorageSync('session_id', res.data);
                tt.getUserInfo({
                  success:function(res){
                    that.setData({
                      userInfo:res.userInfo
                    })
                  }
                })
              }
            }
          });
        }
      }
    })
  }
})