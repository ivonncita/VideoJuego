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
    preload, // esto carga los recursos
    create, // esto las proyecta o las trabaja
    update, // actualiza
  },
};

// clase
new Phaser.Game(config);

function preload() {
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");
  this.load.spritesheet("mario1", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });

  this.load.spritesheet(
    "mistery",
    "assets/blocks/underground/misteryBlock.png",
    { frameWidth: 18, frameHeight: 18 },
  );

  this.load.image("longTube", "assets/scenery/vertical-large-tube.png.png");
  this.load.spritesheet("koopa", "assets/entities/koopa.png", {
    frameWidth: 18,
    frameHeight: 25,
  });
}

// 100 va para en medio , 50 baja
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create() {
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.3);
  this.add.image(300, 50, "cloud1").setOrigin(0, 0).setScale(0.3);

  this.keys = this.input.keyboard.createCursorKeys();

  //////////////////////////////////suelo/////////////////////////////////////////
  this.floor = this.physics.add.staticGroup();
  let sueloFisico = this.add
    .tileSprite(0, config.height - 70, config.width, 32, "floorbricks")
    .setOrigin(0, 0);
  this.floor.add(sueloFisico); // no mover, suelo vs fisica
  ///////////////////////////////////////////////////////////////7
  this.mistery = this.physics.add.sprite(200, 120, "mistery");
  this.mistery.body.setAllowGravity(false);
  this.mistery.body.setImmovable(true);

  ///////////////////////////////////////////////////////
  this.longTube = this.physics.add.image(300, 200, "longTube");

  this.koopa = this.physics.add.sprite(150, 220, "koopa");
  this.koopa.body.setAllowGravity(false);
  this.koopa.body.setImmovable(true);

  this.mario1 = this.physics.add.sprite(50, 210, "mario1").setOrigin(0, 1);
  0;
  this.longTube.body.setAllowGravity(false);
  // esta linea  no permite que se mueva,  por lo que en teoria se omitiria si queremos que algo se sie afecte
  this.longTube.body.setImmovable(true);

  /////////////////////////////////////////////////////////////7
  this.physics.add.collider(this.mario1, this.floor);
  this.physics.add.collider(this.mario1, this.mistery);
  this.physics.add.collider(this.mario1, this.longTube);
  this.physics.add.collider(this.mario1, this.koopa);
  this.physics.add.collider(this.floor, this.koopa);

  /////////////////////// ccc  ////////////////////jkkkk/////////////////////////nnnnn777

  this.anims.create({
    key: "mario-walk",

    frames: this.anims.generateFrameNumbers("mario1", { start: 1, end: 3 }),
    frameRate: 12,
    repeat: -1,
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

this.mario1.flipX = false; // Mira a la derecha

function update() {
  const velocidadHorizontal = 160;

  if (this.keys.left.isDown) {
    // El valor debe ser NEGATIVO para ir a la izquierda
    this.mario1.setVelocityX(-velocidadHorizontal);
    this.mario1.anims.play("mario-walk", true);
    this.mario1.flipX = true;
  } else if (this.keys.right.isDown) {
    // Valor POSITIVO para ir a la derecha
    this.mario1.setVelocityX(velocidadHorizontal);
    this.mario1.anims.play("mario-walk", true);
    this.mario1.flipX = false;
  } else {
    // Si no presionas nada, se detiene en seco
    this.mario1.setVelocityX(0);

    if (this.mario1.body.touching.down) {
      this.mario1.anims.play("mario-idle", true);
    }
  }

  if (this.keys.up.isDown && this.mario1.body.touching.down) {
    this.mario1.setVelocityY(-270);
    this.mario1.anims.play("mario-jump", true);
  }

  if (!this.mario1.body.touching.down) {
    this.mario1.anims.play("mario-jump", true);
  }
}
