import Link from "next/link";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function VtuberList({ data }) {
  const classes = useStyles();
  return (
      <Layout>
        <Typography variant="h5">ライバー 一覧</Typography>
        <Typography variant="h6" align="center">にじさんじ</Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          p={1}
          m={1}
          bgcolor="background.paper"
          justifyContent="center"
        >
          {data.map((vtuber) => {
            if (vtuber.affiliation == "にじさんじ") {
              return (
                <div className={classes.root}>
                  <Avatar alt="Remy Sharp" src={vtuber.image || "/images/profile.jpg"} className={classes.large} />
                  <Typography variant="subtitle1">{vtuber.name}</Typography>
                </div>
              );
            }
          })}
        </Box>
      </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { affiliation: "にじさんじ,にじさんじ卒業" };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/vtuber?${query}`, {
    method: "GET",
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
