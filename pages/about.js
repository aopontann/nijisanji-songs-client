import TestVideo from "../components/test/testVideo";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import FilterListIcon from "@material-ui/icons/FilterList";

export default function About() {
  return (
    <div>
      <Typography variant="h5" paragraph>
        このサイトについて
      </Typography>
      <Typography variant="subtitle1">どんなサイト？</Typography>
      <Typography variant="body" paragraph>
        YouTubeにアップロードされたにじさんじライバーの歌ってみた動画をまとめた非公式サイトです。
        <br />
        にじさんじ公式チャンネルや外部コラボチャンネルから公開された動画のみ掲載しています。
        <br />
        歌ってみた動画以外にもオリジナル曲やネタ、歌ってみたshortも掲載しています。
        <br />
        （非公開動画、限定公開動画、メドレーやクロスフェード動画は掲載していないです。もし掲載されている動画がありましたら問い合わせから連絡ください）
      </Typography>
      <Typography variant="subtitle1">このサイトの目的</Typography>
      <Typography variant="body" paragraph>
        にじさんじライバーの歌ってみた動画を探しやすくするために作成しました！
        <br />
        また、このサイトを使ってくれた人が「このライバーさん、この曲歌っているんだ。知らなかった！」
        と思ってもらって色んなにじさんじライバーを知るきっかけになったらいいなと思っています。
      </Typography>
      <Typography variant="subtitle1">ユーザへのお願い</Typography>
      <Typography variant="body" paragraph>
        このサイトはテスト版です。今後一部の仕様やデザインを変更する可能性があります。<br />
        このサイトを使ってみて、「ここのデザインこうした方がいいんじゃない？」「こういった機能が欲しい！」「ここなんかバグってるんだけど...」「この曲載ってないんだけど(怒)」などありましたら、
        <Link
          href={`https://twitter.com/pontantan0726`}
          target="_blank"
          rel="noopener"
          underline="none"
        >
          Twitter
        </Link>
        のリプやDMか問い合わせからメッセージください！<br />
      </Typography>
      <Typography variant="body" paragraph>
        非公式なので、にじさんじ公式に問い合わせしたり、ライバーさんの動画にこのサイトについてコメントを残すこと (例えば、「にじ歌まとめからきた」「にじ歌まとめのランキングで○位だったね」など) は迷惑になる可能性があるためお控えください。
      </Typography>
      <Typography variant="subtitle1">タグ機能について</Typography>
      <Typography variant="body" paragraph>
        このサイトで紹介している動画にはタグがついており、タグは誰でも編集できるようになっています。動画のタグをクリックすると、その動画に登録されているタグが表示され、その中にある「タグ編集」をクリックすることでタグを編集することができます<br />
        タグをつけることで動画を探しやすくなるため、動画の出演ライバー名やユニット名、動画の特徴(オリジナル曲,クリスマスとか...)などのタグを追加してくれるとありがたいです。追加するタグは何でもいいですが、動画に関係ないタグを追加するのはだめです！
      </Typography>
      <Typography variant="subtitle1">検索機能について</Typography>
      <Typography variant="body" paragraph>
        検索欄に検索したいキーワードを入力して虫眼鏡アイコンをクリックすると、キーワードに関係する動画一覧が表示されます。
        <br />
        文字が入力した後、右にあるバツアイコンをクリックすると動画一覧と入力したキーワードが消え最初の画面に戻ります。
        <br />
        検索欄の右にあるフィルターリストアイコン「<FilterListIcon fontSize="small"/>」をクリックすると、検索範囲の指定や動画一覧の並べ替えができます
        <br />
        検索結果は、入力したキーワードが指定した検索範囲に含まれている動画を表示します。
        <br />
        概要欄に過去の歌ってみた動画のタイトルなどを掲載している動画もあるため、関係のない動画が検索結果に出ることがあります。そのため、検索範囲を指定することができます。
      </Typography>
      <Typography variant="subtitle1">
        公開予定動画について
      </Typography>
      <Typography variant="body" paragraph>
        公開予定ページではサーバー側で1時間ごとに、公開される動画があるかどうかチェックしています。公開される動画があった場合、サイトへ掲載するようにしています。システムの都合上、データの取得漏れが発生することがあるため、サイトへの掲載が遅れる可能性があります。
      </Typography>

      <Typography variant="subtitle1">運営者</Typography>
      <Typography variant="body" paragraph>
        あおぽんたん
        <br />
        <Link
          href={`https://twitter.com/pontantan0726`}
          target="_blank"
          rel="noopener"
          underline="none"
        >
          Twitter
        </Link>
        ・
        <Link
          href={`https://github.com/aopontann/nijisanji-songs-client`}
          target="_blank"
          rel="noopener"
          underline="none"
        >
          GitHub
        </Link>
      </Typography>
    </div>
  );
}
