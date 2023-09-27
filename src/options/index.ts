import { questionNames } from '../types/index'
import { transformObjectToArray } from '../utils/index'

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

export const genQuestions = (isGitClean: boolean) => [
  {
    type: 'confirm',
    name: 'isContinue',
    message: '当前有未提交的修改，是否继续？',
    when: () => !isGitClean,
  },
  {
    type: 'list',
    name: 'env',
    message: '请选择构建的环境',
    choices: transformObjectToArray(envOptions),
    when: ({ isContinue }: questionNames) => isGitClean || isContinue,
  },
  {
    type: 'list',
    name: 'cloudProvider',
    message: '请选择阿里云/腾讯云',
    choices: transformObjectToArray(cloudProviderOptions),
    when: ({ env, isContinue }: questionNames) =>
      (isGitClean || isContinue) && env === 'saas',
  },
  {
    type: 'list',
    name: 'selfName',
    message: '请选择自建类型：',
    choices: transformObjectToArray(selfNameOptions),
    when: ({ env, isContinue }: questionNames) =>
      (isGitClean || isContinue) && env === 'self',
  },
]
