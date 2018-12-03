import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
import iputils from '@/js/iputils'


import qs from 'qs'

// axios 默认配置https://www.kancloud.cn/yunye/axios/234845

// 默认30S超时
axios.defaults.timeout = 30000

// let pathname = (location.pathname || '').toLowerCase()
// let subdomain = iputils.islocal() && pathname.indexOf('/travel/supergoproduct') !== 0 ? '' : '/travel/supergoproduct'
// // 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
// axios.defaults.baseURL = location.host + subdomain

// 设置默认请求头
axios.defaults.headers['X-Requested-With'] = XMLHttpRequest

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true

// 设置post 请求时 content-type类型
// axios.defaults.headers['post']['Content-Type'] = `application/x-www-form-urlencoded; charset=UTF-8`


// 方法内使用this.$moment 详细使用参考http://momentjs.cn/
Vue.prototype.$moment = moment

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
/**
 * 取消http请求
 * @param {*} config 
 */
function removePending(config) {
  for (let p in pending) {
    if (pending[p].key === getHttpKey(config)) {
      pending[p].cancel("repeating"); // 执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除      
      // console.log('取消重复的http请求');
    }
  }
}
/**
 * 获取每次http请求的唯一key，规则：url+method+params
 * @param {*} config 
 */
function getHttpKey(conf) {
  let param;
  if (conf.method === 'post') {
    param = JSON.stringify(conf.data);
  } else {
    param = qs.stringify(conf.params);
  }
  return conf.url + conf.method + param;
}

/**
 * axios 请求拦截器
 */
axios.interceptors.request.use(config => {
  removePending(config); //在一个ajax发送前执行一下取消操作
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({
      key: getHttpKey(config),
      cancel: c
    });
  });
  return config;
}, err => {
  return Promise.reject(err)
});

/**
 * axios 响应拦截器
 */
axios.interceptors.response.use(res => {
  removePending(res.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return res
}, error => {
  if (error && error.message === 'repeating') {
    return {}; // 返回空对象
  }
  return Promise.reject(error)
})

export default {
  /**
   * get 请求
   * @param {*} url 
   * @param {*} param 
   */
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param
      }).then(res => {
        resolve(res.data)
      }).catch(reject)
    })
  },
  /**
   * post 请求
   * @param {*} url 
   * @param {*} param 
   */
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: qs.stringify(param)
      }).then(res => {
        resolve(res.data)
      }).catch(reject)
    })
  },
  /**
   * post json 请求
   * @param {*} url 
   * @param {*} param 
   */
  postjson(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: param
      }).then(res => {
        resolve(res.data)
      }).catch(reject)
    })
  }
}
