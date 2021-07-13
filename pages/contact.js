import Layout from "../components/Layout";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import Link from "next/dist/client/link";
import { Typography } from "@material-ui/core";

import { Button } from "@material-ui/core";

export default function Contact() {
  return (
    <Layout>
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
    </Layout>
  );
}

// SWRテスト
function Videos() {
  const { data, error, isValidating } = useSWR(
    "http://localhost:8081/videos?id=oPAcjv__fbc&maxResults=30"
  );
  if (isValidating) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>failed to load</div>;
  }
  return <div>hello</div>;
}
