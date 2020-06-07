PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker login -u $1 -p $2
docker push schoolsquirrel/squirrelfcmrelay:v$PACKAGE_VERSION