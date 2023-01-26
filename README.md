# TB031-ApiRestMongoDB-Mongoose

### MongoDB + Mongoose - API REST con Express

### INSTRUCCIONES: 

1. Instalar las dependencias del proyecto node: `npm install`
2. Conecta tu despliegue en Mongodb en `mongodb://localhost:27017`
3. Ejecuta `npm run dev` en la consola.
3. Utiliza los siguientes endpoints para probar la app.

## Endpoints:


### `/api/providers/ (POST)`

<br>

Crea un nuevo proveedor. Debes incluir `company_name`, `CIF`, `address` y `url_web` (tanto company_name como el CIF no pueden coincidir con otros proveedores de la BBDD.

- Puedes usar el siguiente ejemplo, `POST` en /api/providers/ con la siguiente información:

```javascript
	{
	"company_name":"Heura",
	"CIF":"07354472L",
	"address":"C/Los Molinos, Barcelona",
	"url_web":"https://heurafoods.com/es"
	}	
```

- Puedes crear también otro proveedor:

```javascript
	{
	"company_name":"Garden Gourmat",
	"CIF":"094857693K",
	"address":"C/Los vientos, Madrid",
	"url_web":"https://www.gardengourmat.es/"
	}	
```
<br>

### `/api/products/ (POST)`

<br>

Crea un nuevo producto. Debes incluir `id`, `title`, `price`, `description`, `image` y `providerName` (tanto el nombre como el id no pueden coincidir con otros productos de la BBDD. 

- Puedes usar el siguiente ejemplo, `POST` en /api/products/ con la siguiente información:

```javascript
{ 
	"id": 1,
	"title": "Chorizo 100% vegetal",
	"price": 4.50,
	"description":"Chorizo vegano con alto contenido en proteinas, hierro y vitamina B12, sin gluten",
	"image":"https://www.datocms-assets.com/38036/1667399132-untitled-design-39.png?fit=crop&fm=webp&w=1045.png",
	"providerName": "Heura"
}
```
- También puedes crear otro producto asociado al otro proveedor:

```javascript
{ 
	"id": 2,
	"title": "Vuna",
	"price": 4.50,
	"description":"Atún vegano, alternativa 100% vegetal",
	"image":"https://www.gardengourmat.es/sites/default/files/2022-01/Vuna.png",
	"providerName": "Garden Gourmat"
}
```

<br>

### `/api/providers/ (GET)`

<br>

Devuelve la lista de proveedores.

- Si añades el `name`, te devuelve la empresa con dicho nombre: `api/providers/Heura`

<br>

### `/api/products/:id (GET)`

<br>

Devuelve la lista de productos incluyendo información sobre el proveedor de cada producto.

- Si añades el `id`, te devuelve sólo el producto asociado al mismo: `/api/products/1`

<br>


### `/api/providers/:name (PUT)`

<br>

Modifica un proveedor. Pasando su nombre actual en la ruta. En el req.body tienes que incluir al menos una propiedad a modificar (no tienen por que ser todas), de las siguientes: `newName`, `CIF`, `address` y `url_web`.

- Puedes usar el siguiente ejemplo, `PUT` en `/api/providers/Garden Gourmat` con la siguiente información:

```javascript
	{
	"company_name":"Garden Gourmet",
	"address":"C/Los vientos, 58, Madrid"
	}	
```

<br>


### `/api/products/:id (PUT)`

<br>

Modifica un  proveedor. Pasando su id en la ruta. En el req.body tienes que incluir al menos una propiedad a modificar (no tienen por que ser todas), de las siguientes: `title`, `price`, `description`, `image` y/o "providerName".

- Puedes usar el siguiente ejemplo, vamos a modificar el producto del segundo proveedor totalmente para que sea un nuevo producto del primero `PUT` en /api/products/2 con la siguiente información:

```javascript
{ 
	"title": "Escalope empanado vegano",
	"price": 3.50,
	"description":"Producto vegetal a base de proteína de soja y trigo con aceite de oliva virgen extra 1,9%.",
	"image":"https://www.datocms-assets.com/38036/1667387623-untitled-design-16.png?fit=crop&fm=webp&w=1045",
	"providerName": "Heura"
}
```

<br>

### `/api/providers/:name (DELETE)`

<br>

Elimina el proveedor al pasar su nombre en la ruta.

- Puedes eliminar el proveedor que ya no tiene productos haciendo `DELETE`en la ruta `/api/providers/Garden Gourmet`

<br>

### `/api/products/:id (DELETE)`

<br>

Elimina el producto al pasar su id en la ruta.

- Puedes eliminar el segundo producto haciendo una petición `DELETE`en la ruta `/api/providers/2`

<br>

## Ejercicio original:

1. Crear una colección nueva de Providers y añadirla a nuestra API de back incluyendo Schema y Model en `models/providers.js`. Campos:
	- company_name
	- CIF
	- address
	- url_web
	
2. Modificar el Schema de productos visto en clase para que admita relación entre las colecciones Providers y Products. Modelo de datos normalizado. 

3. Crear varios providers de prueba por consola de MongoDB.

	Ejemplo de objeto Provider:

	```javascript
	{
	    "_id": ObjectId("62b062cff3fa93bf9d66fa06"),
	    "company_name": "Teatro Marquina",
	    "CIF": "B40236882",
	    "address": "Calle de Prim 11",
	    "url_web":"https://www.tortillasmarquina.com"
	}
    ```
4. Crear varios productos de prueba por consola de MongoDB.


Ejemplo de objeto Product
```javascript
	{
	    "_id": ObjectId("62b062cff3fa93bf9d66fa28"),
	    "title": "Tortilla - Marquina",
	    "price": 1.80,
        "description":"La mejor tortilla de la zona en el Teatro Marquina",
	    "provider": ObjectId("62b062cff3fa93bf9d66fa06")
	}
```

6. Crear los siguientes endpoints de la API en el siguiente orden:
	
- [GET] http://localhost:3000/api/products Retorna un objeto con los datos de todos los productos. Retorna un status 200. Usar `populate()` para que traiga los datos del proveedor de cada producto.
- [POST] http://localhost:3000/api/products Se envía por POST los datos del producto a crear y retorna un status 201. Payload `{message: "producto creado",product:{datos_del_producto_creado}`. Primero tendréis que traer los datos del proveedor para obtener el ID_provider. Después se podrá crear el producto.
- [POST] http://localhost:3000/api/providers Se envía por POST los datos del producto a crear y retorna un status 201. Payload `{message: "proveedor creado", product:{datos_del_proveedor_creado}}`.
- [GET] http://localhost:3000/api/providers Retorna un objeto con los datos de todos los providers. Retorna un status 200.
