import Link from "next/link";
import styled from "styled-components";
import Header from "../../components/header";

export default function VtuberList({ data }) {
  const Div = styled.div`
    margin: 0em;
    padding: 0rem;
  `;
  const Main = styled.main`
    background-color: #eaf0f6;
  `;
  const H2 = styled.h2`
    text-align: center;
    padding-top: 1.8rem;
  `;
  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
  `;
  const Li = styled.li`
    width: 8rem;
    height: 12rem;
    background-color: white;
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
    margin: 1rem;
  `;
  return (
    <Div>
      <Header />
      <Main>
        <H2>ライバー 一覧</H2>
        <Ul>
          {data.map((dt) => {
            if (dt.affiliation == "にじさんじ") {
              return (
                <Link href={`/vtuber/${dt.name}`}>
                  <a>
                    <Li>
                      <Image
                        src={
                          dt.vtuberImage.length
                            ? dt.vtuberImage[0]
                            : "/images/profile.jpg"
                        }
                      />
                      <Name>{dt.name}</Name>
                    </Li>
                  </a>
                </Link>
              );
            }
          })}
        </Ul>
        <H2>卒業したライバー</H2>
        <Ul>
          {data.map((dt) => {
            if (dt.affiliation == "にじさんじ卒業") {
              return (
                <Link href={`/vtuber/${dt.name}`}>
                  <a>
                    <Li>
                      <Image
                        src={
                          dt.vtuberImage.length
                            ? dt.vtuberImage[0]
                            : "/images/profile.jpg"
                        }
                      />
                      <Name>{dt.name}</Name>
                    </Li>
                  </a>
                </Link>
              );
            }
          })}
        </Ul>
      </Main>
    </Div>
  );
}

export async function getStaticProps() {
  const params = { affiliation: "にじさんじ,にじさんじ卒業" };
  const query = new URLSearchParams(params);
  const res = await fetch(`http://localhost:8081/vtuber?${query}`, {
    method: "GET",
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}