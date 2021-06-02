import styled from "styled-components"
import { getAllVtuberNames, getVtuberInfo } from "../../lib/vtuber"

export default function Post({ data }) {
  const Div = styled.div`
    background-color: #EAF0F6;
  `;
  const H2 = styled.h2`
    text-align: center;
  `;
  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
  `;
  const Li = styled.li`
    width: 20rem;
    height: 15rem;
    background-color: white;
    margin: 0.5rem;
    text-align: center;
    border-radius: 20px;
  `;
  const Img = styled.img`
    width: 80%;
    height: auto;
    margin-top: 1rem;
  `;
  const P = styled.p`
    width: 15rem;
    margin-left: 1.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  `;
  const vtuberInfo = data[0];
  console.log("vtuberInfo", vtuberInfo);
  return (
    <Div>
      <h1>{vtuberInfo.name}</h1>
      <H2>歌</H2>
      <Ul>
        {vtuberInfo.songVtuber.map(joinVideo => {
          if(joinVideo.role == "歌") {
            return (
              <a target="_blank" href={`https://www.youtube.com/watch?v=${joinVideo.videoId}`}>
                <Li>
                  <Img src={joinVideo.videos.thumbnail.medium} />
                  <P>{joinVideo.videos.title}</P>
                </Li>
              </a>
            )
          }
        })}
      </Ul>
      <H2>歌以外</H2>
      <Ul>
        {vtuberInfo.songVtuber.map(joinVideo => {
          if(joinVideo.role != "歌") {
            return (
              <a target="_blank" href={`https://www.youtube.com/watch?v=${joinVideo.videoId}`}>
                <Li>
                  <Img src={joinVideo.videos.thumbnail.medium} />
                  <P>{joinVideo.videos.title}</P>
                </Li>
              </a>
            )
          }
        })}
      </Ul>
    </Div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllVtuberNames();
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  const data = await getVtuberInfo(params.id);
  return {
    props: {
      data
    }
  }
}

/*
[
    {
        "id": "UC_4tXjqecqox5Uc05ncxpxg",
        "name": "椎名唯華",
        "readname": "しいなゆいか",
        "affiliation": "にじさんじ",
        "birthday": "0417",
        "songVtuber": [
            {
                "videoId": "2fhCt64nXBw",
                "role": "歌",
                "videos": {
                    "title": "【歌ってみた】ダーリンダンス/椎名唯華・葉加瀬冬雪(Cover)",
                    "startTime": "2021-03-31T23:15:00.000Z",
                    "thumbnail": {
                        "id": "2fhCt64nXBw",
                        "defaultUrl": "https://i.ytimg.com/vi/2fhCt64nXBw/default.jpg",
                        "medium": "https://i.ytimg.com/vi/2fhCt64nXBw/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/2fhCt64nXBw/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/2fhCt64nXBw/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/2fhCt64nXBw/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "2vgwvF6eidI",
                "role": "歌",
                "videos": {
                    "title": "Virtual to LIVE（covered by ex Gamers）】Games Day【にじさんじ】",
                    "startTime": "2019-11-23T00:15:00.000Z",
                    "thumbnail": {
                        "id": "2vgwvF6eidI",
                        "defaultUrl": "https://i.ytimg.com/vi/2vgwvF6eidI/default.jpg",
                        "medium": "https://i.ytimg.com/vi/2vgwvF6eidI/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/2vgwvF6eidI/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/2vgwvF6eidI/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/2vgwvF6eidI/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "dhEBM-0slaY",
                "role": "歌",
                "videos": {
                    "title": "【歌ってみた】寝・逃・げでリセット！ #椎名唯華生誕祭 【椎名唯華/にじさんじ】",
                    "startTime": "2021-04-17T20:00:00.000Z",
                    "thumbnail": {
                        "id": "dhEBM-0slaY",
                        "defaultUrl": "https://i.ytimg.com/vi/dhEBM-0slaY/default.jpg",
                        "medium": "https://i.ytimg.com/vi/dhEBM-0slaY/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/dhEBM-0slaY/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/dhEBM-0slaY/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/dhEBM-0slaY/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "jc7T8ce5-vQ",
                "role": "歌",
                "videos": {
                    "title": "Snow halation-µ's (Cover)│♔Lilly Crown（夜見れな・鷹宮リオン・天宮こころ・椎名唯華）#りりくら",
                    "startTime": "2020-12-23T22:00:00.000Z",
                    "thumbnail": {
                        "id": "jc7T8ce5-vQ",
                        "defaultUrl": "https://i.ytimg.com/vi/jc7T8ce5-vQ/default.jpg",
                        "medium": "https://i.ytimg.com/vi/jc7T8ce5-vQ/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/jc7T8ce5-vQ/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/jc7T8ce5-vQ/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/jc7T8ce5-vQ/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "nqRKUyUB7K8",
                "role": "歌",
                "videos": {
                    "title": "【３D記念/オリジナルソング】椎名唯華を待っています。歌ってみた【椎名唯華/にじさんじ】",
                    "startTime": "2019-08-08T21:00:14.000Z",
                    "thumbnail": {
                        "id": "nqRKUyUB7K8",
                        "defaultUrl": "https://i.ytimg.com/vi/nqRKUyUB7K8/default.jpg",
                        "medium": "https://i.ytimg.com/vi/nqRKUyUB7K8/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/nqRKUyUB7K8/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/nqRKUyUB7K8/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/nqRKUyUB7K8/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "PqY1-Zsy5vo",
                "role": "歌",
                "videos": {
                    "title": "【LOL部】VD&GでBlessing歌ってみた【替え歌】",
                    "startTime": "2018-11-26T00:01:19.000Z",
                    "thumbnail": {
                        "id": "PqY1-Zsy5vo",
                        "defaultUrl": "https://i.ytimg.com/vi/PqY1-Zsy5vo/default.jpg",
                        "medium": "https://i.ytimg.com/vi/PqY1-Zsy5vo/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/PqY1-Zsy5vo/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/PqY1-Zsy5vo/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/PqY1-Zsy5vo/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "ygXQXbOCAU0",
                "role": "歌",
                "videos": {
                    "title": "【Lilly Crown】私、アイドル宣言(Cover) / 夜見れな・天宮こころ・椎名唯華・鷹宮リオン",
                    "startTime": "2020-10-01T19:00:00.000Z",
                    "thumbnail": {
                        "id": "ygXQXbOCAU0",
                        "defaultUrl": "https://i.ytimg.com/vi/ygXQXbOCAU0/default.jpg",
                        "medium": "https://i.ytimg.com/vi/ygXQXbOCAU0/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/ygXQXbOCAU0/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/ygXQXbOCAU0/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/ygXQXbOCAU0/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "X1XcjB7Ycf0",
                "role": "歌",
                "videos": {
                    "title": "夜に駆ける / さくゆい Cover 【 笹木咲・椎名唯華 】",
                    "startTime": "2020-08-16T00:00:00.000Z",
                    "thumbnail": {
                        "id": "X1XcjB7Ycf0",
                        "defaultUrl": "https://i.ytimg.com/vi/X1XcjB7Ycf0/default.jpg",
                        "medium": "https://i.ytimg.com/vi/X1XcjB7Ycf0/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/X1XcjB7Ycf0/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/X1XcjB7Ycf0/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/X1XcjB7Ycf0/maxresdefault.jpg"
                    }
                }
            },
            {
                "videoId": "xI5rd5349j4",
                "role": "歌",
                "videos": {
                    "title": "【２万人記念】サディスティック・ラブ歌ってみた【にじさんじゲーマーズ/椎名唯華】",
                    "startTime": "2018-10-17T18:00:08.000Z",
                    "thumbnail": {
                        "id": "xI5rd5349j4",
                        "defaultUrl": "https://i.ytimg.com/vi/xI5rd5349j4/default.jpg",
                        "medium": "https://i.ytimg.com/vi/xI5rd5349j4/mqdefault.jpg",
                        "high": "https://i.ytimg.com/vi/xI5rd5349j4/hqdefault.jpg",
                        "standard": "https://i.ytimg.com/vi/xI5rd5349j4/sddefault.jpg",
                        "maxres": "https://i.ytimg.com/vi/xI5rd5349j4/maxresdefault.jpg"
                    }
                }
            }
        ],
        "vtuberImage": []
    }
]
*/
