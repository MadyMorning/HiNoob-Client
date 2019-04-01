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

  /**
   * 获取历史订单
   *
   * @param   {Number}  page      起始页，默认第 1 页
   * @param   {Number}  size      每页条数，默认 10 条
   * @param   {object}  callback  回调函数
   */
  getHistoryOrders(callback, page = '', size = '') {
    let url = ''
    if (page == '' && size == '') {
      url = 'v1/order/history_all'
    } else {
      url = 'v1/order/history?page=' + page + '&size=' + size
    }

    let params = {
      url,
      callback
    }

    this.request(params)
  }

  /**
   * 本地缓存 保存／更新
   */
  execSetStorageSync(data) {
    wx.setStorageSync(this._storagekey, data)
  }

  /**
   * 是否有新的订单
   */
  hasNewOrder() {
    var flag = wx.getStorageSync(this._storagekey)
    return flag == true;
  }
}

export { OrderModle }