FROM tarampampam/node:13.1-alpine

LABEL maintainer="SchoolSquirrel Team"
LABEL name="SquirrelFcmRelay"

RUN mkdir -p /app
COPY build /app

ENV NODE_ENV production

EXPOSE 80
CMD ["node", "/app/index.js"]