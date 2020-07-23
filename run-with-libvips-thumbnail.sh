#!/usr/bin/env bash

set -e

echo -e 'Resize image using libvips (vipsthumbnail) \n\n\n'
#reset files
echo "" > logs.log
echo "" > last-log.log

/usr/bin/time -v vipsthumbnail img-test.jpg -o out.jpg --size 50x50 2> last-log.log
cat last-log.log >> logs.log

echo "Max RSS reached :"
cat last-log.log | grep "Maximum resident set size"

