#!/bin/bash

###curl -o- https://raw.githubusercontent.com/nvm-sh/v0.34.0/install.sh | bash
###. ~/.nvm/nvm.sh
###nvm install node

DIR="/home/ec2-user/magazine-app"
if [ -d "$DIR" ]; then
  echo "$DIR exists"
else
  echo "Creating $DIR directory"
  mkdir $DIR
fi