[にじ歌(仮)](https://nijisanji-songs-client.vercel.app)

## アプリケーション概要
にじさんじライバーの歌ってみた動画を集計してまとめたWEBアプリケーション

## 使用技術
- React
- Next.js
- JavaScript
- styled-components

## 機能
- ライバー一覧表示
- ライバーごとに出演している動画を表示
- 視聴回数のランキング順で動画を表示
- 当日公開される動画を表示

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
