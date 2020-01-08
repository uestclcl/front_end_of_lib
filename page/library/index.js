import i18n from '../i18n/index'
const swiper = i18n.swiper
const app = getApp()
const pageSize=2;

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
    loading:false,
    loaded:false,

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
    this.getUnBorrowedBooks();
  },

  onShow:function(){
    //如果图书信息更新过，则重新加载图书
    if(tt.getStorageSync('updated')==true){
      this.setData({
      pageNum:1,
      loading:false,
      loaded:false
    })
    this.getUnBorrowedBooks();
    tt.setStorageSync('updated', false);
    }
  },

  //上拉加载更多
  onReachBottom:function(){
    console.log("上拉刷新事件");
    let that=this;
    that.gainMoreListData();
  },

  //获取更多列表数据
  gainMoreListData:function(){
    let that=this;
    let loaded=that.data.loaded;
    if(loaded==true) return;
    let pageNum=++that.data.pageNum;
    tt.request({
      url: 'http://120.26.91.143:8080/users/books/unBorrowed', // 目标服务器url
      data:{
        pageNum:pageNum,
        pageSize:pageSize
      },
      success: (res) => {
        if(res.data.list.length!==0){
          let list=that.data.bookList.concat(res.data.list);
          that.setData({
            bookList:list,
            pageNum:pageNum,
            loading:true
          })
        }else{//list为空
          console.log('list为空');
          that.setData({
            loading:false,
            loaded:true
          })
        }
      }
    });
  },
  
  //点击图书事件
  onBorrowBook:function(e){
    console.log(e);
    let bookId=e.currentTarget.dataset.id;
    tt.setStorageSync('book_id', bookId);
    tt.switchTab({
      url: '/page/index/index' // 指定页面的url
    });
  },
  
  //获取图书列表
  getUnBorrowedBooks:function(){
    let that=this;
    tt.request({
      url: 'http://120.26.91.143:8080/users/books/unBorrowed', // 目标服务器url
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
