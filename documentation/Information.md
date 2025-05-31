# MediConnect
## Introducción

Mediconnect es una app que sirve para poder gestionar una clinica medica, presento Mediconnect con la base de un gavinete Auditivo pero se podria utilizar en cualquier otro tipo de clinica medica.
Esta tiene 3 diferentes partes:

- Admin Portal que tiene la funcion de que uno o mas de un Administrador puedan gestionar tanto los porductos que tienen en la clinica a la venta, las diferentescaegorias de 
productos para asi poder agrupar productos de una forma mas eficiente como poder gestionar los usuarios de la app que en este caso son los medicos que trabajan en la clinica 
creandolos desde este apartado para que luego estos trabajadores puedan acceder a la app, tambien permite a los administradores desde su apartado "home" poder visualizar graficas y datos sobre la pagina
como numero de categorias activas, numero de productos activos, numero de usuarios activos, un apartado de recuperacion de productos si se elimina alguna categoria que no se pierdan esos productos y una grafica 
de dos puntos en formato donut para visualizar cual es la categoria con mas productos o cual es la que menos tiene etc.

- User Portal que tiene la funcion de una vez el administrador registra a un usuario este nuevo trabajador/medico de la clinica podra ya dirigirse a el apartado de login del usuario, este apartado en el 
primer logeo pide que canvies la contraseña por seguridad ya que el administrador crea al usuario con una contraseña generica para que este pueda acceder y sustituirla por mayor seguridad, 
a partir de este momento el usuario ya tiene su cuenta en mediconnect my-user y ya podra gestionar sus clientes/pacientes (Crear, visualizar toda su informacion, modificar y eliminar), podra 
crear citas para cada uno de sus clientes añaciento un tipo de motivo para la cita, una fecha... Estas citas podra modificarlas por causas del paciente, anular la cita o completar la cita 
que es cuando llega el momento de la cita reyenas un formulario con la conclusion de la cita y los productos que se recomiendan al usuario y esto te descargara un pdf con toda la informacion 
sobre la cita y una pagina con los productos con su nombre, imagen y barcode de este para que puedas dirigirte a la farmacia o a la misma clinica y puedas pedir le producto.

- El tercer apartado es la Landing Page, este es uno de los motivos por la creacio de este tipo de app para el gavinete auditivo, ya que este necesitava una app para gestion que son los dos puntos anteriores y tambien visualizar por internet su trabajo y productos, asi poder llegar a mas gente.
En esta landing page simplemetne tenemos un diseño atractivo ya que todos los clientes seran lo que podras visualizar,
en este se muestra un inicio con informacion sobre la clinica, un apartado de productos tambien sercheables por categorias, nombres etc. y el apartado de los usuarios para que estos puedan dirigirse al registro.



# React
## Routes

Para las rutas tenemos que entrar en la carpeta de /app/Constants, ai se encuenta dentro de la carpeta routes el fichero routes.constants.jsx en este fichero mediante este tipo de sentencia
( getRoute(Paths[Views.logAdmin].path, Dashboard),) definimos la ruta dentro de Paths y el componente como por ejemplo Dashboard.
Conclusion es que para hacer una ruta se deven modificar 3 ficheros que son el anteriormente mencionado el de paths.constants.js y el de viewa.constants.js que se encuentran en /app/Constants.

## Conponentes

Para crear un conponente simplemente crear carpeta como por ejemplo la carpeta de admin que incica que la vista de lo que hay dentro es para el administrador, luego carpeta Login indica que es el login del administrador y despues se crea un fichero .jsx con este tipo de estructura inicial.

```js
const LoginAdmin = () => { 
    return(
    <>
    <div>sd</div>
    <div>sd</div>
    </>
        
    );
 }
export default LoginAdmin;
```


toda la app trabaja bajo dos componentes padre que son AuthLayout.jsx que nosotros lo usaremos solo para cuando un administrador entre dentro de la route /my-admin para poderse logear.
El otro conponente padre es el que te muestra el menu lateral.
Estos dos estan dentro de la carpeta de /app/src/Template.



## Imagenes
Para crear productos con diferentes fotos en una dropzone primero creatmos un array de imagenes donde guardaremos las imagenes.
El handleSubmit ya enviava antes la informacion correctamente excepto las imagnes asi que se deve enviar de forma file al endpoint y con el body accessor: "image", el array de imagenes y la informacion del producto como nombre, descripcion...


```js
    const handleSubmit = () => {
        if (checkForm()) {
            request("file", getEndpoint(Endpoints.Products.create), {
                accessor: "image",
                image: images,
                ...dataInput
            })
                .then((res) => {
                    successNotification("Product created", true);
                })
                .catch(() => {
                    errorNotification("Error create product", true);
                })
        }


    }
```

La dropzone tiene una configuracion especifica guardada en una funcion.

```js
 const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: true,
        onDrop
    });
```

Las imagenes se guardan en el array de una forma ya que las imagenes son asincronas:
 
```js
 const onDrop = useCallback((acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);
```

Esta es la forma en la que el php recive la info del file para poder recorrer el array y hacer todas las validaciones que deve hacer para guardar alfinal en una columna el array con formato "["guid.excension","guid.excension","guid.excension"...]"


```js
if (!$_FILES)
        createException('No files selected');
    $files = getFiles();
$arrayImages = [];
    foreach ($files as $index => $file) {

        $allowedExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webp'];
        $fileExtension = strtolower(pathinfo($file->fileName, PATHINFO_EXTENSION));

        if (!in_array($fileExtension, $allowedExtensions)) {
            createException('Only image files (png, gif, jpg, jpeg, webp) are allowed.', 415);
        }

        $extension = "." . pathinfo($file->fileName, PATHINFO_EXTENSION);

        $guid = createGUID();

        $filename = $guid . $extension;

        $filePath = FileStorage::FilePathProducts($filename);

        move_uploaded_file($file->tempPath, $filePath);

        $arrayImages[] = $filename;
    }

    $product->images = json_encode($arrayImages);
```





# PHP

## Iniciar un administrador desde postman o app similar

Para crear un endpont para poder crear administradores en la tabla admin de la base de datos emos segido los sigientes pasos,
primero hemos creado en la carpeta objects un fichero admin.php este contiene una clase admin que tiene un objeto PDO para la conexion, un string table_name con el nombre exacto de la tabla que queremos trabajar con el objeto y todos los parametros de la tabla, un consrtuctor que le pasamos un objeto PDO y dentro lo igualamos con el de la clase y una funcion getMainObject que sirve para que cuando retorne al admin retorne todos los parametros de la row, los parametros de tipo id van con un interval(), ese seria el squeleton luego a partir de eso se crean ya las funciones como la de store() que sirve para introducir un admnistrador a la tabala.

Una vez ya hemos creado el objeto con todos los parametros necesarios tenemos que hacer dentro de la carpeta endpoints el endpoint que llamara el front que sera talcual la ruta asta el fichero, en este fichero crearemos un objeto Database i con el realizamos la conexion con la base de datos mediante la funcion getConnection(), recogemos la informacion del front con el postInput(), la utentificacion es con la funcion checkAuth dependiendo si es false o true, creamos un nuevo admin i mediante el input rellenamos el objeto para pasarlo a store que rellene la cueri i con el commitrealizamos la query.


## Imagenes

En storagePaths.php se encuentran las rutas en las cuales se encuentran las imagenes de los productos/avatar y como se deven llamar.

En el endpoint media/... son los enpoints para llamar a las imagenes.

# Enlace presentación

## https://view.genially.com/6836cef81ac258b3c88e89ec/presentation-presentacion-tfg-mediconnect
