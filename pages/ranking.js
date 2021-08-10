import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
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
  title: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

export default function Ranking({ data }) {
  const [videos, setVideo] = useState(data.slice(0, 50));
  const [page, setPage] = useState(1);

  const pageUp = () => {
    console.log("up", page);
    if(page*50 < data.length) {
      setVideo(data.slice(page * 50, (page + 1) * 50));
      setPage(page + 1);
    }
  };
  const pageDown = () => {
    console.log("down", page);
    if (page > 1) {
      setVideo(data.slice((page - 2) * 50, (page - 1) * 50));
      setPage(page - 1);
    } else {
      setVideo(data.slice(0, 50));
      setPage(1);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">累計視聴回数ランキング</Typography>
      <Typography variant="h6" align="center">{`${(page - 1) * 50 + 1}位 〜 ${
        page * 50
      }位`}</Typography>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={pageDown}>
          Back
        </Button>
        <Button variant="outlined" color="primary" onClick={pageUp}>
          Next
        </Button>
      </div>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={0.2}
        bgcolor="background.paper"
        justifyContent="center"
      >
        {videos.map((video) => {
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
                  {`視聴回数: ${video.statistic.viewCount.toLocaleString()}`}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={pageDown}>
          Back
        </Button>
        <Button variant="outlined" color="primary" onClick={pageUp}>
          Next
        </Button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { songConfirm: true, page: 1 };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = res.status === 200 ? await res.json() : [];
  res.status !== 200 ? console.error("ranking fetch error") : "";

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
