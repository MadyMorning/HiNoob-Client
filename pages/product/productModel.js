import {Base} from '../../utils/base.js'

class ProductModel extends Base{
  constructor(){
    super()
  }

  /**
   * 获取商品数据
   * @params url 请求URL
   * @params callback 回调函数
   */
  getData(url, callback){
    let params = {
      url,
      callback
    }

    this.request(params)
  }
}

export {ProductModel}