import * as inquirer from 'inquirer'
import { simpleGit } from 'simple-git'
import { spawnSync } from 'child_process'

import {
  cloudProviderOptions,
  envOptions,
  genQuestions,
  selfNameOptions,
} from './options/index'
import { questionNames } from './types/index'

const git = simpleGit()

const main = (isGitClean: boolean) => {
  console.log('🌊 ~ file: index.ts:49 ~ isGitClean:', isGitClean)

  const inquirerDefault = inquirer.default

  inquirerDefault
    .prompt<questionNames>(genQuestions(isGitClean))
    .then((answers) => {
      const { env, cloudProvider, selfName, isContinue } = answers
      console.log(JSON.stringify(answers))
      if (!isGitClean && !isContinue) throw new Error('当前有未提交的修改')

      const command = `npm run build`

      console.log('执行命令:', command)

      const result = spawnSync(command, { shell: true, stdio: 'inherit' })

      if (result.status === 0) {
        console.table([
          ['环境', envOptions[env]],
          ['云', cloudProviderOptions[cloudProvider] || '-'],
          ['自建应用名称', selfNameOptions[selfName] || '-'],
        ])
        console.log('构建成功~ 💕ღ( ´･ᴗ･` )笔芯')
      } else {
        console.log(`命令执行异常╭(T ^ T)╮ 退出码：${result.status}`)
      }
    })
}

// 判断是否有未提交的文件
git.status((err, status) => {
  if (err) {
    console.error(err)
    return
  }
  main(status.isClean())
})
