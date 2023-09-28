import { ParseArgsToObj } from '../types'

export const transformObjectToArray = (obj: Record<string, string>) => {
  return Object.entries(obj).map(([value, name]) => ({ name, value }))
}

export const parseArgsToObj: ParseArgsToObj = () => {
  const [, , ...args] = process.argv // 忽略前两个参数（执行命令和脚本文件路径）
  const userArgs: Record<string, string | boolean> = {}

  for (let i = 0; i < args.length; i += 2) {
    const argKey = args[i].replace(/^-+/, '') // 忽略参数前面的横线（-）或双横线（--）
    const argValue = args[i + 1] || true // 如果没有提供值，则默认为 true
    userArgs[argKey] = argValue
  }

  return userArgs
}
