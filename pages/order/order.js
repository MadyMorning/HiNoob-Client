import { CartModel } from '../cart/cartModel.js'
import { AddressModel } from '../../utils/addressModel.js'
let cartModel = new CartModel()
let addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    orderPrices: 0,
    addressInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderPrices = options.orderPrices
    let orderData = cartModel.getCartDataFromLocal(true)
    this.setData({
      orderData,
      orderPrices
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 选择地址
   */
  chooseAddress() {
    let _this = this
    wx.chooseAddress({
      success: (result)=>{
        let addressInfo = {
          name: result.userName,
          telNumber: result.telNumber,
          detailInfo: addressModel.getAddressDetailInfo(result)
        }
        _this.setData({
          addressInfo
        })

        addressModel.createAddress(result, (res) => {
          console.log(res);
        })
      }
    })
  }

})