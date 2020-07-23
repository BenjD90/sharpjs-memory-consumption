const { PassThrough } = require("stream");
const fs = require("fs");
const http = require("http");
const port = process.env.PORT || 8080;
const sharp = require("sharp");
const { exec } = require("child_process");

const server = http.createServer(async (request, response) => {
  try {
    console.log(`${timestamp()} ${request.url}`);
    if (request.method.toLowerCase() === "post") {
      const path = "./img-test.jpg";

      console.log(`${timestamp()} Start resize image !`);
      const stream = fs
        .createReadStream(path)
        .on("error", err => console.error(err))
        .pipe(new PassThrough())
        .on("error", err => console.error(err));

      const resizer = sharp()
        .resize(50, 50, {
          fit: "inside",
          withoutEnlargement: true
        })
        .jpeg({
          quality: 50
        });

      await new Promise((resolve, reject) => {
        stream
          .pipe(resizer)
          .on("error", reject)
          .on("end", resolve)
          .pipe(fs.createWriteStream("./out.jpg"));
      });
      let maxRSSUsedMessage = `Max RSS Used : ${global.maxRSSUsed} Mo`;
      console.log(`${timestamp()} End resize image ! ${maxRSSUsedMessage}`);
      response.end(`image resized ! ${maxRSSUsedMessage}`);
    }
    response.end("OK");
  } catch (e) {
    console.error(`${timestamp()} Error ! ${e.message}`, e);
    response.end("KO");
  }
});

function getMemoryInMo(mem) {
  return Math.round((mem * 100) / 1024 / 1024) / 100;
}

sharp.cache(false);

function timestamp() {
  return new Date().toISOString();
}

server.listen(port, err => {
  if (err) {
    return console.log(`${timestamp()} Error on start`, err);
  }

  let lastValue = 0;
  global.maxRSSUsed = 0;
  setInterval(() => {
    const mem = process.memoryUsage();
    const rss = getMemoryInMo(mem.rss);
    const external = getMemoryInMo(mem.external);
    const heapTotal = getMemoryInMo(mem.heapTotal);
    const arrayBuffers = getMemoryInMo(mem.arrayBuffers);
    if (Math.abs(lastValue - rss) > 5) {
      console.debug(
        `${timestamp()} RSS : ${rss} Mo, HeapTotal : ${heapTotal}, arrayBuffers : ${arrayBuffers}, external : ${external}`
      );
      lastValue = rss;
    }
    if (rss > global.maxRSSUsed) {
      global.maxRSSUsed = rss;
    }
  }, 10);

  console.log(`${timestamp()} Server is listening on ${port}`);

  const isOnDocker = fs
    .readFileSync("/proc/self/cgroup", "utf8")
    .includes("docker");
  if (isOnDocker) {
    let command = 'grep "" /sys/fs/cgroup/memory/*';
    exec(command, (err, stdout) => {
      console.log(`Result of ${command}`);
      console.log(`----`);

      if (err) {
        console.error(err);
      } else {
        console.log(stdout);
        for (let i = 0; i < 5; i++) {
          console.log(`----`);
        }
      }
    });
  }
});
