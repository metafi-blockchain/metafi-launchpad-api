

docker buildx build --platform linux/amd64 -t roster90/onepad-api:0.1.2 --load .

docker buildx build --platform linux/amd64,linux/arm64 -t roster90/onepad-api:0.1.2 --push .

docker push roster90/onepad-api:0.1.2
