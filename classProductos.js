
const fs = require ('fs');

  
module.exports = class Contenedor {
    

    constructor(archivo) {
        this.path=archivo;

                //me fijo si el archivo exite
                const stats = fs.existsSync(archivo);
                //si no existe lo creo
                if (!stats) {
                    try {
                        //leer archivo y cargarlo en array
                        fs.promises.writeFile(archivo, "[]");
                      } catch (e) {
                        throw error;
                      }
                  }
    }

    

              /**
     * 
     * @param {recibe id y devuelve el json de con ese id} idPedido 
     */
    async getById(idPedido) {
        let respuesta=null;
        try {
        
            //leo el archivo y lo parseo a json
            const dataParse = await this.getAll();
            
            //recorro el json buscando el id
            for (let i=0; i < dataParse.length; i++) {
                //si lo encuento lo retorno
                if(idPedido==dataParse[i].id){
                    respuesta= dataParse[i];
                }
            }

        } catch (error) {
            console.log(error.message);
        }

        //si ya recorrio todo el json y no lo encontro, devuelvo el mensaje diciendo que no se encontro
        if(respuesta==null){
            respuesta={error: 'producto no encontrado'};
        }
        
        return JSON.stringify(respuesta);
        
    };

    //leo el archivo, lo parseo a json y lo devuelvo
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.path,"utf-8");
            const dataParse = JSON.parse(data);

            return dataParse;
        }
        catch(Error){
            console.log(Error.message);
        }

    }

    async deleteById(id) {

    try {

        let prodFinal = JSON.parse('[]');
        //leo el archivo y lo parseo a json
        const dataParse = await this.getAll();
            
        //recorro el json buscando el id
        for (let i=0; i < dataParse.length; i++) {
            //si lo encuento lo retorno
            if(id!=dataParse[i].id){
                prodFinal.push(dataParse[i]);
            }   
        }

        
        await fs.promises.writeFile(this.path, JSON.stringify(prodFinal));
        
        return (200);

        } catch (error) {
        console.log(error.message());
        }
    
    }

     /**
     * 
     * @param {recibe json en formato srting} object 
     */
    async save(object) {
        try {
            let id=1;

            //guardo el object y lo parseo a json
            let jsonSave=JSON.parse(object);

            //me traigo el contenido del archivo
            let dataParse = await this.getAll();
            
            //me fijo cual es el ultimo id y si no nada hay le asigno 1
            if (dataParse.length> 0 ){
                id=parseInt(dataParse[dataParse.length-1].id)+1;
                jsonSave.id=id;                
            }
            else{
                jsonSave.id=id;
            }
            //agrego el timestamp
            let timestamp=(Date.now());
            jsonSave.timestamp=timestamp
            //guardo el nuevo objeto con el id ya asignado
            dataParse.push(jsonSave);

            //guardo el archivo otra vez
            await fs.promises.writeFile(this.path, JSON.stringify(dataParse));
            return jsonSave;

        } catch (error) {
            console.log(`Error : ${error.message}`);
        }
        
    }
   
    
    

        async putById(id, body) {
            let respuesta={error: 'producto no encontrado'};
            let prodFinal = JSON.parse('[]');
            let producto='';
            
            try {
                //leo el archivo y lo parseo a json
                const dataParse = await this.getAll();
                
                
                //recorro el json buscando el id
                for (let i=0; i < dataParse.length; i++) {
                    //si lo encuento lo retorno
                    if(id==dataParse[i].id){
                        console.log('encontrado');
                        producto= dataParse[i];
                        producto.timestamp=(Date.now());
                        producto.nombre=body.nombre;
                        producto.descripcion=body.descripcion;
                        producto.codigo=body.codigo;
                        producto.precio=body.precio;
                        producto.stock=body.stock;
                        prodFinal.push(producto);
                    }
                    else{
                        prodFinal.push(dataParse[i]);
                    }
                }

                
                await fs.promises.writeFile(this.path, JSON.stringify(prodFinal));
                
                respuesta=producto;
                

            }
            catch(Error){
              
            }
            return respuesta;
        }


}