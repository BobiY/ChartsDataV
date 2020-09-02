// 默认导出所有的 静态数据
import chartType from "./constant";
import {  } from "./text/text";
const getChartModuleId = chartId => chartId.substring(0, 1)
const cacshModule = {}
const proxyData = new Proxy({}, {
  async get (target, props) {
    // 这里将静态数据按需加载
    const moduleId = getChartModuleId(props)
    if (cacshModule[moduleId]) {
      return cacshModule[moduleId][props]
    } else {
      // 动态 import 的路径不能写变量，只能写拼接的路径;
      const modules = await import("./" + chartType[moduleId] + "/" + chartType[moduleId] + ".js");
      cacshModule[moduleId] = modules.default
      return modules.default[props]
    }
  }
})


export default proxyData