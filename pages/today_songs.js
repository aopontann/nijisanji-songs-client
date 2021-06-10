import Layout from "../components/Layout";
import styled from "styled-components";
import { get_time } from "../lib/get_times";

const H1 = styled.h1``;
const Ul = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
`;
const Video = styled.li`
  background-color: white;
  border-radius: 20px;
  margin-top: 0.5rem;
  width: 30rem;
`;
const Img = styled.img``;
const P = styled.p`
  margin: 0.5rem;
`;

export default function Home({ data }) {
  return (
    <Layout>
      <H1>今日公開予定歌動画</H1>
      {data.length > 0 ? (
        <Ul>
          {data.map((dt) => {
            return (
              <Video>
                <a
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${dt.id}`}
                >
                  <Img src={dt.thumbnail.medium} />
                </a>
                <P>{dt.title}</P>
              </Video>
            );
          })}
        </Ul>
      ) : (
        <p>{`現在時点(${get_time({format: "HH時mm分"})})では今日公開される歌ってみた動画はないみたいだよ`}</p>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const today_first = get_time({
    format: "YYYY-MM-DDT00:00:00",
  });
  const today_last = get_time({
    format: "YYYY-MM-DDT23:59:59",
  });
  const params = {
    songConfirm: true,
    startAtAfter: today_first + "Z",
    startAtBefore: today_last + "Z",
  };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60 * 10,
  };
}
