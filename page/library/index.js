import i18n from '../i18n/index'
const swiper = i18n.swiper
const app = getApp()

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
  },

  
})
