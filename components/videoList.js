import React from "react";
import { VideoCard } from "./video";
import { useRecoilValue } from "recoil";
import { videoListState } from "../src/atoms";
import Box from "@material-ui/core/Box";

export default function VideoList() {
  const videoList = useRecoilValue(videoListState);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      p={1}
      m={0.2}
      bgcolor="background.paper"
      justifyContent="center"
      alignItems="flex-start"
    >
      {videoList.map((video, index) => (
        <VideoCard key={index} video={video} type="statistics" />
      ))}
    </Box>
  );
}
