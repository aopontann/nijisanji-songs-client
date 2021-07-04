import styled from "styled-components";
import Layout from "../../components/Layout";
import { useState } from "react";
import VideoInfo from "../../components/videoInfo";
import { get_time } from "../../lib/get_times";

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

let search_songConfirm = true;
let search_checkSongVtuber = true;
let button_dis = false;

export default function Edit() {
  const Address = "http://localhost:8081";
  const [videos, setVideo] = useState([]);
  const [startAtAfter, setStartAtAfter] = useState(
    get_time({ format: "YYYY-MM-DDT00:00:00" }) + "Z"
  );
  const [startAtBefore, setStartAtBefore] = useState(
    get_time({ format: "YYYY-MM-DDT23:59:59" }) + "Z"
  );

  const get_videos = async () => {
    button_dis = true;
    const params = {
      songConfirm: search_songConfirm,
      checkSongVtuber: search_checkSongVtuber,
      startAtAfter,
      startAtBefore,
      maxResults: 10,
      page: 1,
    };
    const query = new URLSearchParams(params);
    const res = await fetch(`${Address}/videos?${query}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log("data", data);
    button_dis = false;
    setVideo([...data]);
  };

  return (
    <Layout>
      <H1>編集ページ</H1>
      <p>このページで動画データの編集ができるよ</p>
      <br />
      歌ってみた動画:
      <select
        onChange={(e) => {
          search_songConfirm = e.target.value == "true" ? true : false;
        }}
      >
        <option value={search_songConfirm ? "true" : "false"}>
          {search_songConfirm ? "true" : "false"}
        </option>
        <option value={search_songConfirm ? "false" : "true"}>
          {search_songConfirm ? "false" : "true"}
        </option>
      </select>
      参加ライバーチェック:
      <select
        onChange={(e) => {
          search_checkSongVtuber = e.target.value == "true" ? true : false;
        }}
      >
        <option value={search_checkSongVtuber ? "true" : "false"}>
          {search_checkSongVtuber ? "true" : "false"}
        </option>
        <option value={search_checkSongVtuber ? "false" : "true"}>
          {search_checkSongVtuber ? "false" : "true"}
        </option>
      </select>
      <br />
      公開日:<input type="text" defaultValue={startAtAfter} onBlur={ (e) => { setStartAtAfter(e.target.value) }}/>
       ~<input type="text" defaultValue={startAtBefore} onBlur={ (e) => { setStartAtBefore(e.target.value) }}/>
      <input type="submit" value="検索" onClick={get_videos} disabled={button_dis}/>
      <Ul>
        {videos.map((dt) => {
          return <VideoInfo data={dt} />;
        })}
      </Ul>
    </Layout>
  );
}
