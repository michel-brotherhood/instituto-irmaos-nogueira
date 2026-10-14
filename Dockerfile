# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Variáveis PUBLIC_* (públicas, não são segredos) entram no build — o docker-compose.yml repassa do .env
ARG PUBLIC_CONTACT_EMAIL PUBLIC_WHATSAPP PUBLIC_INSTAGRAM_URL PUBLIC_YOUTUBE_URL PUBLIC_FACEBOOK_URL \
    PUBLIC_SIGNUP_FORM_URL PUBLIC_DONATION_CHECKOUT_URL PUBLIC_SPONSOR_FORM_ENDPOINT PUBLIC_DPO_EMAIL PUBLIC_GA_ID \
    PUBLIC_MAP_TILE_KEY
RUN npm run build:fast

# ---- serve ----
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
