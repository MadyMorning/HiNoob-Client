import { Base } from './base.js'

/**
 * 地址Model
 */
class AddressModel extends Base{
  constructor() {
    super()
  }

  /**
   * 组织地址详细信息
   *
   * @param   {object}  addressInfo  地址完整信息
   *
   * @return  {string}               地址详细信息
   */
  getAddressDetailInfo(addressInfo) {
    let province = addressInfo.provinceName || addressInfo.province
    let city = addressInfo.cityName || addressInfo.city
    let county = addressInfo.countyName || addressInfo.country
    let detail = addressInfo.detailInfo || addressInfo.detail
      
    return province + city + county + detail
  }

  /**
   * 添加地址
   *
   * @param   {[type]}  data      微信中的地址详细信息
   * @param   {[type]}  callback  回调函数
   */
  createAddress(data, callback) {
    let addressInfo = this._setAddressInfo(data)

    let params = {
      url: 'v1/address/create',
      data: addressInfo,
      method: 'POST',
      callback
    }

    this.request(params)
  }

  /**
   * 设置地址信息
   *
   * @param   {object}  data  地址信息
   *
   * @return  {[type]}        [return description]
   */
  _setAddressInfo(data) {
    let addressInfo = {
      name: data.userName,
      mobile: data.telNumber,
      province: data.provinceName,
      city: data.cityName,
      country: data.countyName,
      detail: data.detailInfo
    }

    return addressInfo
  }

  /**
   * 从服务器中获取地址信息
   */
  getAddressInfoFromServer(callback) {
    let _this = this
    let params = {
      url: 'v1/address',
      callback: (res) => {
        let addressInfo = {
          id: res.id,
          name: res.name,
          mobile: res.mobile,
          detailInfo: _this.getAddressDetailInfo(res)
        }

        callback && callback(addressInfo)
      }
    }

    this.request(params)
  }
}

export { AddressModel }