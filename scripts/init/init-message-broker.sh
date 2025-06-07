#!bin/bash

PS3='Select message broker: '
options=("RabbitMQ" "none" "quit")
select opt in "${options[@]}";
do
  case $REPLY in
    1) echo 'You selected RabbitMQ message broker';
    break
    ;;
    2) echo 'You selected do not use message broker';
    source ./scripts/no-message-broker/init.sh
    rm -rf "./scripts/no-message-broker"
    break
    ;;
    3) break
    ;;
    *) echo "Invalid option. Try another one.";continue;;
  esac
done
