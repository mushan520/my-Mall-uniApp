import { useMemberStore } from '@/stores'

// 接口服务器基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 备用服务器地址
// const baseURL = 'https://pcapi-xiaotuxian-front.itheima.net'

// 抽离拦截器配置 request 和 uploadFile 复用
const httpInterceptor = {
  // 拦截前触发
  invoke(args: UniApp.RequestOptions) {
    // BUG修复：如果不是 http 开头的，我们才需要进行 URL 拼接
    // TS小技巧：any 类型可通过 as 断言唤起代码提示
    if (args.url.startsWith('http') === false) {
      // request 触发前拼接 url
      args.url = baseURL + args.url
    }
    // 小程序端调用，请求头中header中必须添加：source-client：miniapp
    args.header = {
      ...args.header, // 保留原本的 header
      'source-client': 'miniapp', // 添加小程序端调用标识
    }
    // 在非vue文件中，哪里使用 Store 就哪里调用
    const memberStore = useMemberStore()
    // 获取 token
    const token = memberStore.profile.token
    // 如果有 token 就添加到请求头中
    if (token) {
      args.header.Authorization = token
    }
  },
}
// 添加拦截器，拦截 request
uni.addInterceptor('request', httpInterceptor)

// 添加拦截器，拦截 uploadFile
uni.addInterceptor('uploadFile', httpInterceptor)

// 封装http的好处：虽然是不同的项目，但是在最终调用发请求的业务代码基本一致
// 例子：不同项目(vue2、vue3、react、小程序)，发起网络请求都是以下代码
// export function getHomeBanner() {
//   return http({
//     method: 'GET',
//     url: '/home/banner',
//   })
// }
/** 服务器响应 */
type ApiResData<T> = {
  /** 业务状态码 */
  code: string
  /** 响应数据 */
  result: T
  /** 普通提示 */
  msg: string
}
/**
 * 封装通用的请求 http 方法
 * @param options 请求参数
 */
export function http<T>(options: UniApp.RequestOptions) {
  // 返回 promise 对象
  // Promise 的泛型用于确定 resolve 的回调结果类型(鼠标悬停查看)
  return new Promise<ApiResData<T>>((resolve, reject) => {
    uni.request({
      // 应用所有的参数
      ...options,
      // 成功
      // 🚨 uni.request 和 axios 请求成功理解不一样：
      //   1. 小程序端 uni.request 收到服务器响应皆为成功，不管状态码为多少
      //   2. 网页端 axios 状态码 2xx 表示成功，4xx 5xx 皆为请求失败
      success(res) {
        // 如果是成功 2xx
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 🎯 标记为成功：升级请求成功的回调结果
          resolve(res.data as ApiResData<T>)
        } else if (res.statusCode === 401) {
          // 如果状态码为 401 则表示 token 校验失败，跳转到登录页
          uni.navigateTo({ url: `/pages/login/index` })
          // 标记为失败
          reject(res)
        } else {
          console.log('❌失败', res)
          // 通用错误提示
          uni.showToast({
            icon: 'none',
            title: (res.data as ApiResData<T>).msg || '请求错误',
          })
          // 🎯 标记为失败：reject 可让 await 后面的代码不执行，更符合编程逻辑
          reject(res)
        }
      },
      // 失败(网络)
      fail(err) {
        reject(err)
      },
    })
  })
}
