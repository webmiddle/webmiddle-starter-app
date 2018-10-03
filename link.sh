#!/bin/bash
CWD=$PWD
for filename in ../webmiddle/packages/*; do
  yarn unlink $(basename $filename)
  cd $filename
  yarn unlink
  yarn link
  cd $CWD
  yarn link $(basename $filename)
done
