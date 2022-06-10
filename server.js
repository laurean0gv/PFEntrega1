const express = require("express");
const app = express();
const productosRouter = require("./indexProductos.js");
const carritoRouter = require("./indexCarrito.js");

//Defino mi entorno publico
app.use(express.static("public")); 


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
 
app.listen(8080, () => {
  console.log("Estoy escuchando 8080");
});