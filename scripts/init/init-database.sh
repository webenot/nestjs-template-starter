#!bin/bash

PS3='Select database driver: '
options=("MongoDB" "PostgreSQL" "quit")
select opt in "${options[@]}";
do
  case $REPLY in
    1) echo 'You selected MongoDB database provider';
    source ./scripts/mongodb/init.sh;
    break
    ;;
    2) echo 'You selected PostgreSQL database provider';
    source ./scripts/postgresql/init.sh;
    break
    ;;
    3) break
    ;;
    *) echo "Invalid option. Try another one.";continue;;
  esac
done
