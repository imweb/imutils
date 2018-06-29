
im 团队工具库

# Usage
```js
import utils from '@tencent/imutils';

// utils.openApp(...)

```

# Test

```shell
$ npm run test
```

# 如何贡献代码

* 拉取分支，格式如 jerytang_20180629_your_feature_name
* 参考 src 下的代码，编写功能
* 参考 tests 下的代码，编写测试用例
* 发起 merge request，等待 accept

# Doc

生成文档的步骤

```shell
$ # 1. 生成 docs 目录，并提交 git 仓库
$ npm run doc
$ git add .
$ git commit
$ # 2. 切换到 github_docs 分支
$ git checkout github_docs
$ # 3. 检出最新的文档
$ git checkout master docs
$ # 4. 提交最新的 docs 到当前分支
$ git commit
$ # 5. 首次的 push 到 github 的话，需要先添加一个 remote
$ git remote add github git@github.com:imweb/imutils.git
$ # 6. 将最新的文档 push 到 github
$ git push github github_docs:master
$ # 7. 打开 https://imweb.github.io/imutils/x.y.z/index.html 比如
$ open https://imweb.github.io/imutils/1.0.2/index.html
```

