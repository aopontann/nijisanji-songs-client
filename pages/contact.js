import Link from "next/dist/client/link";
import Typography from "@material-ui/core/Typography";

export default function Contact() {
  return (
    <div>
      <Typography variant="h5" paragraph>
        問い合わせ
      </Typography>
      <Typography variant="body" paragraph>
        このサイトについての要望や質問などは下のフォームからお願いします
      </Typography>
      <Typography variant="body">
        <Link
          href="https://forms.gle/kYDbQmG3H9aozaLy7"
          target="_blank"
          rel="noopener"
        >
          Googleフォーム
        </Link>
      </Typography>
    </div>
  );
}
