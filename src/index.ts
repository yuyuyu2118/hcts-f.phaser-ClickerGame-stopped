import * as Phaser from 'phaser';
import { Scenes } from './scene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,  // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: 1920,
  height: 1080,
  parent: 'game-app',  // #game-app内にcanvasを生成
  scene: Scenes,
  pixelArt: true //自動スムージングを無効
};

new Phaser.Game(config);
