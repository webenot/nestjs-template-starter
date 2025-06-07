#!bin/bash

PS3='Select cloud provider: '
options=("AWS" "GCP" "quit")
select opt in "${options[@]}";
do
  case $REPLY in
    1) echo 'You selected AWS cloud provider';
    source ./scripts/aws/init.sh;
    break
    ;;
    2) echo 'You selected GCP cloud provider';
    source ./scripts/gsp/init.sh;
    break
    ;;
    3) break
    ;;
    *) echo "Invalid option. Try another one.";continue;;
  esac
done
