FROM node:23.1 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:23.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --omiy=dev

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]