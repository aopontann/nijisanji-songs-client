import { get_time, toDatetime } from "../lib/get_times";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  title: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

export default function Home({ data, update_time }) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">今日公開予定歌動画</Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {`更新時間:${update_time}`}
      </Typography>
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
                <Typography className={classes.title}>
                  <Box lineHeight={1.1}>{video.title}</Box>
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
        <Typography variant="body" align="center">{`現時点(${update_time})では、今日公開される動画はないみたいだよ`}</Typography>
      ) : (
        ""
      )}
    </div>
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

  const update_time = get_time({
    format: "MM/DD HH:mm",
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
  const data = res.status === 200 ? await res.json() : [];

  return {
    props: {
      data,
      update_time,
    },
    revalidate: 60,
  };
}
