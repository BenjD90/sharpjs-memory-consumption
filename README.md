# media-resize-mem

A small project to test memory usage while resizing images.

## To run it locally :

- With NodeJS inside a docker :
  ```bash
  ./run-with-nodejs-in-docker.sh
  ```
- With NodeJS only :

  ```bash
  ./run-with-nodejs.sh
  ```

- With libvips directly (require [libvips CLI installed](http://libvips.github.io/libvips/install.html)) :
  ```bash
  ./run-with-libvips.sh
  ```

Example of output logs :

```log
2020-07-23T11:56:32.759Z Server is listening on 8080
2020-07-23T11:56:32.770Z RSS : 46.38 Mo, HeapTotal : 8.48, arrayBuffers : 0.21, external : 1.32
2020-07-23T11:56:32.830Z /
2020-07-23T11:56:32.839Z /
2020-07-23T11:56:32.839Z Start resize image !
2020-07-23T11:56:32.852Z RSS : 51.91 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.862Z RSS : 79.87 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.872Z RSS : 113.64 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.882Z RSS : 144.84 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.893Z RSS : 179.9 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.903Z RSS : 215.48 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.913Z RSS : 251.57 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.924Z RSS : 287.41 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.934Z RSS : 323.76 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.944Z RSS : 359.34 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.954Z RSS : 394.92 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.965Z RSS : 430.75 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.975Z RSS : 466.33 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:32.985Z RSS : 478.19 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:33.057Z RSS : 484.06 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
2020-07-23T11:56:33.087Z End resize image ! Max RSS Used : 488.16 Mo
2020-07-23T11:56:33.087Z RSS : 59.29 Mo, HeapTotal : 8.73, arrayBuffers : 3.26, external : 4.37
```
