Contiene la lógica de negocio que no corresponde directamente a un controlador o modelo. Estos archivos podrían gestionar la interacción entre modelos, lógica adicional de la aplicación o conexiones a servicios externos.
Ejemplo: servicios de autenticación, servicios de manejo de archivos, etc.

Quí viene bien colocar validaciones con la lógica del negocio, como al verificar que un dato ya exsita; mientras que en middlewares se colocan las validaciones relacionadas con los datos de entrada.