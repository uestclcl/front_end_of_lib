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
