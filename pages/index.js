import styled from "styled-components";
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function Home({ data }) {
  return (
    <Layout>
      <Typography variant="h5">Welcome to にじ歌(仮)</Typography>
      <br />
      <Typography variant="h6" align="center">
        おすすめ動画
      </Typography>
      <Box textAlign="center">
        <iframe
          width="560"
          height="315"
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
