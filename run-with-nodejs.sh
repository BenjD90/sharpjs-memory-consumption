#!/usr/bin/env bash

set -e

echo -e 'Prepare and launch node\n\n\n'
echo 'Build app'
yarn

set -x
node src/ &> logs.log &
set +x

PID=$!

until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
    echo 'wait server to start'
    sleep 0.1
done

echo -e '-------- \nAsk api to resize 1 image \n'
(curl -X POST localhost:8080 && echo '') || echo -e "-------------\n   TEST KO    \n-------------"

echo -e '-------- \nLogs \n'
cat logs.log

kill -SIGTERM ${PID}

