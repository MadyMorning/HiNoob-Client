import { Base } from '../../utils/base.js'

class ThemeModel extends Base {
  constructor() {
    super()
  }

  /**
   * 获取专题数据
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
}

export { ThemeModel }