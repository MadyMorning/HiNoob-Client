import { CategoryModel } from './categoryModel.js'
let categorymodel = new CategoryModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryInfo: '',
    // categoryID: '',
    categoryIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  /**
   * 获取分类数据
   */
  _loadData() {
    categorymodel.getData('v1/category', (res) => {
      console.log(res);
      this.setData({
        categoryInfo:res
      })
    })
  },

  /**
   * 点击分类TAB
   *
   * @param   {object}  event  点击元素获取到的event
   *
   * @return  {[type]}         [return description]
   */
  onCategoryTab(event) {
    let id = categorymodel.getElementValue(event, 'id')
    let index = categorymodel.getElementValue(event, 'index')
    this.setData({
      categoryIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})