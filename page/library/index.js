import i18n from '../i18n/index'
const swiper = i18n.swiper
const app = getApp()
const pageSize=3;

Page({
  data: {
    book: '../../image/book.png',
    book1: '../../image/book1.jpg',
    book2: '../../image/book2.jpg',
    book3: '../../image/book3.jpg',
    avi: '可借阅图书',
    lended: '借出图书',
    date: '上架日期',
    state: '状态',

    pageNum:1,
    bookList:[],

    background: ['demo-text-1'],
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    ...swiper
  },

  checkSession: function () {
    tt.checkSession({
      success: res => {
        console.log(JSON.stringify(res))
        tt.showModal({
          title: 'success',
        })
      },
      fail: res => {
        console.log(JSON.stringify(res))
        tt.showModal({
          title: 'fail',
        })
      }
    })
  },

  onLoad: function () {
    console.log('Welcome to Mini Code')
    this.getUnBorrowedBooks();
  },
  //下拉刷新
  onPullDownRefresh:function(){
    let that=this;
    let pageNum=that.data.pageNum+1;
    that.getUnBorrowedBooks();
    that.setData({
      pageNum:pageNum
    })
  },
  //点击图书事件
  onBorrowBook:function(e){
    console.log(e)
  },
  getUnBorrowedBooks:function(){
    let that=this;
    tt.request({
      url: 'http://localhost:8080/users/books/unBorrowed', // 目标服务器url
      data:{
        pageNum:that.data.pageNum,
        pageSize:pageSize
      },
      success: (res) => {
        that.setData({
          bookList:res.data.list
        })
      }
    });
  }
})
