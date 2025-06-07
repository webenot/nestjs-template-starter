#!bin/bash

echo " Change tsconfig and linter configuration"
echo "---------------------------------------------------------------"
tsconfigPath="./tsconfig.build.json"
lines=`sed -n '/"src\/providers\/database\/mongodb\/\*\*\/\*"/=' $tsconfigPath`
for word in $lines
do
   sed -i ""$word"s/.*$//" $tsconfigPath;
   prevLine=$(($word - 1));
   sed -i ""$prevLine"s/,$//" $tsconfigPath;
done
ex -s +'v/\S/d' -cwq $tsconfigPath

eslintConfigPath="./.eslintrc.js"
sed -i "s/, 'src\/providers\/database\/mongodb\/\*\*\/\*'//" $eslintConfigPath;
