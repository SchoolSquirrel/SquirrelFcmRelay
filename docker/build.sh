cd ../
npm install
npx @zeit/ncc build index.ts -o ./docker/build
cd ./docker
PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t schoolsquirrel/squirrelfcmrelay:v$PACKAGE_VERSION .
rm -r build