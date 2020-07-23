#!/usr/bin/env bash

set -e

echo -e 'Resize image using libvips \n\n\n'
#reset files
echo "" > logs.log
echo "" > last-log.log

function resize {
	/usr/bin/time -v vips resize img-test.jpg out.jpg 0,006 --kernel $1 2> last-log.log
	cat last-log.log >> logs.log

	echo "Max RSS reached with $1 :"
	cat last-log.log | grep "Maximum resident set size"
}

resize lanczos3
resize nearest
resize linear
resize cubic
resize mitchell
resize lanczos2
