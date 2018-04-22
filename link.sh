#!/bin/bash
CWD=$PWD
for filename in ../webmiddle/packages/*; do
  cd $filename
  yarn link
  cd $CWD
  yarn link $(basename $filename)
done
