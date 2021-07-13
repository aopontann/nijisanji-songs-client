import Layout from "../components/Layout";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function Home({ data }) {
  return (
    <Layout>
      <Typography variant="h5">Welcome to にじ歌まとめ(仮)</Typography>
      <Typography variant="h6" align="center">
        おすすめ動画
      </Typography>
      <Box textAlign="center" m={2}>
        <iframe
          width="336"
          height="189"
          src={`https://www.youtube.com/embed/${data.id}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  // width 560 h 315
  const Address = process.env.API_ADDRESS;
  const params = { maxResults: 30, songConfirm: true };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = await res.json();
  const random = Math.floor(Math.random() * data.length);

  return {
    props: {
      data: data[random],
    },
    revalidate: 60 * 10,
  };
}
