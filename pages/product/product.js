import {ProductModel} from 'productModel.js'
let productModel = new ProductModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // productInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData(options.id)
  },

  _loadData(id){
    productModel.getData('v1/product/' + id, (res)=>{
      console.log(res)
      this.setData({
        productInfo: res
      })
    })
  },
})