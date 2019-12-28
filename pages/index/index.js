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
    console.log("借书成功");
    tt.request({
      url: '127.0.0.1:8080/', // 目标服务器url
      data:{
        username:'alice',
        password:'123456'
      },
      success: (res) => {
        console.log("request成功")
        
      }
    });
  }
})
