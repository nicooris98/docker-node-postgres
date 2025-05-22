# Etapa 1: Base para desarrollo (instala todas las dependencias)
FROM node:22.16.0-alpine3.21 AS dev-base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Etapa 2: Dependencias de producción (stage intermedio)
FROM node:22.16.0-alpine3.21 AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Etapa 3: Producción final (imagen ligera)
FROM node:22.16.0-alpine3.21 AS prod
EXPOSE 3000
WORKDIR /app
ENV NODE_ENV=production

# Copia solo lo necesario
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=dev-base /app/src ./src
COPY --from=dev-base /app/package*.json ./

CMD ["node", "src/app.js"]

# Etapa 4: Desarrollo (hereda de dev-base)
FROM dev-base AS dev
RUN npm install -g nodemon
EXPOSE 3000
CMD ["npm", "run", "dev"]