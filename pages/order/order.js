import { CartModel } from '../cart/cartModel.js'
import { AddressModel } from '../../utils/addressModel.js'
import { OrderModle } from './orderModel.js'

let cartModel = new CartModel()
let addressModel = new AddressModel()
let orderModle = new OrderModle();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    orderPrices: 0,
    addressInfo: '',
    orderID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = options.from
    let orderPrices = options.orderPrices
    /**
     * flag == 'cart', 表示来自‘购物车’，订单未生成
     * flag == 'cart', 表示来自‘我的’， 订单已生成
     */
    if (flag == 'cart') {
      this.setData({
        orderData: cartModel.getCartDataFromLocal(true),
        orderPrices,
        orderStatus: 0
      })
      
      addressModel.getAddressInfoFromServer((res) => {
        this.setData({
          addressInfo: res
        })
      })
    }

    
  },

  /**
   * 生命周期函数--监听页面显示
   * 从订单支付结果页面返回
   */
  onShow: function () {
    if (this.data.orderID) {
      let _this = this
      let id = this.data.orderID
      orderModle.getOrderInfoById(id, (res) => {
        _this.setData({
          orderStatus: res.status,
          productsArr: res.snap_items,
          account: res.total_price,
          basicInfo: {
            orderTime: res.create_time,
            orderNo: res.order_no
          },
        });

        // 快照地址
        let addressInfo = res.snap_address;
        addressInfo.detailInfo = addressModel.getAddressDetailInfo(addressInfo)
        _this.setData({
          addressInfo
        })
      });
    }
  },

  /**
   * 选择地址
   */
  chooseAddress() {
    let _this = this
    wx.chooseAddress({
      success: (result) => {
        let addressInfo = {
          name: result.userName,
          telNumber: result.telNumber,
          detailInfo: addressModel.getAddressDetailInfo(result)
        }
        _this.setData({
          addressInfo
        })

        addressModel.createAddress(result, (res) => {
          console.log(res);
        })
      }
    })
  },

  /**
   * 点击付款按钮
   */
  Pay() {
    if (!this.data.addressInfo) {
      orderModle.showTips('下单提示', '请填写您的收货地址');
      return;
    }

    /**
     * orderStatus == 0， 表示来自‘购物车’， 订单未生成
     * orderStatus != 0， 表示来自‘我的’， 订单已生成
     */
    if (this.data.orderStatus == 0) {
      this._firstTimePay()
    } else {
      // OrderModle.oneMoresTimePay();
    }
  },

  /**
   * 来自‘购物车’，第一次下单
   */
  _firstTimePay() {
    let _this = this
    let orderInfo = []
    let procuctInfo = this.data.orderData
    let address_id = this.data.addressInfo.id
    for (let i = 0; i < procuctInfo.length; i++) {
      orderInfo.push({
        product_id: procuctInfo[i].id,
        count: procuctInfo[i].counts
      });
    }
    orderModle.createOrder(orderInfo, address_id, (res) => {
      if (res.status) {
        _this.data.orderID = res.orderID
        _this._execPay(res.orderID)
      }
    })

  },

  /**
   * 支付
   *
   * @param   {Number}  orderID  订单ID
   */
  _execPay(orderID) {
    let _this = this
    orderModle.execPay(orderID, (statusCode) => {
      // 模拟，正常应为 statusCode != 0
      if (statusCode == 0) {
        //将已经下单的商品从购物车删除
        _this.deleteProducts()

        var flag = statusCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + orderID + '&flag=' + flag + '&from=order'
        });
      }
    });
  },

  /**
   * 将已经下单的商品从购物车删除
   */
  deleteProducts() {
    let ids = []
    let orderData = this.data.orderData
    for (let i = 0; i < orderData.length; i++) {
      ids.push(orderData[i].id)
    }
    cartModel.cartDeletes(ids)
  },

  /**
   * 跳转到商品详情
   *
   * @param   {object}  event  事件对象
   */
  productDetail(event) {
    let id = cartModel.getElementValue(event, 'id')
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
})