import Head from "next/head";
import Header from "../components/header";
import styled from "styled-components";
import SideBar from "../components/sideBar"

export default function Home({ children }) {
  const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  const Div2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Main = styled.main`
    background-color: #eaf0f6;
    text-align: center;
    width: 90%;
    margin-top: 6rem;
  `;
  return (
    <Div>
      <Head>
        <title>にじ歌まとめ(仮)</title>
        <meta name="description" content="Nijisanji-songs" />
      </Head>

      <Header />
      <Div2>
        <SideBar />
        <Main>
          {children}
        </Main>
      </Div2>
    </Div>
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
