FROM node:25-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

ARG VITE_N8N_URL
ENV VITE_N8N_URL=$VITE_N8N_URL

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]