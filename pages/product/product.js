import {ProductModel} from 'productModel.js'
let productModel = new ProductModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: '',
    counts:[1, 2, 3, 5],
    productCounts: 1,
    main_nav_click:''
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

  getOptionVal(event){
    this.setData({
      productCounts: this.data.counts[event.detail.value]
    })
  },

  onTabsItem(event) {
    let index = productModel.getElementValue(event, 'index')
    this.setData({
      main_nav_click: index
    })
  },
})