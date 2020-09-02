// 定义各个图表的类型数据
export default {
  [1<<0]: "text",
  [1<<1]: "chart",
  [1<<2]: "image",
  [1<<3]: "component", 
  
  // 文本的子类型
  text1: 100 | 1,
  // chart 的子类型
  line: 200 | 1,
  histogram: 200 | 2,
  bar: 200 | 3,
  pie: 200 | 4,
  ring: 200 | 5,
  funnel: 200 | 6,
  radar: 200 | 7,
  map: 200 | 8,
  liquidfill: 200 | 9,
  // image 的子类型
  image1: 300 | 1,
  // 组件的子类型
  boeder: 400 | 1
}