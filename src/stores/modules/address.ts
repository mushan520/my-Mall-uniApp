import type { MemberAddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义收货地址模块
//   地址列表页：修改选中收货地址
//   商品详情页：修改选中收货地址
//   填写订单页：获取选中收货地址
export const useAddressStore = defineStore(
  'address',
  () => {
    // 选中的收货地址
    const selectedAddress = ref({} as MemberAddressItem)

    // 修改收货地址的
    const changeSelectedAddress = (address: MemberAddressItem) => {
      selectedAddress.value = address
    }

    // 清理选中收获地址
    const clearSelectedAddress = () => {
      selectedAddress.value = {} as MemberAddressItem
    }

    // 记得 return
    return {
      selectedAddress,
      changeSelectedAddress,
      clearSelectedAddress,
    }
  },
  {
    // 开启持久化存储，需覆写成小程序的本地存储 API
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
