import path from 'path'
import fs from 'fs'

import { GetUserConfig } from '../types'
import { parseArgsToObj } from './index'

const getUserConfig: GetUserConfig = () => {
  const { path: userConfigPath } = parseArgsToObj()
  /** 获取当前工作目录 */
  const currentDir = process.cwd()

  /** 项目安装目录下的config.json文件路径 */
  const configPath = path.join(
    currentDir,
    typeof userConfigPath === 'string'
      ? userConfigPath
      : './config/build/config.json'
  )

  let selfConfig: Record<string, string> = {}
  // 检查文件是否存在
  if (fs.existsSync(configPath)) {
    try {
      // 读取文件内容
      const configBuffer = fs.readFileSync(configPath, 'utf-8')
      selfConfig = JSON.parse(configBuffer)

      // 输出配置项
      console.table(selfConfig)
    } catch (error) {
      console.error('无法读取配置文件:', error)
    }
  } else {
    console.error(`路径 ${configPath} 配置文件不存在`)
  }
  return selfConfig
}

export default getUserConfig
