export class LoadingScene extends Phaser.Scene {
  constructor() {
    // シーンのkeyを指定
    super("loading");
  }

  preload() {
    this.load.image("street", "../assets/img/background/street.png");
    this.load.image("dragon", "../assets/img/enemy/dragon.png");
    this.load.audio("bossBattleBGM", "../assets/bgm/bossBGM_vsDragon.mp3");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add
      .text(width / 2, height / 2, "Loading...")
      .setOrigin(0.5)
      .setScale(2.0);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true,
    });
    zone.on("pointerdown", () => {
      this.scene.start("title");
    });

    //TODO: この処理に修正
    // this.load.on('complete', () => {
    //     this.scene.start('title');
    //   });
  }
}
