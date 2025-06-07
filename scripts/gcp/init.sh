#!/bin/bash

echo "---------------------------------------------------------------"
echo " Prepare LoggerInterceptor traceId for GCP"
echo "---------------------------------------------------------------"
loggerInterceptorFilePath="./src/logger/logger.interceptor.ts"
sed -i "s/X\-Amzn\-Trace\-Id/X\-Cloud\-Trace\-Context/" $loggerInterceptorFilePath
sed -i "s/\[1\]/\[0\]/" $loggerInterceptorFilePath

echo " Prepare getting platform options for GCP"
echo "---------------------------------------------------------------"
getPlatformOptionsFilePath="./src/logger/utils/get-platform-options.ts"
cat > "$getPlatformOptionsFilePath" <<EOF
import type { LoggerOptions } from 'pino';

import { PlatformsEnum } from '../../modules/utils/enums';
import { gcpLoggerOptions } from '../config/gcp/gcp-logger-options';
import { localLoggerOptions } from '../config/local/local-logger-options';
import { SERVICE_PLATFORM } from '../constants';

export const getPlatformOptions = (): LoggerOptions => {
  switch (SERVICE_PLATFORM) {
    case PlatformsEnum.GCP: {
      return gcpLoggerOptions;
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

echo " Modify README.md file for GCP"
echo "---------------------------------------------------------------"
readmeFilePath="./README.md"
lines=`sed -n '/Amazon/=' $readmeFilePath`
for word in $lines
do
  sed -i ""$word"d" $readmeFilePath;
done
lines=`sed -n '/AWS/=' $readmeFilePath`
for word in $lines
do
  sed -i ""$word"d" $readmeFilePath;
done
sed -i '/^$/N;/^\n$/D' $readmeFilePath

echo " Delete logger options for AWS"
echo "---------------------------------------------------------------"
rm -rf "./src/logger/config/aws"

echo " Delete init scripts for AWS"
echo "---------------------------------------------------------------"
rm -rf "./scripts/aws"
