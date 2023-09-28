# Taro构建命令行工具

[![npm version](https://badge.fury.io/js/taro-build-command.svg)](https://badge.fury.io/js/taro-build-command)

用于生成taro项目的构建命令，可通过用户的选项，执行不同的命令行。

## 安装

使用 npm 安装：

```shell
npm install taro-build-command -D
```

或者使用 yarn 安装：

```shell
yarn add taro-build-command -D
```

## 使用方法

在你项目的`package.json`新增命令：

```json
{
    "scripts": {
        "build": "taro-build-command",
    }
}
```

## 配置选项

可选配置

- `--path`：本地的化的配置路径，文件格式为json，默认值为`./config/build/config.json`
- `--checkGit`：是否检查本地git是否有未提交的修改状态，默认值为`false`

### 示例

```json
{
    "scripts": {
        "build": "taro-build-command --path ./config/build/config.json --checkGit",
    }
}
```
