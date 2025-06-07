#!/bin/bash

echo " Remove unnecessary commas from package.json"
echo "---------------------------------------------------------------"
lines=`sed -n '/},$/=' $packageJsonFilePath`
for word in $lines
do
  prevLine=$(($word - 1));
  sed -i ""$prevLine"s/,$//" $packageJsonFilePath;
done
