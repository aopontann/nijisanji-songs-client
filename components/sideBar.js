import styled from "styled-components";
import Link from "next/link";

export default function SideBar() {
  const Side = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    position: fixed;
    top: 5rem;
    left: 0px;
    width: 10%;
    height: 100%;
  `;
  const P = styled.p`
    text-align: center;
  `;
  return (
    <Side>
      <Link href="/">
        <a>
          <P>ホーム</P>
        </a>
      </Link>
      <Link href="/vtuber">
        <a>
          <P>ライバー 一覧</P>
        </a>
      </Link>
      <Link href="/ranking">
        <a>
          <P>ランキング</P>
        </a>
      </Link>
      <Link href="/today_songs">
        <a>
          <P>今日公開動画</P>
        </a>
      </Link>
    </Side>
  );
}
