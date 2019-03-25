import { CartModel } from './cartModel.js'
let cartModel = new CartModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: '',
    cartCounts: 0,
    cartPrices: 0,
    totalSelected: true
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._loadData()
  },

  /**
   * 获取初始数据
   */
  _loadData() {
    let cartData = cartModel.getCartDataFromLocal()
    let cartCounts = this.getCartSelectedCounts()
    let cartPrices = this.getCartSelectedPrices()

    let totalSelected = true
    for (const value of cartData) {
      if (value.status == false) {
        totalSelected = false
        break
      }
    }

    this.setData({
      cartData,
      cartCounts,
      cartPrices,
      totalSelected
    })

    console.log(this.data.cartData);
    
  },

  /**
   * 商品选中点击事件
   *
   * @param   {object}  event  获得的事件对象
   */
  onProductStuats(event) {
    let index = cartModel.getElementValue(event, 'index')
    this.data.cartData[index].status = !this.data.cartData[index].status
    wx.setStorageSync('cart', this.data.cartData)
    this.setData({
      totalSelected: true
    })
    for (const value of this.data.cartData) {
      if (value.status == false) {
        this.setData({
          totalSelected: false
        })
        break
      }
    }

    this._loadData()
  },

  /**
   * 获取选中商品数量
   *
   * @return  {Number}  返回商品数量
   */
  getCartSelectedCounts() {
    let cartCounts = cartModel.getCartCounts(true)
    return cartCounts
  },

  /**
   * 获取选中商品价格
   *
   * @return  {Number}  返回商品价格
   */
  getCartSelectedPrices() {
    let cartPrices = cartModel.getCartPrices()
    return cartPrices
  },

  /**
   * 点击全选按钮
   */
  onTotalSelected() {
    for (const key in this.data.cartData) {
      this.data.cartData[key].status = !this.data.totalSelected
    }
    wx.setStorageSync('cart', this.data.cartData)

    this.setData({
      totalSelected: !this.data.totalSelected
    })
    this._loadData() 
  },

  /**
   * 修改商品数量
   *
   * @param   {object}  event  事件对象
   */
  cartChangeCounts(event) {
    let index = cartModel.getElementValue(event, 'index')
    let change = cartModel.getElementValue(event, 'change')
    if (change == 'reduce' && this.data.cartData[index].counts > 1) {
      this.data.cartData[index].counts -= 1      
      wx.setStorageSync('cart', this.data.cartData)
      this._loadData()
    }

    if (change == 'add' && this.data.cartData[index].counts > 0) {
      this.data.cartData[index].counts += 1      
      wx.setStorageSync('cart', this.data.cartData)
      this._loadData()
    }
  },

  cartDelete(event) {
    let index = cartModel.getElementValue(event, 'index')
    this.data.cartData.splice(index, 1)
    wx.setStorageSync('cart', this.data.cartData)
    this._loadData()
  }
})