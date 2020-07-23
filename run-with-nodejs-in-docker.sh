#!/usr/bin/env bash

set -e

echo -e 'Prepare and launch docker\n\n\n'
docker build . -t media-resize-mem --no-cache
docker kill media-resize-mem || echo 'no container to clean (stop)'
docker rm media-resize-mem || echo 'no container to clean (rm)'

set -x
docker run --name media-resize-mem -d -p 8080:8080 --memory 100m --memory-swap 100m media-resize-mem
set +x

until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
    echo 'wait server to start'
    sleep 0.1
done

echo -e '-------- \nAsk api to resize 1 image \n'
(curl -X POST localhost:8080 && echo '') || echo -e "-------------\n   TEST KO    \n-------------"

echo -e '-------- \nLogs \n'
docker logs media-resize-mem
docker kill media-resize-mem
