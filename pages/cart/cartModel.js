import { Base } from '../../utils/base.js'

/**
 * 购物车Model
 */
class CartModel extends Base{
  constructor() {
    super()
    this._storagekey = 'cart'
  }

  /**
   * 加入购物车
   * 若购物车中没有该条数据，则增加一条数据
   * 若购物车中存在该条数据，则将数量增加
   *
   * @param   {object}  item    商品信息
   * @param   {string}  counts  商品数量
   */
  addCart(item, counts) {
    let cartData = this.getCartDataFromLocal() || []
    
    let isProductInfo = this._isProductInfoFromCart(item.id, cartData)
    
    // 若购物车中没有该条数据，则增加一条数据
    if (!isProductInfo) {
      item.counts = counts  //数量
      item.status = true    //是否选中
      console.log(item);
      cartData.push(item)
    } else {  //若购物车中存在该条数据，则将数量增加
      cartData[isProductInfo.index].counts += counts
    }
    // 添加到小程序缓存
    wx.setStorageSync(this._storagekey, cartData)
  }

  /**
   * 从本地缓存中获取购物车数据
   *
   * @return  {object}  返回购物车数据
   */
  getCartDataFromLocal() {
    let cartData = wx.getStorageSync(this._storagekey)
    return cartData
  }

  /**
   * 判断购物车中是否商品信息
   *
   * @param   {string}  id    商品ID
   * @param   {object}  item  购物车数据
   *
   * @return  {object}        返回商品信息以及在购物车数据中的下标
   */
  _isProductInfoFromCart(id, item) {
    let result = ''
    for (let i = 0; i < item.length; i++) {
      if (item[i].id == id) {
        result = {
          index: i,
          data: item[i]
        }
        break;
      }
    }

    return result;
  }

  /**
   * 获取购物车数量
   * 
   * @param {Boolean} flag 是否获取选中商品数量
   * 
   * @returns {Number} 返回商品数量
   */
  getCartCounts(flag = false) {
    let cartData = this.getCartDataFromLocal() || []
    let quantity = 0
    for (const value of cartData) {
      if (flag) {
        if (value.status) {
          quantity += value.counts
        }
      } else {
        quantity += value.counts
      }
    }

    return quantity
  }

  /**
   * 获取商品价格
   *
   * @returns {Number} 返回商品价格
   */
  getCartPrices() {
    let cartData = this.getCartDataFromLocal() || []
    let price = 0
    for (const value of cartData) {
      // if (flag) {
      //   if (value.status) {
      //     quantity += value.counts
      //   }
      // } else {
      //   quantity += value.counts
      // }

      if (value.status) {
        price += value.counts * parseFloat(value.price) * 100
      }
    }

    if (price == 0) {
      return price
    }
    return price / 100
  }
}

export { CartModel }