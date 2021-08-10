import React from "react";
import { RecoilRoot } from "recoil";
import VideoList from "../components/videoList";
import SearchVideos from "../components/searchVideos";
import TagList from "../components/tagList";
import EditTagDialog from "../components/editTagDialog";
import { get_time, toDatetime } from "../lib/get_times";

export default function Home(props) {
  return (
    <RecoilRoot>
      <SearchVideos videos={props.videos} time={props.bTime}/>
      <TagList tags={props.tags} />
      <VideoList />
      <EditTagDialog address={props.address} />
    </RecoilRoot>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const buildTime = get_time({format: "YYYY-MM-DD"});
  const params = { songConfirm: true };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = res.status === 200 ? await res.json() : [];
  res ? "" : console.error("search fetch error");

  const res_tags = await fetch(`${Address}/tags`, {
    method: "GET",
  });
  const data_tags = res_tags.status === 200 ? await res_tags.json() : [];
  res_tags ? "" : console.error("search fetch error");

  return {
    props: {
      videos: data,
      tags: data_tags,
      address: Address,
      bTime: buildTime,
    },
    revalidate: 60,
  };
}

/*
{
        "id": "oPAcjv__fbc",
        "title": "【】歌ってみた KING 葛葉 【】",
        "description": "▼ 原曲 / Kanaria様\n　https://twitter.com/kanaria390\n　https://www.youtube.com/watch?v=cm-l2h6GB8Q\n▼ MIX / そらる様\n　https://twitter.com/soraruru\n　https://www.youtube.com/channel/UCrALFGPubY9rNwVOOJUYu4g\n▼ Illust / AKKE様\n　https://twitter.com/akke299\n▼ Movie / CNR+様\n　https://twitter.com/CNR_Plus\n\n▼俺/葛葉様\n　https://twitter.com/Vamp_Kuzu",
        "startTime": "2020-11-10T20:00:00.000Z",
        "createdAt": "2021-06-23T13:56:38.000Z",
        "songConfirm": true,
        "thumbnail": {
            "id": "oPAcjv__fbc",
            "defaultUrl": "https://i.ytimg.com/vi/oPAcjv__fbc/default.jpg",
            "medium": "https://i.ytimg.com/vi/oPAcjv__fbc/mqdefault.jpg",
            "high": "https://i.ytimg.com/vi/oPAcjv__fbc/hqdefault.jpg",
            "standard": "https://i.ytimg.com/vi/oPAcjv__fbc/sddefault.jpg",
            "maxres": "https://i.ytimg.com/vi/oPAcjv__fbc/maxresdefault.jpg"
        },
        "statistic": {
            "id": "oPAcjv__fbc",
            "createdAt": "2021-06-23T13:56:38.000Z",
            "updatedAt": "2021-06-23T13:58:09.000Z",
            "viewCount": 20888555,
            "likeCount": 336413,
            "dislikeCount": 2790,
            "commentCount": 22412
        },
        "tags": [
            {
                "description": "歌",
                "tag": {
                    "name": "葛葉"
                }
            }
        ]
    }
*/
