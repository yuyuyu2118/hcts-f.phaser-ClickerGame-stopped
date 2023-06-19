export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add
      .text(width / 2, height / 2, "クリックでスタート")
      .setOrigin(0.5)
      .setScale(2.0);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true,
    });
    zone.on("pointerdown", () => {
      this.scene.start("main", { timelineID: "start" });
    });
  }
}
