# django-react-shopping-cart
Carrito de compras

Un usuario se registra en el sistema con un correo electrónico y una contraseña,
ademas de información personal básica edad, nombre, sexo.
Una vez registrado el usuario puede ingresar al sistema mediante una pantalla de
login.
Existen dos tipos de usuarios comprador y vendedor como vendedor el login lo debe
redirigir a una pantalla con todas sus ventas que puede ser una tabla, esta tabla debe de
contener todas las ventas paginadas de max 10, 20, 30 elementos.
Como comprador el login lo debe redirigir a una pantalla en la que se muestran todos
los productos en una vista que puede ser una simple tabla con la descripción, el costo del
producto, una imagen y las opciones para agregar productos al carrito de compra. Se debe
considerar si ocurrió un error al traer la información desplegando un mensaje que indique que
algo falló. En alguna parte de la página debe mostrarse el acceso al carrito de compra
indicando si hay productos añadidos y con un click poder ir al detalle.
Dentro del detalle del carrito de compra se debe mostrar la información de los
productos agregados una opción para eliminar o añadir más productos y un botón para
realizar la compra.
Lógica de inventario, validar que solo se muestran los productos en existencia.


## Instrucciones de descarga e instalación

* 1 - Abrir una terminal y clonar proyecto: `git clone https://github.com/elopezp/react-django-shopping-cart.git`
* 2 - Ir al directorio de backend: `cd react-django-shopping-cart`
* 3 - Construir contener de backend: `docker build .`
* 4 - Construir docker-compose de backend junto base de datos postgresql:
`docker-compose build`
* 5 - Ejecutar docker-compose `docker-compose up`
* 6 - Crear base de datos con migrate: `docker-compose run --rm app sh -c "python manage.py migrate"`
* 7 - Crear datos de inicio con fixtures: `docker-compose run --rm app sh -c "python manage.py loaddata initialdata.json"`
* 8 - En otra terminal ir al directorio de frontend: `cd ../frontend`
* 9 - Instalar dependencias npm: `npm install`
* 10 - Ejecutar aplicación frontend en modo desarrollo: `npm run start`
* 11 - Abrir [http://localhost:3000](http://localhost:3000) para verse en un navegador.

## Tecnologías usadas

[Django](https://www.djangoproject.com/), [Django REST Framework](https://www.django-rest-framework.org/),[React](https://reactjs.org/),[React Redux](https://react-redux.js.org/),[React-bootstrap](https://react-bootstrap.github.io/),[React intl ](https://formatjs.io/docs/getting-started/installation/),
[Docker](https://www.docker.com/)