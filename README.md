# Website for FICA 2014 - International Festival of Alternative Culture


## Usage

Clone the project, enter `src`. `npm i` and run `npm start` for gulp to start watching your files. Use `npm build` to build to the `./app` folder.

## Deploy

Make sure you have [nginx-proxy](https://github.com/jwilder/nginx-proxy) with [proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) running on your server, and just run `docker-compose` to get up and running with default `HOST` [fica.luandro.com](https://theagency.luandro.com).