import styled from "styled-components";
import Layout from "../components/Layout";

export default function Home({ data }) {
  const H1 = styled.h1`
    text-align: center;
  `;
  const YouTube = styled.div`
    text-align: center;
  `;
  return (
    <Layout>
      <H1>Welcome to にじ歌まとめ(仮)</H1>
      <p>このサイトはにじさんじの歌ってみた動画をまとめたサイトです</p>
      <br />
      <h2>おすすめ動画</h2>
      <YouTube>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${data.id}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </YouTube>
    </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { maxResults: 30 };
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
