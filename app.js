import { Token } from './utils/token.js'
let token = new Token()
App({
  onLaunch: function () {
    token.verify()
  }
})