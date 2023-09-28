import { QuestionNames } from '../types/index'
import { getUserConfig, transformObjectToArray } from '../utils/index'

export const envOptions = {
  saas: '生产第三方',
  self: '生产自建',
  dev: '开发',
}

export const cloudProviderOptions = {
  ali: '阿里云',
  tencent: '腾讯云',
}

export const selfNameOptions: Record<string, string> = { faber: '辉柏嘉' }

export const genQuestions = (isGitClean?: boolean) => {
  /** 是否检查当前工作区是否有未提交的修改 */
  const isCheckGit = typeof isGitClean === 'boolean'

  /** 用户自定义的自建配置 */
  const userConfig = getUserConfig()

  return [
    {
      type: 'confirm',
      name: 'isContinue',
      message: '当前有未提交的修改，是否继续？',
      when: () => isCheckGit && !isGitClean,
    },
    {
      type: 'list',
      name: 'env',
      message: '请选择构建的环境',
      choices: transformObjectToArray(envOptions),
      when: ({ isContinue = true }: QuestionNames) => isContinue,
    },
    {
      type: 'list',
      name: 'cloudProvider',
      message: '请选择阿里云/腾讯云',
      choices: transformObjectToArray(cloudProviderOptions),
      when: ({ isContinue = true, env }: QuestionNames) =>
        isContinue && env === 'saas',
    },
    {
      type: 'list',
      name: 'selfName',
      message: '请选择自建类型：',
      choices: transformObjectToArray(userConfig),
      when: ({ isContinue = true, env }: QuestionNames) =>
        isContinue && env === 'self' && !!Object.keys(userConfig).length,
    },
  ]
}
