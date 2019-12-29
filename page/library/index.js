const app = getApp()

Page({
  data: {
    book:'../../image/book.png',
    avi:'可借阅图书',
    lended:'借出图书',
    date:'上架日期',
    state:'状态'
  },

  onLoad: function () {
    console.log('Welcome to Mini Code')
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
  }
})
