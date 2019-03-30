import { Config } from './config.js'
import { Token } from './token.js'
let token = new Token()
/**
 * 公有基类
 */
class Base{
  constructor() {
    
  }

  /**
   * 公有请求方法
   * 
   * @param {object}  params 请求参数
   * @param {Boolean}  refetch 是否重新获取Token
   */
  request(params, refetch = true) {
    let _this = this
    wx.request({
      url: Config.requestURL + params.url,
      data: params.data ? params.data : '',
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': wx.getStorageSync('token')
      },
      method: params.method ? params.method : 'GET',
      success: function (res) {
        let statusCode = res.statusCode.toString()
        if (statusCode == 401) {
          if (refetch) {
            _this._refetch(params)
          }
        } else {
          params.callback && params.callback(res.data)
        }

      },
      fail: function(res) {
        params.callback && params.callback(res)
      },
    })
  }

  /**
   * 重新获取 Token 发送请求
   *
   * @param   {object}  params  请求参数
   */
  _refetch(params) {
    token.getTokenFromServer()
    this.request(params, false)
  }

  /**
   * 获取元素上绑定的值
   * @param {object}  event 点击元素获取到的event
   * @param {string}  key   要获取的值
   */
  getElementValue(event, key){
    return event.currentTarget.dataset[key]
  }

  /**
   * 提示窗口
   *
   * @param   {string}  title    标题
   * @param   {string}  content  内容
   * @param   {bool}  flag     是否跳转到 ‘我的’ 页面
   */
  showTips(title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my'
          })
        }
      }
    })
  }
}

export {Base}