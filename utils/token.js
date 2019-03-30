import { Config } from './config.js'

/**
 * Token
 */
class Token{
  constructor() {
    this._storagekey = 'token'
  }

  /**
   * Token验证
   */
  verify() {
    let token = wx.getStorageSync(this._storagekey)
    if (!token) {
      this.getTokenFromServer()
    } else {
      this.verifyToken(token)
    }
  }

  /**
   * 从服务器获取Token
   */
  getTokenFromServer() {
    // let _this = this
    wx.login({
      timeout: 10000,
      success: (result) => {
        let params = {
          url: 'v1/token/user?code=' + result.code,
          // data: {result.code},
          callback: (res) => {
            // console.log(res);
            wx.setStorageSync(this._storagekey, res.token);
          }
        }

        this.requestToken(params)
      }
    })
  }

  /**
   * 验证Token是否有效
   *
   * @param   {string}  token  Token
   */
  verifyToken(token) {
    let params = {
      url: 'v1/token/verify?token=' + token,
      // data: token,
      callback: (res) => {
        // console.log(res);
        if (!res.isToken) {
          this.getTokenFromServer()
        }
      }
    }

    this.requestToken(params)
  }

  /**
   * 请求Token
   *
   * @param   {object}  params  请求参数
   */
  requestToken(params) {
    wx.request({
      url: Config.requestURL + params.url,
      header: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'GET',
      success: (res) => {
        params.callback && params.callback(res.data)
      }
    })
  }
}

export { Token }