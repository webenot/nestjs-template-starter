#!bin/bash

source ./scripts/init/init-app-name.sh
source ./scripts/init/init-database.sh
source ./scripts/init/init-platform.sh
source ./scripts/init/init-git.sh
source ./scripts/init/init-message-broker.sh

echo " Install npm packages"
echo "---------------------------------------------------------------"
npm install

echo " Install husky"
echo "---------------------------------------------------------------"
npx husky install

echo " Install log4brains"
echo "---------------------------------------------------------------"
npm install -g log4brains
