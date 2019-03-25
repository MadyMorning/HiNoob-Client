import { CategoryModel } from './categoryModel.js'
let categorymodel = new CategoryModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryInfo: '',
    categoryIndex: 0,
    categoryByProducts:''
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
      this.setData({
        categoryInfo: res,
      })
      
      categorymodel.getData('v1/category/' + res[0].id, (res) => {
        this.setData({
          categoryByProducts: res
        })
      })

    })
  },

  /**
   * 点击分类TAB
   *
   * @param   {object}  event  点击元素获取到的event
   */
  onCategoryTab(event) {
    let id = categorymodel.getElementValue(event, 'id')
    let index = categorymodel.getElementValue(event, 'index')

    categorymodel.getData('v1/category/' + id, (res) => {
      this.setData({
        categoryByProducts: res
      })
    })

    this.setData({
      categoryIndex: index
    })
  },

  /**
   * 点击商品
   * 
   * @param {object} event 点击商品获取到的event
   */
  onProductItemTap(event) {
    let id = categorymodel.getElementValue(event, 'id')
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
})