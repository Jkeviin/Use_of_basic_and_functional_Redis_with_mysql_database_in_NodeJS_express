# README

## Descripción

Este código es un ejemplo de cómo utilizar Redis como caché de una base de datos MySQL en una aplicación web usando Node.js y Express.

El código está dividido en tres archivos: `conexionMySql.js`, `conexionRedis.js` e `index.js`.

- `conexionMySql.js` contiene una función que utiliza la librería `mysql2` para conectarse a una base de datos MySQL. La función toma los datos necesarios de las variables de entorno.
- `conexionRedis.js` contiene una función que utiliza la librería `redis` para conectarse a una instancia de Redis. La función también toma los datos necesarios de las variables de entorno.
- `index.js` es el archivo principal de la aplicación. Crea un servidor Express, se conecta a la base de datos MySQL y a la instancia de Redis y define una ruta que consulta la base de datos MySQL y utiliza Redis para cachear los resultados.

## Instalación y configuración

Para utilizar este código, es necesario tener instalado Node.js y Redis.

### Descargar Redis en Windows

Para descargar Redis en Windows, se recomienda utilizar el sitio web [https://redis.io/download](https://redis.io/download). Descargue la versión estable más reciente y descomprima el archivo zip en una carpeta de su elección.

### Iniciar servidor Redis

Para iniciar el servidor Redis, abra una terminal en la carpeta donde descomprimió Redis y ejecute el archivo `redis-server.exe`.

### Instalar dependencias

Para instalar las dependencias necesarias, abra una terminal en la carpeta del proyecto y ejecute el comando:

```
npm install
```

### Configuración de variables de entorno

Este código utiliza variables de entorno para los datos de conexión a MySQL y Redis. Para configurar estas variables, cree un archivo `.env` en la carpeta del proyecto y agregue las siguientes líneas:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=contraseña
MYSQL_DATABASE=nombre_de_la_base_de_datos

REDIS_URL=localhost
REDIS_PORT=6379
```

Reemplace los valores de `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` con los datos correspondientes a su configuración de MySQL. 

### Ejecutar la aplicación

Para ejecutar la aplicación, abra una terminal en la carpeta del proyecto y ejecute el comando (uso de nodemon):

```
npm run dev
```

La aplicación debería estar disponible en `http://localhost:3000`.

## Uso

Una vez que la aplicación esté en ejecución, puede realizar una solicitud GET a `http://localhost:3000/data/:id` para obtener los datos de un usuario de la base de datos MySQL.

El parámetro `:id` debe ser un número entero que corresponda al `id` de un usuario en la tabla `usuarios`.

Si los datos ya están en Redis, se devolverán los datos desde Redis. De lo contrario, se buscarán los datos en la base de datos MySQL y se almacenarán en Redis para futuras solicitudes.

## Notas adicionales

- Este código utiliza la versión `redis@3.1.2` de la librería Redis. Si utiliza otra versión, puede experimentar problemas de compatibilidad.
- Para visualizar de manera gráfica lo que se guarda en Redis, se puede instalar la librería `redis-commander` ejecutando el comando `npm i -g redis-commander` y luego el comando `redis-commander` para abrir el cliente Redis.
