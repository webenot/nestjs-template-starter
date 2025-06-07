#!/bin/bash

echo "---------------------------------------------------------------"
echo " Prepare LoggerInterceptor traceId for AWS"
echo "---------------------------------------------------------------"
loggerInterceptorFilePath="./src/logger/logger.interceptor.ts"
sed -i "s/X\-Cloud\-Trace\-Context/X\-Amzn\-Trace\-Id/" $loggerInterceptorFilePath
sed -i "s/\[0\]/\[1\]/" $loggerInterceptorFilePath

echo " Prepare getting platform options for AWS"
echo "---------------------------------------------------------------"
getPlatformOptionsFilePath="./src/logger/utils/get-platform-options.ts"
cat > "$getPlatformOptionsFilePath" <<EOF
import type { LoggerOptions } from 'pino';

import { PlatformsEnum } from '../../modules/utils/enums';
import { awsLoggerOptions } from '../config/aws/aws-logger-options';
import { localLoggerOptions } from '../config/local/local-logger-options';
import { SERVICE_PLATFORM } from '../constants';

export const getPlatformOptions = (): LoggerOptions => {
  switch (SERVICE_PLATFORM) {
    case PlatformsEnum.AWS: {
      return awsLoggerOptions;
    }
    case PlatformsEnum.Local: {
      return localLoggerOptions;
    }
    default: {
      return localLoggerOptions;
    }
  }
};
EOF

echo " Modify README.md file for AWS"
echo "---------------------------------------------------------------"
readmeFilePath="./README.md"
lines=`sed -n '/Google/=' $readmeFilePath`
for word in $lines
do
  sed -i ""$word"d" $readmeFilePath;
done

echo " Delete logger options for GCP"
echo "---------------------------------------------------------------"
rm -rf "./src/logger/config/gcp"

echo " Delete init scripts for GCP"
echo "---------------------------------------------------------------"
rm -rf "./scripts/gcp"
