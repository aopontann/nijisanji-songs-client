import Link from "next/link";
import styled from "styled-components"

export default function FirstPost({ data }) {
  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  `;
  const Li = styled.li`
    width: 8rem;
    background-color: olive;
    margin: 0.5rem;
    text-align: center;
    border-radius: 20px;
  `;
  const Image = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 9999px;
    margin-top: 1rem;
  `;
  const Name = styled.p`
    background-color: wheat;
  `;
  console.log("data", data);
  return (
    <>
      <h1>First Post</h1>
      <Ul>
      {data.map(dt => {
        return (
          <Li>
            <Image src={dt.vtuberImage.length ? dt.vtuberImage[0] : "/images/profile.jpg"} />
            <Name>{dt.name}</Name>
          </Li>
        )
      })}
      </Ul>
    </>
  );
}

export async function getStaticProps() {
  const params = {affiliation: "にじさんじ卒業"};
  const query = new URLSearchParams(params);
  const res = await fetch(
    `http://localhost:8081/vtuber?${query}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}
