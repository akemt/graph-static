import config from './config'

export default {
  mock: 'http://h2.beyondcloud.cn/mock/5ac19d725fc44d1824d39446/api',
  dev: 'http://localhost:8080/',
  pre: '',
  prod: ''
}[config.env || 'mock']
