// configuracion del juego . que tipo de soporte se necesita, donde se va a renderizar el juego
const config = {
  type: Phaser.AUTO, // SE ARA EN AUTOMATICO

  width: 400,
  height: 300,
  backgroundColor: "#33b7d8",
  parent: "game", // contenedor donde vamos a renderizar
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, // aqui, dependiendo del juego puede aumentar para que de la impresion de que es mas pesado

      debug: false,
    },
  },
  scene: {
    //
    preload, // esto carga los recursos
    create, // esto las proyecta o las trabaja
    update, // actualiza
  },
};

// clase
new Phaser.Game(config);
// funciones
// se ejecutaran el este orden, primero 1 sola vez las primeras dos funciones y la ultima constatemente

// frameWhith sirve para decirle cuanto mida cada elemento de una imagen que contiene varios elementos, como la imagen tiene un pero de 108 y contiene 6 elementos, se se divide
function preload() {
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");
  this.load.spritesheet("mario1", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });

  //this.anims sub sistema de phaser
}

//

// 100 va para en medio , 50 baja
//tileSpring  se usa para decir que va a repetirse como bucle la imagen

function create() {
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.3);
  this.add.image(300, 50, "cloud1").setOrigin(0, 0).setScale(0.3);

  this.floor = this.physics.add.staticGroup();
  this.floor
    .create(0, config.height - 70, config.width, 16, "floorbricks")
    .setOrigin(0.5);

  this.floor
    .create(1000, config.height - 70, config.width, 16, "floorbricks")
    .setOrigin(0.5);

  this.physics.add.collider(this.mario1, this.floor);
  this.add
    .tileSprite(0, config.height - 70, config.width, 32, "floorbricks")
    .setOrigin(0, 0);
  //this.mario1 = this.add.sprite(50, 200, "mario1").setOrigin(0, 0); esta liena era para que la imagen de mario se quedara en la pantalla, ya no es necesaria porque se agrego gravedad

  this.mario1 = this.physics.add.sprite(50, 210, "mario1").set.setOrigin(0, 1);
  //setGravityY(200);   // con la variable confi, ya cuenta con uuna gavedad por defaun, si en caso de que cada personaje quieras que tenga una gravedad diferente se usa esta lina set gravity

  this.keys = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: "mario-walk",
    // funcion exclusio de phearse que calcula movimiento de pixeles para dar ilusion de estar caminando
    frames: this.anims.generateFrameNumbers("mario1", { start: 1, end: 3 }),
    frameRate: 12,
    repear: -1,
  });
  this.anims.create({
    key: "mario-idle",
    frames: [{ key: "mario1", frame: 0 }],
  });

  // salto
  this.anims.create({
    key: "mario-jump",
    frames: [{ key: "mario1", frame: 5 }],
  });
}

function update() {
  const velocidad = 1.5;
  // metodo

  if (this.keys.left.isDown && this.mario1.x > 0) {
    this.mario1.x -= velocidad;
    this.mario1.anims.play("mario-walk", true);
    // gira a la izquierda
    this.mario1.flipX = true;
    // esta linea es como decir si no esta presionando la derecha pues presiona la izquiera y se movera a la dereha,
    // && AMBAS CONDICIONES SE DEBEN DE CUMPLIS
  } else if (this.keys.right.isDown && this.mario1.x < config.width - 16) {
    this.mario1.x += velocidad;
    this.mario1.anims.play("mario-walk", true);
    /// gia a la derecha
    this.mario1.flipX = false;
    //basicamente se lee como si no se esta presionando ningun boton quedate en el frame de la key mario-idle
  } else {
    this.mario1.anims.play("mario-idle", true);
  }
  if (this.keys.up.isDown) {
    // esta linea dice basicamente revisa si en la llave de entrada, es decir que se esta ingredando en el teclado es la flecha de arriba en y
    //El eje $Y$ aumenta hacia ABAJO. Por lo tanto, si quieres que un personaje suba hacia el cielo, tienes que restarle píxeles a su posició
    this.mario1.y -= 5;
    this.mario1.anims.play("mario-jump", true);
  }
}
