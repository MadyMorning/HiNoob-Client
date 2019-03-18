import { ThemeModel } from 'themeModel.js'
let thememodel = new ThemeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData(options.id)
    this.data.description = options.description
  },

  onReady: function (){
    wx.setNavigationBarTitle({
      title: this.data.description,
    })
  },

  _loadData(id){
    thememodel.getData('v1/theme/' + id, (res)=>{
      // console.log(res)
      this.setData({
        themeInfo:res
      })
    })
  }
})