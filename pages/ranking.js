import Layout from "../components/Layout";
import styled from "styled-components";
import { useState } from "react";

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
const P_page = styled.p`
  text-decoration:underline;
`;

export default function Home({ data }) {
  const [videos, setVideo] = useState(data.slice(0, 50));
  const [page, setPage] = useState(0);
  //const [videos, setVideo] = useState(data);

  const pageUp = () => {
    console.log("up-rank", rank); //初回51
    setVideo(data.slice(rank, rank + 50));
    setPage(page + 1);
  };
  const pageDown = () => {
    console.log("down-rank", rank);
    if (page > 0) {
      setVideo(data.slice(rank - 100, rank - 50));
      setPage(page - 1);
    } else {
      setVideo(data.slice(0, 50));
      setPage(0);
    }
  };

  let rank = 0 + page * 50;

  return (
    <Layout>
      <H1>累計視聴回数ランキング</H1>
      <P_page onClick={pageUp}>
        {rank + 51 < data.length
          ? `next(${rank + 51}位 ~ ${rank + 100}位)`
          : ""}
      </P_page>
      <P_page onClick={pageDown}>
        {rank == 0
          ? ""
          : `back(${rank - 50 + 1}位 ~ ${rank})位`}
      </P_page>
      <Ul>
        {videos.map((dt) => {
          return (
            <Video>
              <p>{++rank}位</p>
              <a
                target="_blank"
                href={`https://www.youtube.com/watch?v=${dt.id}`}
              >
                <Img src={dt.thumbnail.medium} />
              </a>
              <P>{dt.title}</P>
              <p>視聴回数: {dt.statistic.viewCount} 回</p>
            </Video>
          );
        })}
      </Ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { songConfirm: true, maxResults: 200, page: 1 };
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
