FROM node:12-alpine

RUN apk update && apk add bash

RUN apk add --no-cache bash

RUN mkdir /cache
WORKDIR /cache
COPY ./package.json ./yarn.* ./
COPY ./package.json ./node_module* ./node_modules/
RUN yarn

RUN mkdir /api
WORKDIR /api
COPY . ./

RUN chmod +x /api/start.sh
RUN chmod +x /api/wait-for-it.sh

EXPOSE 3333

# ENTRYPOINT [ "./start.sh" ]
CMD ["./wait-for-it.sh", "database:5432", "--timeout=0", "--", "./start.sh"]

