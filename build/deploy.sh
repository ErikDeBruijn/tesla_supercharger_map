#!/bin/bash
#==============================================================================================
# Deploy
#==============================================================================================

WEB_APP_DIR='../webcontent-built'
REMOTE_HOST=supercharge.info
SSH_USER=tomcat
DIR_DEPLOY=/var/www/supercharge.info
BANNER="##########################################################"

# The string check here is for extra safely.
if [ "${DIR_DEPLOY}" != "" ]
then
    echo "${BANNER} deleting existing dir: ${DIR_DEPLOY}"
    ssh ${SSH_USER}@${REMOTE_HOST} rm -r ${DIR_DEPLOY}
    echo "${BANNER} creating new dir     : ${DIR_DEPLOY}"
    ssh ${SSH_USER}@${REMOTE_HOST} mkdir ${DIR_DEPLOY}
fi

echo "${BANNER} copying new content  : ${DIR_DEPLOY}"
scp -r ${WEB_APP_DIR}/* ${SSH_USER}@${REMOTE_HOST}:${DIR_DEPLOY}/

echo "${BANNER} deleting locally     : ${WEB_APP_DIR}"
rm -r ${WEB_APP_DIR}

echo "${BANNER} changing dir perms   : ${DIR_DEPLOY}"
ssh ${SSH_USER}@${REMOTE_HOST} chown -R ${SSH_USER}:www-data ${DIR_DEPLOY}

