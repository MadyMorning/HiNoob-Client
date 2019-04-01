import { MyModel } from './myModel.js'
import { OrderModle } from '../order/orderModel.js'
let myModel = new MyModel()
let orderModel = new OrderModle()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || '',
    historyOrders: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (this.data.userInfo) {
      // this.getOrders()
      this.getAllOrders()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let flag = orderModel.hasNewOrder()
    if (this.data.userInfo && flag) {
      // this.getOrders()
      this.getAllOrders()
    }
  },

  /**
   * 获取个人信息
   *
   * @param   {object}  event  用户信息
   */
  myInfo(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })

    wx.setStorageSync('userInfo', event.detail.userInfo)
    // this.getOrders()
    this.getAllOrders()
  },
  
  /**
   * 获取历史订单（分页）
   *
   * @param   {Number}  page      起始页
   * @param   {Number}  size      每页条数
   */
  getOrders(page = 1, size = 10) {
    orderModel.getHistoryOrders((res) => {
      this.setData({
        historyOrders: res.data
      })
    }, page, size)
  },

  /**
   * 获取历史订单（全部）
   */
  getAllOrders() {
    orderModel.getHistoryOrders((res) => {
      this.setData({
        historyOrders: res
      })

      orderModel.execSetStorageSync(false)
    })
  },

  /**
   * 跳转到订单详情
   *
   * @param   {object}  event  事件对象
   */
  showOrderDetailInfo(event) {
    let id = myModel.getElementValue(event, 'id')
    wx.navigateTo({
      url: '../order/order?id=' + id + '&from=order'
    })
  },

  /**
   * 支付
   *
   * @param   {object}  event  事件对象
   */
  rePay(event) {
    let orderID = myModel.getElementValue(event, 'id')
    let index = myModel.getElementValue(event, 'index')
    let _this = this
    orderModel.execPay(orderID, (statusCode) => {
      // 模拟，正常应为 statusCode != 0
      if (statusCode == 0) {
        var flag = statusCode == 2
        if (flag) {
          _this.data.historyOrders[index].status = 2
          that.setData({
            historyOrders: _that.data.historyOrders
          })
        }

        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + orderID + '&flag=' + flag + '&from=my'
        })
      }
    })
  }
})