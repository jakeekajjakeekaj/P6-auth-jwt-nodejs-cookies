Propósito: Es donde se configura la aplicación Express. Aquí es donde se cargan todos los middleware, rutas, y se realiza cualquier otra configuración global de la aplicación.
Tareas comunes:
Registrar middleware (por ejemplo, express.json() para el manejo de JSON).
Configurar las rutas.
Definir cualquier otra lógica global que la aplicación necesite antes de ser levantada.
La ventaja de separar la configuración en app.ts es que puedes probar la aplicación (sin tener que inicializar el servidor) y reutilizar la configuración en otros contextos, como en pruebas unitarias.