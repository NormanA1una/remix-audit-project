#!/bin/bash

# Cargar NVM
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 20.7.0
nvm use 20.7.0
git pull
rm -rf node_module
rm package-lock.json
npm install
npm run build
pm2 delete remix
pm2 start ecosystem.config.cjs
pm2 save