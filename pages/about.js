import Layout from "../components/Layout";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function About() {
  return (
    <Layout>
      <Typography variant="h5" paragraph>
        このサイトについて
      </Typography>
      <Typography variant="subtitle1">
        どんなサイト？
      </Typography>
      <Typography variant="body" paragraph>
        にじさんじライバーの歌ってみた動画(オリ曲,ネタも含む)をまとめた非公式サイトです。<br />
        にじさんじ公式チャンネルや外部コラボチャンネルから公開された動画のみ掲載しています。
      </Typography>
      <Typography variant="subtitle1">
        このサイトの目的
      </Typography>
      <Typography variant="body" paragraph>
        にじさんじライバーの歌ってみた動画を探しやすくするために作成しました！<br />
        また、このサイトを使ってくれた人が「このライバーさん、この曲歌っているんだ。知らなかった！」
        と思ってもらって色んなにじさんじライバーを知るきっかけになったらいいなと思っています。
      </Typography>
      <Typography variant="subtitle1">
        ユーザへのお願い
      </Typography>
      <Typography variant="body" paragraph>
        このサイトで紹介している動画にはタグがついています。そのタグは誰でも編集できるようになっています。<br />
        タグをつけることで動画を探しやすくなるため、動画の出演ライバーやイラスト提供者などの名前をタグ登録してくれるとありがたいです。
      </Typography>
      <Typography variant="body">
        このサイトは、自分の趣味で個人で運営しています。色々気付かないことが沢山あると思いますので、「こういった機能が欲しい！」、「ここなんかバグってるんだけど...」、「この曲載ってないんだけど(怒)」などありましたら、問い合わせから連絡ください！
      </Typography>
      
    </Layout>
  );
}