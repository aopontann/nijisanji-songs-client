import Layout from "../components/Layout";
import styled from "styled-components";
import { get_time, toDatetime } from "../lib/get_times";
import { useState } from "react";
import { Box } from "@material-ui/core";
import ImgMediaCard from "../components/card";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

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
const Img = styled.img`
  margin-top: 1rem;
`;
const P = styled.p`
  margin: 0.5rem;
`;

export default function Home({ data }) {
  return (
    <Layout>
      <Typography variant="h5">今日公開予定歌動画</Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        justifyContent="center"
      >
        {data.map(video => {
          return (
            <Box m={1}>
              <ImgMediaCard video={video} type={"startTime"} />
            </Box>
          )
        })}
      </Box>
  </Layout>
  );
}

export async function getStaticProps() {
  // <p>{`現在時点(${get_time({format: "HH時mm分"})})では今日公開される歌ってみた動画はないみたいだよ`}</p>
  /* const startTime = toDatetime({
    time: dt.startTime,
    format: "公開時間: HH時mm分"
  })*/
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
