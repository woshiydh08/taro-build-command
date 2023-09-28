#!/usr/bin/env node
import inquirer from 'inquirer'
import { simpleGit } from 'simple-git'
import { spawnSync } from 'child_process'

import {
  cloudProviderOptions,
  envOptions,
  genQuestions,
  selfNameOptions,
} from './options/index'
import { BuildFn, QuestionNames } from './types/index'
import { parseArgsToObj } from './utils'

const git = simpleGit()

export const buildWithEnv = (isGitClean?: boolean) => {
  /** 是否检查当前工作区是否有未提交的修改 */
  const isCheckGit = typeof isGitClean === 'boolean'

  inquirer.prompt<QuestionNames>(genQuestions(isGitClean)).then((answers) => {
    const { env, cloudProvider, selfName, isContinue } = answers

    if (isCheckGit && !isGitClean && !isContinue)
      throw new Error('当前有未提交的修改')

    const command = `cross-env IK_ENV=${env}-${
      cloudProvider || selfName
    } npm run build`

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

const build: BuildFn = () => {
  const { checkGit } = parseArgsToObj()
  if (checkGit) {
    // 判断是否有未提交的文件
    git.status((err, status) => {
      if (err) {
        console.error(err)
        return
      }
      buildWithEnv(status.isClean())
    })
  } else {
    buildWithEnv()
  }
}

build()
