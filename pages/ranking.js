import Layout from "../components/Layout";
import { useState } from "react";
import { Box } from "@material-ui/core";
import ImgMediaCard from "../components/card";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: "center"
  },
}));

export default function Home({ data }) {
  const [videos, setVideo] = useState(data.slice(0, 50));
  const [page, setPage] = useState(1);

  const pageUp = () => {
    console.log("up", page);
    setVideo(data.slice(page*50, (page+1)*50));
    setPage(page + 1);
  };
  const pageDown = () => {
    console.log("down", page);
    if (page > 1) {
      setVideo(data.slice((page-2)*50, (page-1)*50));
      setPage(page - 1);
    } else {
      setVideo(data.slice(0, 50));
      setPage(1);
    }
  };

  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h5">累計視聴回数ランキング</Typography>
      <Typography variant="h6" align="center">{`${(page-1)*50+1}位 〜 ${(page)*50}位`}</Typography>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={pageDown}>Back</Button>
        <Button variant="outlined" color="primary" onClick={pageUp}>Next</Button>
      </div>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        justifyContent="center"
      >
        {videos.map(video => {
          return (
            <Box m={1}>
              <ImgMediaCard video={video} type={'statistics'}/>
            </Box>
          )
        })}
      </Box>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={pageDown}>Back</Button>
        <Button variant="outlined" color="primary" onClick={pageUp}>Next</Button>
      </div>
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
