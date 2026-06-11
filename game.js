// global Phaser, esto significa que ya tiene una variable que contiene animaciones, estilos, imagenes, musica etc

// configuracion del juego . que tipo de soporte se necesita, donde se va a renderizar el juego
const config = {
  type: Phaser.AUTO, // SE ARA EN AUTOMATICO
  // tamaño
  width: 200,
  height: 300,
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

//load se encarga de preparr la imagen y lo siguien es con lo que le indica que vas a cargar
//SPRITESSHEET A DIFERENCIA DE LA IMAGEN, INDICA QUE NO ES UNA IMAGEN COMPLETA, SI QUE SE TIENE QE SUBIR EL ARCHIVO Y DIVIDIRLO EN POCIONES MAS PEQUEÑAS
// frameWhith sirve para decirle cuanto mida cada elemento de una imagen que contiene varios elementos, como la imagen tiene un pero de 108 y contiene 6 elementos, se se divide
function preload() {
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
  this.load.spritesheet("mario1", "assets/entities/mario.png", {
    frameWidth: 16,
  });
  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");
}

// aqui estoy dando la indicacion de se muestre la nube con un tamaño asignado
// con setOrigin estoy diciendole a la imagen que la esquina de la imagen se posicione en la coordenada 0,0
// con setScale modifico el tamaño de la imagen
// 100 va para en medio , 50 baja
//tileSpring  se usa para decir que va a repetirse como bucle la imagen
// el se llama de la configuracion que ya agregamos
function create() {
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.3);

  this.add.tileSprite(0, config.height - 70, config.width, 32, "floorbricks");

  this.mario1 = this.add.sprite(50, 200, "mario1").setOrigin(0, 0);
  this.keys = this.input.keyboard.createCursorKeys();
}

// la funcion updat al momento de imprimirla en la cossola siempre se esta ejecuntado y contando de manera infinita, esto pasa en todos los videojuegos, ya que por detras siempre se tiene que estar actualizando ya que en los juegos siempre esta pasandop algo, como que se mueva el persona o que el fondo este pasando algo o el tiempo este

function update() {
  const velocidad = 2;
  // metodo
  // esta linea basicamente significa si usuario esta presinando (isDown en programacion de videojugos) keys izquiero se movera dos "posiiones a la izquierda"

  if (this.keys.left.isDown && this.mario1.x > 0) {
    this.mario1.x -= velocidad;
    // esta linea es como decir si no esta presionando la derecha pues presiona la izquiera y se movera a la dereha,
    // && AMBAS CONDICIONES SE DEBEN DE CUMPLIS
  } else if (this.keys.right.isDown && this.mario1.x < config.width - 16) {
    this.mario1.x += velocidad;
  }
}
