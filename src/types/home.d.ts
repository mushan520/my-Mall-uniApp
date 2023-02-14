import type { GoodsItem } from './global'

/**
 * 首页-广告区域数据
 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** banner链接 */
  imgUrl: string
  /** 跳转类型1、页面2、H5 3、小程序（小程序使用） */
  type: number
}

/**
 * 首页-前台类目-小程序 数据
 */
export type CategoryItem = {
  /** 展示图标 */
  icon: string
  /** id */
  id: string
  /** 分类名称 */
  name: string
}

/**
 * 首页-人气推荐-小程序和app 数据信息
 */
export type HotItem = {
  /** 说明 */
  alt: string
  /** id */
  id: string
  /** 图片[ 移动端支持多个图片 ] */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 标题 */
  title: string
  /** 推荐类型 */
  type: string
}

/**
 * 首页-新鲜好物 数据信息
 */
export type NewItem = {
  /** 备注 */
  desc: string
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品图片链接 */
  picture: string
  /** 价格 */
  price: number
}

/* 猜你喜欢商品类型 */
export type GuessItem = GoodsItem
