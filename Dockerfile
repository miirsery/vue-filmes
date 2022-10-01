FROM node:14-alpine AS development
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3030
ENV NODE_ENV=development

COPY package*.json ./

RUN npm install
USER node
COPY --chown=node:node . .

EXPOSE 3030

#CMD [ "npm", "run", "dev" ]

ENTRYPOINT ["/app/wait-for-db.sh"]
