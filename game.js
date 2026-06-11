// global Phaser, esto significa que ya tiene una variable que contiene animaciones, estilos, imagenes, musica etc

// configuracion del juego . que tipo de soporte se necesita, donde se va a renderizar el juego
const config = {
  type: Phaser.AUTO, // SE ARA EN AUTOMATICO
  // tamaño
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game", // contenedor donde vamos a renderizar

  scene: {
    //
    preload, // esto carga los recursos
    create, // esto las proyecta o las trabaja
    update,
  },
};

new Phaser.Game(config);
// funciones
// se ejecutaran el este orden, primero 1 sola vez las primeras dos funciones y la ultima constatemente

function preload() {
  console.log("preload");
}

function create() {
  console.log("create");
}

function update() {
  console.log("update");
}
