import { PlayerStatus, PlayerStatusConfig } from "../textClass/PlayerStatus";

export let street: Phaser.GameObjects.Image;

export class MainScene extends Phaser.Scene {
  bgm: Phaser.Sound.BaseSound | null = null;
  //bgm!: Phaser.Sound.BaseSound | null = null;
  count: any;
  countText: Phaser.GameObjects.Text | null = null;
  countEffectText: Phaser.GameObjects.Text | null = null;
  countWeight: any;

  constructor() {
    super("main");
  }

  preload() {
    this.load.image("street", "../assets/img/background/street.png");
    this.load.image("dragon", "../assets/img/enemy/dragon.png");
    this.load.audio("bossBattleBGM", "../assets/bgm/bossBGM_vsDragon.mp3");
  }

  create() {
    const storedItem = localStorage.getItem("count");
    if (storedItem) {
      this.count = JSON.parse(storedItem);
    } else {
      this.count = 0;
    }
    this.countWeight = 1; //countの重み

    const playerStatusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      color: "#ffffff",
      //fontWeight: 'bold',
      stroke: "#000000",
      strokeThickness: 2,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: "#000000",
        blur: 5,
        stroke: true,
        fill: true,
      },
    };

    const playerStatusConfig: PlayerStatusConfig = {
      playerName: "yuyuyu", //名前
      hp: 30, //ヘルスポイント:体力
      maxHp: 30,
      sp: 30, //スキルポイント
      maxSp: 30,
      atk: 1, //アタック:攻撃力
      maxAtk: 1,
      weapon: "test", //装備武器
      armor: "test", //装備防具
      accessory: "test", //装備アクセサリー
      textStyle: playerStatusTextStyle,
    };

    const playerStatus = new PlayerStatus(this, 10, 10, playerStatusConfig);
    console.log(playerStatus);
    this.add.existing(playerStatus).setScale(2.0).setDepth(1);

    this.bgm = this.sound.add("bossBattleBGM", { loop: true, volume: 0.1 });
    this.bgm.play();

    const { width, height } = this.game.canvas;

    street = this.add.image(width / 2, height / 2, "street");
    street.setScale(2.0);

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "36px",
    };

    this.add.image(width / 2, height / 2 - 200, "dragon").setScale(5.0);

    this.countText = this.add
      .text(width / 2, 50, "Money " + this.count.toString(),textStyle)
      .setOrigin(0.5)
      .setScale(2.0);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true,
    });

    zone.on("pointerdown", () => {
      this.count = this.count + this.countWeight; //クリック数を増やす
      if (this.countText) {
        this.countText.setText("Money " + this.count.toString()); // テキストオブジェクトを更新
      }
      localStorage.setItem("count", JSON.stringify(this.count)); // localStrogeの更新
    });

    const clickEventAnimationText: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "Arial",
      fontSize: "68px",
      fontStyle: "bold", // フォントスタイルを太字に設定
      color: "#000000",
      //stroke: '#000000', // テキストの輪郭色を黒に設定
      strokeThickness: 10, // テキストの輪郭の太さを設定
      shadow: { // テキストの影を設定
        offsetX: 5, // 水平方向のオフセット
        offsetY: 5, // 垂直方向のオフセット
        //color: '#333333', // 影の色
        blur: 5, // 影のぼかし度合い
        stroke: true, // 影に輪郭を適用するかどうか
        fill: true, // 影に塗り潰しを適用するかどうか
      },
      align: 'center', // テキストの水平方向の位置合わせ（left, center, right）
      //baseline: 'alphabetic', // テキストの垂直方向の位置合わせ（top, hanging, middle, alphabetic, ideographic, bottom）
      wordWrap: { // 単語の折り返しを設定
        width: 300, // 折り返す幅
        useAdvancedWrap: true, // 改行やハイフンを適切に処理する高度な折り返し機能を使用
      }
    };

    //クリックイベントの設定
    zone.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const EffectText = this.add
        .text(pointer.x, pointer.y, this.countWeight.toString(), clickEventAnimationText)
        .setOrigin(0.5);
    
      // スケールアニメーション
      this.tweens.add({
        targets: EffectText,
        scaleX: 2, // X方向のスケール倍率
        scaleY: 2, // Y方向のスケール倍率
        duration: 1000,
        ease: "Bounce.easeOut", // イージング関数の変更
      });
    
      // 回転アニメーション
      this.tweens.add({
        targets: EffectText,
        angle: 360, // 回転角度 (度)
        duration: 1000,
        ease: "Cubic.easeInOut",
      });
    
      // Y軸方向の移動アニメーション
      this.tweens.add({
        targets: EffectText,
        y: '-=100', // Y軸方向に100ピクセル上へ移動
        duration: 1000,
        ease: "Quadratic.easeOut",
      });
    
      // カラーアニメーション
      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 1000,
        onUpdate: (tween) => {
          const value = Phaser.Math.RoundTo(tween.getValue(), -1);
          EffectText.setColor(Phaser.Display.Color.Interpolate.ColorWithColor(
            Phaser.Display.Color.ValueToColor('#00FFFF'),
            Phaser.Display.Color.ValueToColor('#00FF00'),
            100,
            value
          ).toString());
        },
      });
    
      // フェードアウトアニメーション
      this.tweens.add({
        targets: EffectText,
        alpha: 0,
        delay: 500, // アニメーションを開始する前の遅延時間（500ms）
        duration: 1000,
        ease: "Linear",
        onComplete: () => {
          EffectText.destroy();
        },
      });
    });
    
  }
}
