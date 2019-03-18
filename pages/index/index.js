//index.js
//获取应用实例
import {IndexModel} from 'indexModel.js'
const app = getApp()
let indexmodel = new IndexModel()

Page({
  data: {
    // bannerInfo: '',
    // themeInfo : '',
    // recentInfo: ''
  },

  onLoad: function () {
    this._loadData()
  },

  /**
   * 获取首页数据
   */
  _loadData(){
    /**
     * 获取Banner
     */
    // let url = 'v1/banner/1'
    indexmodel.getData('v1/banner/1', (res)=>{
      // console.log(res)
      this.setData({
        bannerInfo: res.banner_item
      })
    })

    /**
     * 获取主题列表
     */
    indexmodel.getData('v1/theme?ids=1,2,3', (res) => {
      // console.log(res)
      this.setData({
        themeInfo: res
      })
    })

    /**
     * 获取最近新品
     */
    indexmodel.getData('v1/product/recent', (res) => {
      // console.log(res)
      this.setData({
        recentInfo: res
      })
    })
  },

  /**
   * 点击商品
   */
  onProductItemTap(event){
    let id = indexmodel.getElementValue(event, 'id')
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  /**
   * 点击专题
   */
  onThemeItemTap(event) {

    let id = indexmodel.getElementValue(event, 'id')
    let description = indexmodel.getElementValue(event, 'description')
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&description=' + description
    })
  }
})
