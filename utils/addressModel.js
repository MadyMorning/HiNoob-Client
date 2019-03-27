import { Base } from './base.js'

/**
 * 地址Model
 */
class AddressModel extends Base{
  constructor() {
    super()
  }

  /**
   * 获取地址详细信息
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
}

export { AddressModel }