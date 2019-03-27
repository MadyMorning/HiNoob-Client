import { ProductModel } from 'productModel.js'
import { CartModel } from '../cart/cartModel.js'
let productModel = new ProductModel()
let cartModel = new CartModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: '',
    counts:[1, 2, 3, 5],
    productCounts: 1,
    main_nav_click: '',
    quantity: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData(options.id)
    this.getCartCounts();
  },

  /**
   * 获取商品信息
   * 
   * @param {string} id 要获取的商品ID
   */
  _loadData(id){
    productModel.getData('v1/product/' + id, (res)=>{
      this.setData({
        productInfo: res
      })
    })
  },

  /**
   * 商品选择的数量
   * 
   * @param {object} event 点击option获取到的event
   */
  getOptionVal(event){
    this.setData({
      productCounts: this.data.counts[event.detail.value]
    })
  },

  /**
   * 商品详情导航
   * 
   * @param {object} event 点击导航获取到的event
   */
  onTabsItem(event) {
    let index = productModel.getElementValue(event, 'index')
    this.setData({
      main_nav_click: index
    })
  },

  /**
   * 加入购物车
   *
   */
  OnAddToCart() {
    // 验证用户是否登录
    cartModel.checkLogin()

    let keys = ['id', 'image', 'name', 'price']
    let productInfo = {};
    for (let key in this.data.productInfo) {
      if (keys.indexOf(key) >= 0) {
        productInfo[key] = this.data.productInfo[key]
      }
    }
    
    // 添加到购物车
    cartModel.addCart(productInfo, this.data.productCounts)
    this.setData({
      quantity: this.data.quantity + this.data.productCounts
    })
  },

  /**
   * 获取购物车总数
   */
  getCartCounts() {
    let cartData = cartModel.getCartDataFromLocal()
    let quantity = (cartModel.getCountsAndPrice(cartData)).counts
    this.setData({
      quantity
    })
  },

  /**
   * 跳转到购物车
   */
  onCart() {
    wx.switchTab({
      url: '../cart/cart'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})