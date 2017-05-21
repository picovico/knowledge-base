#!/bin/bash
./api.sh
git checkout gh-pages
git merge --no-ff master
git push origin gh-pages
git checkout master
