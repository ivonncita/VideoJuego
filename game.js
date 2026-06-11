// global Phaser, esto significa que ya tiene una variable que contiene animaciones, estilos, imagenes, musica etc

// configuracion del juego . que tipo de soporte se necesita, donde se va a renderizar el juego
const config = {
  type: Phaser.AUTO, // SE ARA EN AUTOMATICO
  // tamaño
  width: 400,
  height: 400,
  backgroundColor: "#33b7d8",
  parent: "game", // contenedor donde vamos a renderizar

  scene: {
    //
    preload, // esto carga los recursos
    create, // esto las proyecta o las trabaja
    update,
  },
};

// clase
new Phaser.Game(config);
// funciones
// se ejecutaran el este orden, primero 1 sola vez las primeras dos funciones y la ultima constatemente

// aqui carge la imagen y le di el nombre de cloud1
function preload() {
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
}

// aqui estoy dando la indicacion de se muestre la nube con un tamaño asignado
// con setOrigin estoy diciendole a la imagen que la esquina de la imagen se posicione en la coordenada 0,0
function create() {
  this.add.image(10, 10, "cloud1").setOrigin(0, 0);
}

// la funcion updat al momento de imprimirla en la cossola siempre se esta ejecuntado y contando de manera infinita, esto pasa en todos los videojuegos, ya que por detras siempre se tiene que estar actualizando ya que en los juegos siempre esta pasandop algo, como que se mueva el persona o que el fondo este pasando algo o el tiempo este

function update() {
  console.log("update");
}
