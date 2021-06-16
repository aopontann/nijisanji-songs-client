import styled from "styled-components";
import Layout from "../../components/Layout";
import { useState } from "react";
import VideoInfo from "./videoInfo";

const H1 = styled.h1`
  text-align: center;
`;
const Ul = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
`;
const Video = styled.li`
  display: flex;
  background-color: white;
  border-radius: 20px;
  margin-top: 0.5rem;
  width: 40rem;
`;
const Img = styled.img`
  margin: 1rem;
`;
const VideoControl = styled.div`
  display: flex;
  flex-direction: column;
`;

let search_songConfirm = true;
let search_checkSongVtuber = true;

export default function Edit() {
  const Address = "http://localhost:8081";
  const [videos, setVideo] = useState([]);

  const get_videos = async() => {
    const params = {
      songConfirm: search_songConfirm,
      checkSongVtuber: search_checkSongVtuber,
      maxResults: 10,
      page: 1,
    };
    const query = new URLSearchParams(params);
    const res = await fetch(`${Address}/videos?${query}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log("data", data);
    setVideo([...data]);
  };
  const delete_videos = async() => {

  }

  return (
    <Layout>
      <H1>編集ページ</H1>
      <p>このページで動画データの編集ができるよ</p>
      <br />
      songConfirm:
      <select onChange={(e) => { search_songConfirm = e.target.value == "true" ? true : false }}>
        <option value={search_songConfirm ? "true" : "false"}>{search_songConfirm ? "true" : "false"}</option>
        <option value={search_songConfirm ? "false" : "true"}>{search_songConfirm ? "false" : "true"}</option>
      </select>
      checkSongVtuber:
      <select onChange={(e) => { search_checkSongVtuber = e.target.value == "true" ? true : false}}>
        <option value={search_checkSongVtuber ? "true" : "false"}>{search_checkSongVtuber ? "true" : "false"}</option>
        <option value={search_checkSongVtuber ? "false" : "true"}>{search_checkSongVtuber ? "false" : "true"}</option>
      </select>
      <button onClick={get_videos}>読み込み</button>
      <Ul>
        {videos.map((dt) => {
          return (
            <VideoInfo data={dt}/>
          )
        })}
      </Ul>
    </Layout>
  );
}
