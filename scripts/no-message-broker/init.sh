#!bin/bash

echo "---------------------------------------------------------------"
echo " Prepare AppModule to delete RabbitMQ"
echo "---------------------------------------------------------------"
appModuleFilePath="./src/app.module.ts"
lines=`sed -n '/rmq\.module/=' $appModuleFilePath`
for word in $lines
do
  sed -i ""$word"d" $appModuleFilePath;
done
lines=`sed -n '/RmqModule,/=' $appModuleFilePath`
for word in $lines
do
  sed -i ""$word"d" $appModuleFilePath;
done

sed -i '/^$/N;/^\n$/D' $appModuleFilePath

echo " Remove RabbitMQ provider"
echo "---------------------------------------------------------------"
rm -rf "./src/providers/rmq"

echo " Remove RabbitMQ container configuration"
echo "---------------------------------------------------------------"
rm -rf "./rabbitmq"

echo " Remove packaged for RabbitMQ provider from package.json"
echo "---------------------------------------------------------------"
packageJsonFilePath="./package.json"
lines=`sed -n '/rabbitmq/=' $packageJsonFilePath`
for word in $lines
do
  sed -i ""$word"s/.*$//" $packageJsonFilePath;
done
lines=`sed -n '/amqplib/=' $packageJsonFilePath`
for word in $lines
do
  sed -i ""$word"s/.*$//" $packageJsonFilePath;
done

source ./scripts/init/edit-packages.sh

ex -s +'v/\S/d' -cwq $packageJsonFilePath

echo " Change README.md file"
echo "---------------------------------------------------------------"
readmeFilePath="./README.md"
sed -i "s/,\ \`rabbitmq\`\ and/,/" $readmeFilePath;
lines=`sed -n '/RabbitMQ\ Access/=' $readmeFilePath`
for word in $lines
do
  for (( c=0; c<=3; c++ ))
  do
     lineNumber=$(($word + $c));
     sed -i ""$lineNumber"s/.*$//" $readmeFilePath;
  done
done
sed -i '/^$/N;/^\n$/D' $readmeFilePath

echo " Change configuration service"
echo "---------------------------------------------------------------"
configurationFilePath="./src/modules/configurations/configuration.service.ts"
sed -i "s/ConfigurationService\ extends\ RmqConfiguration/ConfigurationService/" $configurationFilePath;
sed -i "s/protected\ override/private/" $configurationFilePath;
sed -i "s/public\ override/public/" $configurationFilePath;
lines=`sed -n '/RmqConfiguration/=' $configurationFilePath`
for word in $lines
do
  sed -i ""$word"d" $configurationFilePath;
done
lines=`sed -n '/super/=' $configurationFilePath`
for word in $lines
do
  sed -i ""$word"d" $configurationFilePath;
done

echo " Change docker-compose.yaml file"
echo "---------------------------------------------------------------"
dockerComposeFilePath="./docker-compose.yaml"
lines=`sed -n '/rabbitmq:$/=' $dockerComposeFilePath`
for word in $lines
do
for (( c=0; c<=11; c++ ))
do
   lineNumber=$(($word + $c));
   sed -i ""$lineNumber"s/.*$//" $dockerComposeFilePath;
done
done
ex -s +'v/\S/d' -cwq $dockerComposeFilePath
