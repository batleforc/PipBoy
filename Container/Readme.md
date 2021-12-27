# Container GUI

At the beginning i was working with the V1 of these image with the intent to rework it my own way... i gave up and choose to use the V3 with all i need.

https://hub.docker.com/r/accetto/ubuntu-vnc-xfce-nodejs-g3

```shell
docker run -d -p 25901:5901 -e VNC_RESOLUTION=1920x1080 accetto/ubuntu-vnc-xfce-nodejs-g3:vnc-vscode-chromium --wait
```
