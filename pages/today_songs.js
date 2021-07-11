import Layout from "../components/Layout";
import useSWR from "swr";
import { get_time, toDatetime } from "../lib/get_times";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { Card, Link, CardMedia, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
  videos: {
    width: 345 * 0.8,
    height: 310 * 0.75,
    margin: theme.spacing(0.5),
  },
}));

export default function Home({ data }) {
  const classes = useStyles();
  return (
    <Layout>
      <Typography variant="h5">今日公開予定歌動画</Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={0.2}
        bgcolor="background.paper"
        justifyContent="center"
      >
        {data.map((video) => {
          const startTime = toDatetime({
            time: video.startTime,
            format: "公開時間: HH時mm分",
          });
          return (
            <Card className={classes.videos}>
              <Link
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener"
                underline="none"
              >
                <CardMedia
                  component="img"
                  alt={video.title}
                  image={video.thumbnail.medium || ""}
                  title={video.title}
                />
              </Link>

              <CardContent>
                <Typography noWrap={true}>
                  <Box lineHeight={1}>{video.title}</Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {startTime}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      {data.length == 0 ? (
        <Typography variant="body" align="center">{`現時点(${get_time({
          format: "HH:mm",
        })})ではないよ`}</Typography>
      ) : (
        ""
      )}
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

  /*
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`${Address}/videos?${query}`, fetcher);
  if (error) {
    console.log("fetch error", error);
    return {
      props: {
        data: [],
      },
      revalidate: 60 * 10,
    };
  }
  */
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = res ? await res.json() : [];

  return {
    props: {
      data,
    },
    revalidate: 60 * 10,
  };
}
