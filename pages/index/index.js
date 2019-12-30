import i18n from '../../i18n/index'
const iGetUserInfo = i18n.get_user_info
const app = getApp()

Page({
  data: {
    book:'../../images/book.png',
    name:'书名',
    author:'作者',
    date:'上架日期',
    state:'状态'
  },

  onLoad: function () {
    console.log('Welcome to Mini Code')
  },

  onTapLendBook:function(e){
    var that=this;
    console.log("借书成功");
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
    
    tt.request({
      url: 'http://127.0.0.1:8080/user/login', // 目标服务器url
      data:{
        username:'alice',
        password:'123456'
      },
      success: (res) => {
        console.log(res)
        that.setData({
          name:res.data.message
        })
      }
    });
  }
})
