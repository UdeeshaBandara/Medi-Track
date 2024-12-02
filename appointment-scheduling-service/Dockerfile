FROM node:23.1 AS development

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:23.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src

COPY package*.json ./

RUN npm install --omiy=dev

COPY . .

COPY --from=development /src/dist ./dist

CMD ["node", "dist/main"]