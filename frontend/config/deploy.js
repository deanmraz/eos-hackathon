/* eslint-env node */
'use strict';

const HOST = 'eosio.prodtype.com';
const AWS = {
  accessKeyId: process.env.DMRAZ31_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DMRAZ31_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
};

module.exports = function(deployTarget) {
  let ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here
    "revision-data": {
      type: 'file-hash',
      scm: null
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
    ENV.s3 = {
      ...AWS,
      bucket: `stage.${HOST}`,
    };
    ENV['s3-index'] = {
      ...AWS,
      bucket: `stage.${HOST}`,
    };
    ENV.pipeline = {
      activateOnDeploy: true
    };
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV.s3 = {
      ...AWS,
      bucket: `${HOST}`,
    };
    ENV['s3-index'] = {
      ...AWS,
      bucket: `${HOST}`,
      // allowOverwrite: true,
    };

    ENV.pipeline = {
      activateOnDeploy: true,
    };

  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
