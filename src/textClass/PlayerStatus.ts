export type PlayerStatusConfig = {
  playerName: string; //名前
  hp: number; //ヘルスポイント:体力
  maxHp: number;
  sp: number; //スキルポイント
  maxSp: number;
  atk: number; //アタック:攻撃力
  maxAtk: number;
  weapon: string; //装備武器
  armor: string; //装備防具
  accessory: string; //装備アクセサリー

  textStyle: Phaser.Types.GameObjects.Text.TextStyle;
};

export class PlayerStatus extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.Text;
  private hpBarBackground: Phaser.GameObjects.Graphics;
  private hpBarForeground: Phaser.GameObjects.Graphics;
  private mpBarBackground: Phaser.GameObjects.Graphics;
  private mpBarForeground: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: PlayerStatusConfig
  ) {
    super(scene, x, y);

    // 背景ボックスの作成
    
    const backgroundBox = scene.add.graphics();
    backgroundBox.fillStyle(0x4b0082, 0.8);
    backgroundBox.fillRect(5, 5, 80, 170);
    this.add(backgroundBox);

    // 名前、レベル、経験値の表示
    this.text = new Phaser.GameObjects.Text(
      scene,
      10,
      10,
      `${config.playerName}`,
      config.textStyle
    );
    this.add(this.text);

        // HPゲージの背景
        this.hpBarBackground = scene.add.graphics();
        this.hpBarBackground.fillStyle(0xe0e0e0, 1);
        this.hpBarBackground.fillRect(10, 40, 70, 10);
        this.add(this.hpBarBackground);
    
        // HPゲージの前景
        this.hpBarForeground = scene.add.graphics();
        this.hpBarForeground.fillStyle(0x00ff00, 1);
        this.hpBarForeground.fillRect(10, 40, (config.hp / config.maxHp) * 70, 10);
        this.add(this.hpBarForeground);
    
        // SPゲージの背景
        this.mpBarBackground = scene.add.graphics();
        this.mpBarBackground.fillStyle(0xe0e0e0, 1);
        this.mpBarBackground.fillRect(10, 60, 70, 10);
        this.add(this.mpBarBackground);
    
        // MPゲージの前景
        this.mpBarForeground = scene.add.graphics();
        this.mpBarForeground.fillStyle(0x00ff00, 1);
        this.mpBarForeground.fillRect(10, 60, (config.sp / config.maxSp) * 70, 10);
        this.add(this.mpBarForeground);

    // ステータスの表示
    let yOffset = 80;
    const keysToShow = ["hp", "sp", "atk"];
    for (const [key, value] of Object.entries(config)) {
      if (keysToShow.includes(key)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1); // 最初の文字を大文字に変換
        const statusText = new Phaser.GameObjects.Text(
          scene,
          10,
          yOffset,
          `${label}: ${value}`,
          config.textStyle
        );
        this.add(statusText);
        yOffset += 30;
      }
    }
  }
  updateHpBar(hp: number, maxHp: number): void {
    this.hpBarForeground.clear();
    this.hpBarForeground.fillStyle(0x00ff00, 1);
    this.hpBarForeground.fillRect(10, 40, (hp / maxHp) * 70, 10);
  }

  updateMpBar(sp: number, maxSp: number): void {
    this.mpBarForeground.clear();
    this.mpBarForeground.fillStyle(0x00ff00, 1);
    this.mpBarForeground.fillRect(10, 60, (sp / maxSp) * 70, 10);
  }
}
