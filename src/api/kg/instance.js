import { createAPI } from '../util'
import config from '../config'

const baseUrl = {
  mock: 'http://h2.beyondcloud.cn/mock/5ac19d725fc44d1824d39446/api',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock']

export default createAPI(baseUrl)
