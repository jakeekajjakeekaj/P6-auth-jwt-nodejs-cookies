Aquí crearemos un sistema de autenticación de USUARIO con COOKIES y JASON WEB TOKEN

Aquí únicamente realizaremos una pequeña práctica para un correcto estructurado y formación del back con las API, utilizando TS para seguirlo practicando

Hacemos nuestro npm init dentro de la carpeta server

Instalamos express, cors

instalamos nodemon -D para las dev dependencies

instalamos npm i --save-dev @types/express @types/node @types/cors

instalamos npm install ts-node typescript --save-dev

Para crear un tsc escribimos npx tsc --init, de esta manera crearemos un tsconfig.json; y dentro del mismo escribiremos este código:
```json
{
  "compilerOptions":
    { 
      "target": "es6", 
      "module": "commonjs", 
      "strict": true, 
      "esModuleInterop": true, 
      "skipLibCheck": true, 
      "forceConsistentCasingInFileNames": true, 
      "outDir": "./dist" 
    }
}

Un buen caso para la organización a nivel back y manejar un "estándar", sería organizando a la carpeta src, esta se dividiría en:
+ "config: Archivos de configuración, como la configuración de la base de datos, claves de API, variables de entorno, o cualquier otro ajuste global que la aplicación necesite.
Ejemplo: configuración de base de datos, variables de entorno."

+ "controllers: Propósito: Los controladores son responsables de manejar las solicitudes HTTP que llegan a la aplicación. Reciben la petición del cliente (por ejemplo, desde el frontend), procesan la lógica correspondiente (con la ayuda de los modelos), y finalmente devuelven una respuesta.
Tareas comunes: Validar datos de entrada, llamar a servicios o modelos, y enviar respuestas al cliente.
Ejemplo: Un controlador podría tener una función para manejar una solicitud POST para crear un nuevo empleado o GET para listar todos los empleados."

+ "interfaces: Si usas TypeScript, es útil tener un lugar donde almacenar todas las interfaces o tipos que se usan en diferentes partes de la aplicación, asegurando que tu código esté correctamente tipado.
Ejemplo: tipos para los modelos de usuario, tipos para respuestas API, etc."

+ "middlewares: Incluye funciones middleware, que son aquellas que se ejecutan entre la recepción de una solicitud y la respuesta. Estas funciones pueden manejar la autenticación, la validación de datos, el manejo de errores, etc.
Ejemplo: autenticación, manejo de CORS, validaciones antes de las rutas."

+ "models: Propósito: Los modelos representan la estructura de los datos de la aplicación y manejan la lógica relacionada con la base de datos. Definen cómo los datos deben ser almacenados, validados y gestionados.
Tareas comunes: Definir esquemas de datos, realizar consultas a la base de datos, insertar, actualizar o eliminar registros.
Ejemplo: Un modelo podría representar la estructura de un empleado (nombre, edad, puesto, etc.) y contener métodos para interactuar con la base de datos, como agregar o buscar empleados."

+ "public: Si tu aplicación sirve archivos estáticos como imágenes, archivos CSS o JavaScript del frontend, una carpeta public/ o assets/ es útil para organizar esos archivos.
Ejemplo: imágenes estáticas, archivos descargables, etc."

+ "routes: Propósito: Las rutas definen los endpoints (puntos de acceso) de la aplicación. Son las que se encargan de vincular las solicitudes entrantes (URLs y métodos HTTP) con los controladores correspondientes que manejarán esas solicitudes.
Tareas comunes: Asignar controladores a rutas específicas, definir qué controlador debe manejar una ruta GET, POST, PUT, DELETE, etc.
Ejemplo: La ruta /api/employees podría estar asociada a un controlador que maneje la obtención o creación de empleados."

+ "services: Contiene la lógica de negocio que no corresponde directamente a un controlador o modelo. Estos archivos podrían gestionar la interacción entre modelos, lógica adicional de la aplicación o conexiones a servicios externos.
Ejemplo: servicios de autenticación, servicios de manejo de archivos, etc."

COMO ARCHIVOS ALOJADOS DIRECTAMENTE EN EL SRC SIN NINGUNA CARPETA DE POR MEDIO SERÍA:

+ "index.ts: Propósito: Este archivo es el punto de entrada principal de la aplicación. Aquí se inicia el servidor y se configuran los aspectos generales de la aplicación, como la inicialización de rutas, el middleware, y la conexión a la base de datos.
Tareas comunes: Configurar el servidor (normalmente con Express en Node.js), registrar los middleware globales, cargar las rutas, y escuchar en un puerto para aceptar solicitudes HTTP.
Ejemplo: En este archivo se inicia la conexión a la base de datos, se configuran las rutas principales y se establece el puerto en el que el servidor va a estar escuchando."

+ "app.ts: Propósito: Es donde se configura la aplicación Express. Aquí es donde se cargan todos los middleware, rutas, y se realiza cualquier otra configuración global de la aplicación.
Tareas comunes:
Registrar middleware (por ejemplo, express.json() para el manejo de JSON).
Configurar las rutas.
Definir cualquier otra lógica global que la aplicación necesite antes de ser levantada.
La ventaja de separar la configuración en app.ts es que puedes probar la aplicación (sin tener que inicializar el servidor) y reutilizar la configuración en otros contextos, como en pruebas unitarias."