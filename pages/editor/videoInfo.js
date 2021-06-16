import { useEffect, useState } from "react";
import styled from "styled-components";
import fetch from "node-fetch";

export default function VideoInfo(props) {
  const [videoInfo, setVideoInfo] = useState(props.data);
  let songConfirm = videoInfo.songConfirm;
  let checkSongVtuber = videoInfo.checkSongVtuber;

  const Video = styled.li`
    display: flex;
    background-color: white;
    flex-wrap: wrap;
    border-radius: 20px;
    margin-top: 0.5rem;
    width: 30rem;
  `;
  const Image = styled.img`
    margin: 1rem;
  `;
  const Title = styled.p`
    width: 15rem;
    height: 4.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  `;
  const Input = styled.input`
    height: 3rem;
    margin-left: 1rem;
  `;
  const Select = styled.select`
    width: 4rem;
    text-align: center;
  `;
  const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  `;

  const update_videos = async ()  => {
    const result_update_video = await fetch("http://localhost:8081/videos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        videoId: videoInfo.id,
        songConfirm: songConfirm,
        checkSongVtuber: checkSongVtuber
      })
    });
  };

  const delete_videos = async () => {
    const result_delete_video = await fetch(`http://localhost:8081/videos?id=${videoInfo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
  };

  return (
    <Video>
      <a
        target="_blank"
        href={`https://www.youtube.com/watch?v=${videoInfo.id}`}
      >
        <Image src={videoInfo.thumbnail.defaultUrl} /> 
      </a>
      <Title>{videoInfo.title}</Title>
      <Div>
        songConfirm:
        <Select onChange={(e) => { songConfirm = e.target.value == "true" ? true : false }}>
          <option value={songConfirm ? "true" : "false"}>{songConfirm ? "true" : "false"}</option>
          <option value={songConfirm ? "false" : "true"}>{songConfirm ? "false" : "true"}</option>
        </Select>
        checkSongVtuber:
        <Select onChange={(e) => { checkSongVtuber = e.target.value == "true" ? true : false}}>
          <option value={checkSongVtuber ? "true" : "false"}>{checkSongVtuber ? "true" : "false"}</option>
          <option value={checkSongVtuber ? "false" : "true"}>{checkSongVtuber ? "false" : "true"}</option>
        </Select>
      </Div>
      <Input type="submit" value="update" onClick={update_videos} />
      <Input type="submit" value="delete" onClick={delete_videos} />
    </Video>
  );
}

// <JoinVtuber joinVtuber={video.songVtuber}/>

/* props.videoInfo
{
        "id": "_-Qmg1nN5P0",
        "title": "Rain / 秦基博 (covered by 緑仙)",
        "songConfirm": true,
        "checkSongVtuber": false,
        "thumbnail": {
            "id": "_-Qmg1nN5P0",
            "defaultUrl": "https://i.ytimg.com/vi/_-Qmg1nN5P0/default.jpg",
            "medium": "https://i.ytimg.com/vi/_-Qmg1nN5P0/mqdefault.jpg",
            "high": "https://i.ytimg.com/vi/_-Qmg1nN5P0/hqdefault.jpg",
            "standard": "https://i.ytimg.com/vi/_-Qmg1nN5P0/sddefault.jpg",
            "maxres": "https://i.ytimg.com/vi/_-Qmg1nN5P0/maxresdefault.jpg"
        },
        "time": {
            "id": "_-Qmg1nN5P0",
            "createdAt": "2021-04-30T17:44:56.000Z",
            "videoLength": "PT4M46S",
            "startTime": "2018-09-09T08:41:08.000Z"
        },
        "dayCount": [
            {
                "id": 1,
                "createdAt": "2021-04-30T17:44:56.000Z",
                "videoId": "_-Qmg1nN5P0",
                "viewCount": 315894,
                "likeCount": 4651,
                "dislikeCount": 36,
                "commentCount": 225
            }
        ],
        "songVtuber": [
            {
                "role": "歌",
                "vtuber": {
                    "id": "UCt5-0i4AVHXaWJrL8Wql3mw",
                    "name": "緑仙",
                    "vtuberImage": []
                }
            }
        ]
    }
*/

/*
[
    {
      "videoId": "_-Qmg1nN5P0",
      "joinVtuber": [
        {
          "channelId": "UCt5-0i4AVHXaWJrL8Wql3mw",
          "role": "歌"
        },
        ...
      ]
    },
    ...
  ]
*/

/*
[
  {
    channelId: "aaa",
    role: "歌"
  },
  ...
]
*/
