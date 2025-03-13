# React
## Routes

Para las rutas tenemos que entrar en la carpeta de /app/Constants, ai se encuenta dentro de la carpeta routes el fichero routes.constants.jsx en este fichero mediante este tipo de sentencia
( getRoute(Paths[Views.logAdmin].path, Dashboard),) definimos la ruta dentro de Paths y el componente como por ejemplo Dashboard.
Conclusion es que para hacer una ruta se deven modificar 3 ficheros que son el anteriormente mencionado el de paths.constants.js y el de viewa.constants.js que se encuentran en /app/Constants.

## Conponentes

Para crear un conponente simplemente crear carpeta como por ejemplo la carpeta de admin que incica que la vista de lo que hay dentro es para el administrador, luego carpeta Login indica que es el login del administrador y despues se crea un fichero .jsx con este tipo de estructura inicial.

const LoginAdmin = () => { 
    return(
    <>
    <div>sd</div>
    <div>sd</div>
    </>
        
    );
 }
export default LoginAdmin;


toda la app trabaja bajo dos componentes padre que son AuthLayout.jsx que nosotros lo usaremos solo para cuando un administrador entre dentro de la route /my-admin para poderse logear.
El otro conponente padre es el que te muestra el menu lateral.
Estos dos estan dentro de la carpeta de /app/src/Template.

# PHP

## Iniciar un administrador desde postman o app similar

Para crear un endpont para poder crear administradores en la tabla admin de la base de datos emos segido los sigientes pasos,
primero hemos creado en la carpeta objects un fichero admin.php este contiene una clase admin que tiene un objeto PDO para la conexion, un string table_name con el nombre exacto de la tabla que queremos trabajar con el objeto y todos los parametros de la tabla, un consrtuctor que le pasamos un objeto PDO y dentro lo igualamos con el de la clase y una funcion getMainObject que sirve para que cuando retorne al admin retorne todos los parametros de la row, los parametros de tipo id van con un interval(), ese seria el squeleton luego a partir de eso se crean ya las funciones como la de store() que sirve para introducir un admnistrador a la tabala.

Una vez ya hemos creado el objeto con todos los parametros necesarios tenemos que hacer dentro de la carpeta endpoints el endpoint que llamara el front que sera talcual la ruta asta el fichero, en este fichero crearemos un objeto Database i con el realizamos la conexion con la base de datos mediante la funcion getConnection(), recogemos la informacion del front con el postInput(), la utentificacion es con la funcion checkAuth dependiendo si es false o true, creamos un nuevo admin i mediante el input rellenamos el objeto para pasarlo a store que rellene la cueri i con el commitrealizamos la query.