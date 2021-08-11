import { get_time, toDatetime } from "../lib/get_times";
import { VideoCard } from "../components/video";
import EditTagDialog from "../components/editTagDialog";
import { RecoilRoot } from "recoil";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
}));

export default function Home({ data, update_time, address }) {
  const classes = useStyles();
  return (
    <RecoilRoot>
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
        {data.map((video) => (
        <VideoCard video={video} type="statistics" />
      ))}
      </Box>
      {data.length == 0 ? (
        <Typography variant="body" align="center">{`現時点(${update_time})では、今日公開される動画はないみたいだよ`}</Typography>
      ) : (
        ""
      )}
      <EditTagDialog address={address} />
    </RecoilRoot>
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
      address: Address,
    },
    revalidate: 60,
  };
}
