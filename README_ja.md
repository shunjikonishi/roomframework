# Roomframework
RoomframeworkはSPA(Single Page Application)開発のためのアプリケーションフレームワークです。  
最も中核となる機能はWebSocketの扱いを容易にするためのラッパークラスであり他のフレームワークと組み合わせて使用することも容易です。

## 機能
このライブラリで提供される主な機能は以下です。

- WebSocket関連
  - WebSocketラッパー
  - 再接続管理
  - トークン管理
  - Ajaxライクなリクエストハンドリング
  - メッセージハンドラ登録
- Cache関連
  - WebStorageラッパー
- Logger関連
  - WebSocketLogger

> WebSocket関連の機能を使用するためにはサーバサイドでもそれに合わせた実装が必要です。
> 現在サーバサイドの実装としてはPlayframework用の実装([roomframework-play](https://github.com/shunjikonishi/roomframework-play))があります。

## ファイル構成
## WebSocketラッパーの使用方法
### オプション
### メソッド
### メッセージ構造
