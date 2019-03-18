import {Base} from '../../utils/base.js'

/**
 * 首页Modle
 */
class IndexModel extends Base{
  constructor(){
    super()
  }

  /**
   * 获取首页数据
   * @params url 请求URL
   * @params callback 回调函数
   */
  getData(url, callback) {
    let params = {
      url,
      callback
    }

    this.request(params)
  }

  /**
   * 获取Banner数据
   * @params url 请求URL
   * @params callback 回调函数
   */
  // getBannerData(url, callback){
  //   let params = {
  //     url,
  //     callback
  //   }

  //   this.request(params)
  // }

  /**
   * 获取专题列表
   * @params url 请求URL
   * @params callback 回调函数
   */
  // getThemeData(url, callback) {
  //   let params = {
  //     url,
  //     callback
  //   }

  //   this.request(params)
  // }
}

export {IndexModel}