#!bin/bash

PS3='Select git provider: '
options=("GitLab" "GitHub" "quit")
select opt in "${options[@]}";
do
  case $REPLY in
    1) echo 'You selected GitLab git provider';
    source ./scripts/gitlab/init.sh
    break
    ;;
    2) echo 'You selected GitHub git provider';
    source ./scripts/github/init.sh
    break
    ;;
    3) break
    ;;
    *) echo "Invalid option. Try another one.";continue;;
  esac
done
