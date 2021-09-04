## にじ歌まとめ(仮)
![にじ歌まとめ(仮)ホーム](https://storage.googleapis.com/vtuber_image/niji-songs.app.png)

## アプリケーション概要
にじさんじの歌ってみた動画のまとめサイトです。<br>
歌ってみた動画の検索やランキングを見ることができます。<br>
レスポンシブに対応しており、スマホからもご確認いただけます。<br>
[backend側のレポジトリ](https://github.com/aopontann/nijisanji-songs-server)

## 使用技術
- React
- Next.js
- Material-UI
- SWR
- Recoil
- Prettier
- ESLint

## 機能
- 動画一覧表示機能
- 動画検索機能
- 当日公開される動画表示機能
- タグ追加、削除機能

## セットアップ
.env作成
```
NEXT_PUBLIC_API_ADDRESS = "http://localhost:8081"
```
依存関係のインストール
```
npm install
```
開発を行う([backend](https://github.com/aopontann/nijisanji-songs-server)のAPIも立ち上げる必要がある)
```
npm run dev
```

## ライセンス
このサイトに掲載している画像は全て権利者に帰属し、それ以外のものはMIT Licenseとします。