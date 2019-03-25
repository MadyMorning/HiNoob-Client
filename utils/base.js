import {Config} from 'config.js'

/**
 * 公有基类
 */
class Base{
  constructor(){

  }

  /**
   * 公有请求方法
   * @params params 请求参数
   */
  request(params){
    wx.request({
      url: Config.requestURL + params.url,
      data: params.data ? params.data : '',
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': wx.getStorageSync('token')
      },
      method: params.method ? params.method : 'GET',
      success: function(res) {
        params.callback && params.callback(res.data)
      },
      fail: function(res) {
        params.callback && params.callback(res)
      },
    })
  }

  /**
   * 获取元素上绑定的值
   * @param event 点击元素获取到的event
   * @param key   要获取的值
   */
  getElementValue(event, key){
    return event.currentTarget.dataset[key]
  }
}

export {Base}