import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  const Header = styled.header`
    background-color: white;
  `;
  const Title = styled.h1`
    margin-left: 1rem;
  `;
  return (
    <Header>
      <Link href="/">
        <a>
          <Title>にじ歌まとめ</Title>
        </a>
      </Link>
    </Header>
  );
}
