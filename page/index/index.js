import i18n from '../i18n/index'
const iLogin = i18n.login
const app = getApp()

Page({
  data: {
    book:'../../image/book.png',
    name:'书名',
    author:'作者',
    date:'上架日期',
    state:'状态',
    avalible:"可借图书",
    lended:"已借图书"

  },

  onLoad: function () {
    console.log('Welcome to Mini Code')

    var that = this;
		tt.checkSession({
			success: function () {
				console.log('session not expired.');
				that.setData({
					hasLogin: true
				});
			},
			fail: function () {
				console.log('session expired');
				that.setData({
					hasLogin: false
				});
  		}
		})
  },

  onTapLendBook:function(e){
    var that=this;
    console.log("借书成功");
    tt.request({
      url: 'http://localhost:8080/user/login', // 目标服务器url
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
  },
  

  data: {
		hasLogin: false,
		code: tt.getStorageSync('login.code'),
		...iLogin
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
					
					try{
	          tt.setStorageSync('login.code', res.code);
					}catch(error){
            console.log(`setStorageSync failed`);
					}
				
				} else {
					tt.showModal({
						title: 'function call success, but login failed.'
					});
				}
      },
			fail: function (){
				tt.showModal({
					title: 'login failed.'
				});
			}
    })
  }
})
