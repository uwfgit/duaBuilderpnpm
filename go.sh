#!/bin/bash
rm -rf ./build
mkdir -p ./build/client ./build/portals

pnpm install
pnpm run build:qa

#copy everything from dist into build/portals folder
cp -rf dist/* build/portals/

cp -rf ./src build/client/src
cp -f ./package.json build/client/package.json
cp -f ./pnpm-lock.yaml build/client/pnpm-lock.yaml
cp -f ./.env.qa build/client/.env
cp -f ./postcss.config.js build/client/postcss.config.js
cp -f ./tsconfig.json build/client/tsconfig.json

#remove forward slash in index.html file
sed -i 's|src="/assets/|src="assets/|g; s|href="/assets/|href="assets/|g' build/portals/index.html

