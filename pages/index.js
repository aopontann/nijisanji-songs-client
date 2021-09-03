import React from "react";
import { RecoilRoot } from "recoil";
import VideoList from "../components/videoList";
import SearchVideos from "../components/search/searchVideos";
import EditTagDialog from "../components/tag/editTagDialog";
import SearchList from "../components/search/condidateList";
import { get_time, toDatetime } from "../lib/get_times";
import TagVtuberAccordion from "../components/accordion";

export default function Home(props) {
  console.log(`更新時間:${props.update_time}`);
  return (
    <RecoilRoot>
      <SearchVideos time={props.bTime} vtuberList={props.vtuber}/>
      <VideoList type="statistics"/>
      <EditTagDialog />
    </RecoilRoot>
  );
}

export async function getStaticProps() {
  const address = process.env.NEXT_PUBLIC_API_ADDRESS;
  const update_time = get_time({format: "MM/DD HH:mm"});

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
      tags: data_tags,
      vtuber: data_vtuber,
      update_time,
    },
    revalidate: 60,
  };
}
