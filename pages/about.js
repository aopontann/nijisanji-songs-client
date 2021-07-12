import Layout from "../components/Layout";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function About() {
  return (
    <Layout>
      <Typography variant="h5">このサイトについて</Typography>
      <br />
      <Typography variant="body">
        このサイトは、にじさんじファンが作成したにじさんじの歌まとめサイトです
      </Typography>
      <br />
      
    </Layout>
  );
}