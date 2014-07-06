#!/bin/bash

PROJECT_VERSION=`git tag | sort --version-sort | tail -1`
BUILD_TIMESTAMP=`date +'%b %d, %I:%M %p %Z'`
DIR_PROJECT='../webcontent'
DIR_BUILT='../webcontent-built'
FILE_CHANGE_LOG=${DIR_BUILT}/changelog.txt

echo "------------------------------------------------"
echo "PROJECT_VERSION: ${PROJECT_VERSION}"
echo "BUILD_TIMESTAMP: ${BUILD_TIMESTAMP}"
echo "DIR_PROJECT    : ${DIR_PROJECT}"
echo "DIR_BUILT      : ${DIR_BUILT}"
echo "------------------------------------------------"

NODE_CMD="nodejs"

# Check if script is running on a Mac
if [[ $OSTYPE == darwin* ]] 
then
    NODE_CMD="node"
fi

# CSS
${NODE_CMD} r.js -o cssIn=${DIR_PROJECT}/css/main.css out=${DIR_BUILT}/css/main.css

# JS
${NODE_CMD} r.js -o build.js


cp -R ${DIR_PROJECT}/fonts ${DIR_BUILT}
cp -R ${DIR_PROJECT}/images ${DIR_BUILT}
cp -R ${DIR_PROJECT}/sound ${DIR_BUILT}

cp ${DIR_PROJECT}/* ${DIR_BUILT}
cp ${DIR_PROJECT}/scripts/require.js ${DIR_BUILT}/scripts

#
# Version
#
sed -i "s/\${build.timestamp}/${BUILD_TIMESTAMP}/g" ${DIR_BUILT}/version.json
sed -i "s/\${project.version}/${PROJECT_VERSION}/g" ${DIR_BUILT}/version.json
