export interface QuestionNames {
  isContinue: boolean
  env: 'saas' | 'self' | 'dev'
  cloudProvider: 'ali' | 'tencent'
  selfName: string
}

export type BuildFn = (isCheckGit?: boolean) => void

export type GetUserConfig = () => Record<string, string>

export type ParseArgsToObj = () => Record<string, string | boolean>
