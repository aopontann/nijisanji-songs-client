import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  const Header = styled.header`
    background-color: white;
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
  `;
  const Title = styled.h1`
    margin-left: 1rem;
  `;
  return (
    <Header>
      <Link href="/">
        <a>
          <Title>にじ歌まとめ(仮)</Title>
        </a>
      </Link>
    </Header>
  );
}
