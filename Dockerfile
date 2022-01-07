FROM node:16-alpine as development

ENV PUBLIC_SUPABASE_URL;
ENV PUBLIC_SUPABASE_API_KEY;

WORKDIR /app

COPY package.json ./
COPY npm-shrinkwrap.json ./
COPY .npmrc ./
COPY *config.?js ./
COPY *config.json ./

RUN ls -lahH .

RUN npm install --global npm@latest
RUN npm ci

COPY public ./public
COPY src ./src

CMD [ "npm", "start"]

FROM development as builder

RUN npm run build

FROM nginx:1.21-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html
