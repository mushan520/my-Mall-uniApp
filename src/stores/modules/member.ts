import type { LoginWxMinResult } from '@/types/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginWxMinResult>({} as LoginWxMinResult)

    // 保存用户信息
    const setProfile = (val: LoginWxMinResult) => {
      profile.value = val
    }

    const clearProfile = () => {
      profile.value = {} as LoginWxMinResult
    }

    // 用户登录状态
    const isLogin = computed(() => Boolean(profile.value.token))

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
      isLogin,
    }
  },
  {
    // persist: true,  // 这种写法小程序端不行，因为小程序的本地存储api不同
    persist: {
      // storage: localStorage,
      // 🎯 改造成小程序端的 api
      storage: {
        // 设置
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        // 获取，记得 return
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
