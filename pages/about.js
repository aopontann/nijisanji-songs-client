import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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
        歌ってみた動画以外にもオリジナル曲やネタ、shortも掲載しています。<br />
        （限定公開動画、クロスフェード動画は掲載していないです。もし掲載されている動画がありましたら問い合わせから連絡ください）
      </Typography>
      <Typography variant="subtitle1">このサイトの目的</Typography>
      <Typography variant="body" paragraph>
        にじさんじライバーの歌ってみた動画を探しやすくするために作成しました！
        <br />
        また、このサイトを使ってくれた人が「このライバーさん、この曲歌っているんだ。知らなかった！」
        と思ってもらって色んなにじさんじライバーを知るきっかけになったらいいなと思っています。
      </Typography>
      <Typography variant="subtitle1">検索機能について</Typography>
      <Typography variant="body" paragraph>
        検索欄に検索したいキーワードを入力して虫眼鏡マークをクリックすると、キーワードに関係する動画一覧が表示されます。<br />
        虫眼鏡マークの右にあるゴミ箱マークをクリックすると動画一覧と入力したキーワードが消え最初の画面に戻ります。<br />
        タグ一覧にあるタグをクリックすると、検索欄にタグ名が自動で入力されます。よって、自分で入力する手間が省けて早く検索することができます。<br />
        検索結果は、入力したキーワードが動画のタイトルとタグ、(概要欄)に含まれている動画を表示します。<br />
        概要欄に過去の歌ってみた動画のタイトルなどを掲載している動画もあるため、関係のない動画が検索結果に出ることがあります。そのため、検索範囲に概要欄も含めるか含めないか選択できるようにしています。
      </Typography>
      <Typography variant="subtitle1">タグ機能について</Typography>
      <Typography variant="body" paragraph>
        このサイトで紹介している動画にはタグがついており、音符マークが付いているタグはその動画で歌っているライバー名を表しています。
        <br />
        タグは誰でも編集できるようになっています。
        タグをつけることで動画を探しやすくなるため、動画の出演ライバー名やイラスト提供者名、動画の特徴(オリジナル曲,クリスマスとか...)などのタグを追加してくれるとありがたいです。追加するタグは何でもいいですが、動画に関係ないタグを追加するのはだめです！
        <br />
        歌っているライバー名をタグに追加するときは、入力欄の音符マークをタップorクリックしてマークが青くなってから追加してください。コーラスや一部だけ歌っているライバー名を追加するときは音符マークはクリックせず追加してください。
      </Typography>
      <Typography variant="subtitle1">ランキングや公開予定動画について</Typography>
      <Typography variant="body" paragraph>
        ランキングは視聴回数が多い順で掲載しています。毎日午前0時に視聴回数の更新を行っています。<br />
        公開予定ページでは3時間ごとに、公開される動画があるかどうかチェックしています。システムの都合上、外部コラボチャンネルで歌ってみた動画がアップロードされた場合、サイトへの掲載が遅れる可能性があります。
      </Typography>
      <Typography variant="subtitle1">ユーザへのお願い</Typography>
      <Typography variant="body" paragraph>
        1分おきにデータの更新をしているので、一度サービスを利用してから時間を空けて再び利用する際は、ページの再読み込みをお願いします。<br />
        このサイトは、自分の趣味で個人で運営しています。「ここのデザインこうした方がいいんじゃない？」「こういった機能が欲しい！」、「ここなんかバグってるんだけど...」、「この曲載ってないんだけど(怒)」など何でもいいので、お気軽にTwitterのDMか問い合わせから連絡ください！(誹謗中傷は送らないでください。泣いちゃいます。)
      </Typography>
      <Typography variant="subtitle1">運営者</Typography>
      <Typography variant="body" paragraph>
        あおぽんたん<br />
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
