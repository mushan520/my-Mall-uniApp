import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'
import XtxResult from '@/components/XtxResult.vue'
import XtxBack from '@/components/XtxBack.vue'

// 声明 vue 类型模块
declare module '@vue/runtime-core' {
  //  给 vue  添加全局组件类型，interface 和之前的合并
  export interface GlobalComponents {
    // 定义具体组件类型，typeof 获取到组件实例类型
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
    XtxResult: typeof XtxResult
    XtxBack: typeof XtxBack
  }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
