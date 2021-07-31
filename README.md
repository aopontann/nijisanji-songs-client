[にじ歌(仮)まとめ](https://niji-songs.com)

## アプリケーション概要
にじさんじライバーの歌ってみた動画をまとめて動画のランキングや検索ができるWEBアプリケーション<br>
[backend側のレポジトリ](https://github.com/aopontann/nijisanji-songs-server)

## 使用技術
- React
- Next.js
- JavaScript
- material-ui

## 機能
- 視聴回数のランキング順で動画を表示
- 当日公開される動画を表示
- 動画検索機能
- タグ一覧表示機能
- タグ追加、編集、削除機能

## セットアップ
.env作成
```
API_ADDRESS = "http://localhost:8081"
```
依存関係のインストール
```
npm install
```
開発を行う([backend](https://github.com/aopontann/nijisanji-songs-server)のAPIも立ち上げる必要がある)
```
npm run dev
```
