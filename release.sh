#!/user/bin/env sh

set -e  # 表示脚本执行结果不为 true 则退出
echo "Enter release version: "
read VERSION # 读取 cmd 输入的版本号并赋值给 VERSION
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  # 发布 package.json files 配置的文件夹
  npm publish 
fi