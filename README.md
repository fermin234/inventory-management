# Inventory Management

Este proyecto es un sistema de gestión de inventario para una empresa, desarrollado como parte de una prueba técnica para la posición de Desarrollador Backend. El sistema permite manejar productos, categorías y transacciones de inventario, registrando entradas y salidas de stock

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)

## Descripción General

El sistema de gestión de inventario maneja tres módulos principales:

- **Producto**: Almacena información sobre cada producto, incluyendo su stock y categoría.
- **Categoría**: Clasifica los productos en diferentes grupos.
- **Transacción**: Registra entradas y salidas de stock, lo que permite llevar un seguimiento preciso de la cantidad disponible de cada producto.

Cada transacción afecta el inventario, asegurando que no se pueda registrar una salida de stock si no hay suficientes productos disponibles.

## Requisitos del Sistema

- Node.js v20 o superior
- Docker

## Tecnologías Utilizadas

- **Backend**: NestJS con TypeScript
- **Base de Datos**: MySQL
- **ORM**: TypeORM
- **Contenedores**: Docker
- **Autenticación**: No implementada en esta versión

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/inventory-management.git
   cd inventory-management
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno en un archivo .env basado en .env.dist. Asegúrate de configurar correctamente la conexión a la base de datos.

4. (Opcional) Iniciar la base de datos con Docker:

   ```bash
   docker-compose up -d
   ```

5. Iniciar la aplicación:

   ```bash
   npm run start:dev
   ```

6. Importar la colección de Postman (opcional). [Colección aquí](#cómo-utilizar-la-colección-en-postman)

## Uso

Después de haber instalado las dependencias y configurado el entorno, puedes probar los siguientes endpoints para gestionar productos, categorías y transacciones.

### API Endpoints

#### Productos

- `GET /product` - Obtener todos los productos.
- `GET /product/report` - Obtener el reporte de todos los productos ordenados de menos a mayor segun su STOCK.
- `GET /product/{id}` - Obtener un producto específico.
- `GET /product/name/{name}` - Obtener un producto específico segun su nombre.
- `POST /product` - Crear un nuevo producto.
- `PUT /product/{id}` - Actualizar un producto existente.
- `DELETE /product/{id}` - Eliminar un producto (soft delete).

#### Categorías

- `GET /category` - Obtener todas las categorías.
- `GET /category/{id}` - Obtener una categoría en específico.
- `GET /category/name/{name}` - Obtener una categoría en específico segun su nombre..
- `POST /category` - Crear una nueva categoría.
- `PUT /category/{id}` - Actualizar una categoría.
- `Delete /category/{id}` - Eliminar una categoría

#### Transacciones

- `GET /transaction` - Obtener todas las transacciones.
- `GET /transaction/{id}` - Obtener una transaccion.
- `GET /transaction/name/{name}` - Obtener una transaccion segun el nombre.
- `POST /transactions` - Registrar una transacción de entrada o salida de stock. Asegura que no se registren salidas si no hay stock suficiente.
- `PUT /transaction/{id}/` - Actualizar una transaccion.
- `DELETE /transaction/{id}` - Eliminar una transaccion.

### Validaciones

- El precio debe ser un número positivo.
- La cantidad de stock debe ser un número entero no negativo.

## Colección de Postman

Dentro de la carpeta `postman`, encontrarás una colección de todos los endpoints para poder probar la aplicación. Puedes importarla en Postman para facilitar la interacción con la API.

### Cómo utilizar la colección en Postman

1. **Abrir Postman**: Asegúrate de tener la aplicación Postman instalada en tu computadora. Si no la tienes, puedes descargarla desde [aquí](https://www.postman.com/downloads/).

2. **Importar la colección**:
   - Abre Postman y dirígete a la pestaña "Collections" en el panel izquierdo.
   - Haz clic en el botón "Import" (importar).
   - Selecciona la opción "Upload Files" (subir archivos).
   - Busca y selecciona el archivo `InventoryManagement.postman_collection.json` que se encuentra dentro de la carpeta `postman` de tu proyecto.
   - Haz clic en "Open" (abrir) para importar la colección.
