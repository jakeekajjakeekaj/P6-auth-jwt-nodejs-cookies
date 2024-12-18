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

Una vez finalizado esto, recordemos que debemos hacer nuestro script en el package.json: "dev": "nodemon src/index.ts"

Ahora para trabajar con nuestra DB, creamos nuestro archivo squema.sql para ahí colocar nuestras consultas como buena práctica, y a su vez tendremos que instalar las siguinetes dependencias:
"npm i dotenv mysql mysql2"

Una vez instalado, procedemos a colocar un archivo .env a la misma altura que el server, para ahí mismo colocar nuestras variables de entorno, después de eso, dentro de la carpeta config, aparte de manejar a nuestra databse.ts, vamos a manejar a un archivo llamado config.ts, este archivo servirá para mantener a todas las variables de entorno en un lugar, para que al momento de utilizarlas podamos hacerlo sin ningún problema, una ve realizado esto, ya solo importamos nuestro config.ts dentro de nuestro database.ts para trabajar con nuestras variables de entorno y también lo hacemos en index.ts para así de igual manera trabajar con nuestras variables de entorno con los puertos.

Ahora pasamos a la sección de los middlewares para ahí colocar las validaciones antes de que se pase a nuestro controlador, recordemos que las validaciones de datos de entrada SON RECOMENDABLES DE COLOCAR EN MIDDLEWARE, mientras que las validaciones CON LA LÓGICA DEL NEGOCIO SON RECOMENDABLES DE COLOCAR EN SERVICES (como al intentar localizar usuarios ya existentes o algo por el estilo)

Una vez finalizado todo el primer caso, que sería para el register, recordemos como breves recodatorios que el ASYNC AWAIT son usados mayormente para cuando se realizará algún chequeo a la DB, es por esto que para el caso del MIDDLEWARE no es necesario, porque no revisamos en la DB, pero para el SERVICES si, ya que revisamos si ya existe en nuestra DB el usuario; así mismo recordemos que es buena opcón manejar un Promise<void> en la sección de controllers, ya que de esta manera justamente indicamos que toda la lógica se maneja ahí, que no retorna nada como tal a nadie, y así también evitamos problemas al manejar las routes por ejemplo

Ya probamos ahora sí todo con la DB e forma correcta y funciona bien, pero ahora quitaremos que la contraseña se muestre con texto plano (sin encriptar) para que se pueda encriptar, para esto instalaremos: 
"npm i bcrypt"
De esta manera podremos encriptar la contraseña, lo bueno de hacer esto, es que lo pasa a hash, pero si nosotros quisiéramos saber cuál es el texto plano de ese hash ya no se podrá, osea que ahora todo se deberá trabajar con funciones que verifiquen los hash para confirmar que efectivamente sea la contraseña, algo muy bueno a nivel seguridad
Ahora recordemos que estamos usando TS, por lo que también debemos instalar:
"npm i --save-dev @types/bcrypt"
La generación de la contraseña hasheada se manejará dentro del service

Ahora vamos a utilizar las cookies, para esto debemos instalar:
"npm i cookie-parser"
y
"npm i --save-dev @types/cookie-parser"
De esta manera ya podremos comenzar a utilizar las cookies, esto viene bien ya que si lo guardamos en local storage nos pueden hacer un ataque tipo cross site scripting, lo que significaría que otros sitios pueden ejecutar scripts para obtener la información local storage; pero con las cookies esto no es posible ya que tienen una medida extra de seguridadque básicamente solo permite la extracción de información del sitio configurado, al final no es algo infalible, pero es una medida extra de seguridad; otra cosa es el famoso SSL, osea el https para así cifrar la información y evitar al "hombre del medio" osea alguien que intercepte esta información ya que de hacerlo, la recibiría encriptada

*** RECOMENDACIONES IMPORTANTES ***

Si bien para este proyecto no se están utilizando, es recomendable utilizar un ORM como:
"TypeORM"
Esto ayuda muchísimo en muchos aspectos, para empezar ya no tenemos que escribir código SQL, lo que también evita las inyecciones SQL, sino que también podemos crear la DB desde aquí, es decir que ya no tenemos que acceder a la consola para crear la DB junto con sus tablas y relaciones, porque exactamente, incluso los JOIN ya no son necesarios ya que con el ORM también nos facilitan las relaciones que se pueden ver como complejas

Otra cosa que es recomendable de usar para el caso de la validaciones sería:
"ZOD"
Y los mejor de todo, es que aparte de ser simple y ahorrarnos todas las validaciones que deberíamos escribir de forma manual, esta misma librería es super recomendable para tanto front como back