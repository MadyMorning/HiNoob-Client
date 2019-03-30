import { Base } from '../../utils/base.js'

/**
 * 订单 Model
 */
class OrderModle extends Base{
  constructor() {
    super()
    this._storagekey = 'newOrder'
  }

  /**
   * 创建订单
   */
  createOrder(orderInfo, address_id, callback) {
    let _this = this
    let params = {
      url: 'v1/order/submit',
      data: {
        products: orderInfo,
        address_id
      },
      method: 'POST',
      callback(res) {
        wx.setStorageSync(_this._storagekey, true)
        callback && callback(res)
        // if (res.status) {
        //   _this.execPay(res.orderID)
        // }
      }
    }

    this.request(params)
  }

  /**
   * 拉起微信支付
   *
   * @param   {Number}  orderID   订单id
   * @param   {object}  callback  回调方法，返回参数可能值
   * 0：商品缺货等原因导致订单不能支付 
   * 1：支付失败或者支付取消
   * 2：支付成功
   */
  execPay(orderID, callback) {
    var params = {
      url: 'v1/pay/payOrder',
      data: {
        id: orderID
      },
      method: 'POST',
      callback(res) {
        if (res.return_code == 'SUCCESS' && res.result_code == 'SUCCESS') { //可以支付
          wx.requestPayment({
            'timeStamp': timeStamp.toString(),
            'nonceStr': res.nonceStr,
            'package': res.package,
            'paySign': res.paySign,
            success: function () {
              callback && callback(2);
            },
            fail: function () {
              callback && callback(1);
            }
          })
        } else {
          callback && callback(0);
        }
      }
    };
    this.request(params);
  }

  oneMoresTimePay() {
    
  }

  /**
   * 从支付结果页返回，获取已生成的订单信息
   *
   * @param   {Number}  id        订单ID
   * @param   {object}  callback  回调函数
   */
  getOrderInfoById(id, callback) {
    let params = {
      url: 'v1/order/' + id,
      callback
    }

    this.request(params)
  }
}

export { OrderModle }