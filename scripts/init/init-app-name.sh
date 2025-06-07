#!bin/bash

read -r -p 'App name: ' appName

echo "---------------------------------------------------------------"
echo " Change app name in files"
echo "---------------------------------------------------------------"
readmeFilePath="./README.md"
sed -i "s/Boilerplate\ API\ app/$appName/" $readmeFilePath;

packageJsonFilePath="./package.json"
appName=${appName/\ /\-}
appName=${appName,,}
sed -i "s/nestjs\-template/$appName/" $packageJsonFilePath;
