#!/bin/bash
CWD=$PWD
for filename in ../webmiddle/packages/*; do
    for ((i=0; i<=3; i++)); do
        cd $filename
        yarn link
        cd $CWD
        yarn link $(basename $filename)
    done
done
