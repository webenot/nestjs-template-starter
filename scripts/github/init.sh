#!bin/bash

echo "---------------------------------------------------------------"
echo " Delete configuration for GitLab"
echo "---------------------------------------------------------------"
rm "./.gitlab-ci.yml"

echo " Delete init scripts for GitLab"
echo "---------------------------------------------------------------"
rm -rf "./scripts/gitlab"
