# Backend con Docker, Node y Postgres

## Variable de entorno
Copiar el archivo `.env.template` y renombrarlo como `.env`.

## Correr aplicación
```
npm run dev
```

## Docker
### Correr
```
docker compose build
docker compose up
```

### Bajar
```
docker compose down -v
```

## Swagger
Ir a `http://localhost:3000/api-docs` para ver la documentación de los endpoints.