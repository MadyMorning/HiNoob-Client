import { Base } from '../../utils/base.js';

/**
 * 分类Model
 */
class CategoryModel extends Base{
  constructor() {
    super()
  }

  /**
   * 获取分类数据
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

export { CategoryModel }
