import React from "react";
import { RecoilRoot } from "recoil";
import VideoList from "../components/videoList";
import SearchVideos from "../components/searchVideos";
import TagList from "../components/tagList";
import EditTagDialog from "../components/editTagDialog";
import Typography from "@material-ui/core/Typography";
import { get_time, toDatetime } from "../lib/get_times";
import TagVtuberAccordion from "../components/accordion";

export default function Home(props) {
  return (
    <RecoilRoot>
      <Typography variant="body2" color="textSecondary" component="p" align="right">
        {`更新時間:${props.update_time}`}
      </Typography>
      <SearchVideos videos={props.videos} time={props.bTime}/>
      <TagVtuberAccordion videos={props.videos} tags={props.tags} vtuberList={props.vtuber}/>
      <VideoList />
      <EditTagDialog address={props.address} />
    </RecoilRoot>
  );
}

export async function getStaticProps() {
  const address = process.env.API_ADDRESS;
  const update_time = get_time({format: "MM/DD HH:mm"});
  const params = { songConfirm: true };
  const query = new URLSearchParams(params);
  const res = await fetch(`${address}/videos?${query}`, {
    method: "GET",
  });
  const data = res.status === 200 ? await res.json() : [];
  res ? "" : console.error("search fetch error");

  const res_tags = await fetch(`${address}/tags`, {
    method: "GET",
  });
  const data_tags = res_tags.status === 200 ? await res_tags.json() : [];
  res_tags ? "" : console.error("search fetch error");

  const res_vtuber = await fetch(`${address}/vtuber`, {
    method: "GET",
  });
  const data_vtuber = res_vtuber.status === 200 ? await res_vtuber.json() : [];
  res_vtuber ? "" : console.error("search fetch error");

  return {
    props: {
      videos: data.result,
      tags: data_tags,
      vtuber: data_vtuber,
      address,
      update_time,
    },
    revalidate: 60,
  };
}
