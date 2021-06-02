export async function getAllVtuberNames() {
  const params = {affiliation: "にじさんじ"};
  const query = new URLSearchParams(params);
  const res = await fetch(
    `http://localhost:8081/vtuber?${query}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  const dt = data.map(dt => {
    return {
      params: {
        id: dt.name
      }
    }
  });
  return dt
}

export async function getVtuberInfo(vtuberName) {
  const params = {name: vtuberName};
  const query = new URLSearchParams(params);
  const res = await fetch(
    `http://localhost:8081/vtuber?${query}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  console.log(vtuberName, data);
  return data;
}