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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    cartModel.execStorage(this.data.cartData)
  },

  /**
   * 获取初始数据
   */
  _loadData() {
    let cartData = cartModel.getCartDataFromLocal()
    let cartCountsAndPrices = cartModel.getCountsAndPrice(cartData)

    let totalSelected = true
    for (const value of cartData) {
      if (value.status == false) {
        totalSelected = false
        break
      }
    }

    this.setData({
      cartData,
      cartCounts: cartCountsAndPrices.counts,
      cartPrices: cartCountsAndPrices.price,
      totalSelected
    })
  },
  
  /**
   * 更新购物车数据
   */
  _updataCart() {
    let cartCountsAndPrices = cartModel.getCountsAndPrice(this.data.cartData, true)

    this.setData({
      cartData: this.data.cartData,
      cartCounts: cartCountsAndPrices.counts,
      cartPrices: cartCountsAndPrices.price
    })
  },
  
  /**
   * 商品选中点击事件
   *
   * @param   {object}  event  获得的事件对象
   */
  onProductStuats(event) {
    let index = cartModel.getElementValue(event, 'index')
    this.data.cartData[index].status = !this.data.cartData[index].status
    
    let totalSelected = true
    for (const value of this.data.cartData) {
      if (value.status == false) {
        totalSelected = false
        break
      }
    }

    this.setData({
      totalSelected
    })
    this._updataCart()
  },

  /**
   * 点击全选按钮
   */
  onTotalSelected() {
    for (const key in this.data.cartData) {
      this.data.cartData[key].status = !this.data.totalSelected
    }

    this.setData({
      totalSelected: !this.data.totalSelected
    })
    this._updataCart()
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
    }

    if (change == 'add' && this.data.cartData[index].counts > 0) {
      this.data.cartData[index].counts += 1
    }

    this._updataCart()
  },

  /**
   * 删除商品
   *
   * @param   {object}  event  事件对象
   */
  cartDelete(event) {
    let index = cartModel.getElementValue(event, 'index')
    this.data.cartData.splice(index, 1)
    this._updataCart()
  },

  /**
   * 跳转到商品详情
   *
   * @param   {object}  event  时间对象
   */
  productDetail(event) {
    let id = cartModel.getElementValue(event, 'id')
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  
  /**
   * 提交订单
   */
  submitOrder() {
    wx.navigateTo({
      url: '../order/order?orderPrices=' + this.data.cartPrices
    })
  }
})