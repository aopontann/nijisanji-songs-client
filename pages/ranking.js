import React from "react";
import { RecoilRoot } from "recoil";
import { VideoCard } from "../components/video";
import EditTagDialog from "../components/editTagDialog";
import { get_time, toDatetime } from "../lib/get_times";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
}));

export default function Ranking({ data, update_time, address }) {
  const [videos, setVideo] = useState(data.slice(0, 50));
  const [page, setPage] = useState(1);

  const pageUp = () => {
    console.log("up", page);
    if (page * 50 < data.length) {
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
    <RecoilRoot>
      <Typography variant="h5">累計視聴回数ランキング</Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {`更新時間:${update_time}`}
      </Typography>
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
        {videos.map((video,index) => (
          <VideoCard key={index} video={video} type="statistics" />
        ))}
      </Box>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={pageDown}>
          Back
        </Button>
        <Button variant="outlined" color="primary" onClick={pageUp}>
          Next
        </Button>
      </div>
      <EditTagDialog address={address} />
    </RecoilRoot>
  );
}

export async function getStaticProps() {
  const address = process.env.API_ADDRESS;
  const update_time = get_time({
    format: "MM/DD HH:mm",
  });
  const params = { songConfirm: true, page: 1 };
  const query = new URLSearchParams(params);
  const res = await fetch(`${address}/videos?${query}`, {
    method: "GET",
  });
  const data = res.status === 200 ? await res.json() : [];
  res.status !== 200 ? console.error("ranking fetch error") : "";

  return {
    props: {
      data: data.result,
      update_time,
      address,
    },
    revalidate: 60,
  };
}
