FROM public.ecr.aws/docker/library/node:lts-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM public.ecr.aws/docker/library/node:lts-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --omiy=dev

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]