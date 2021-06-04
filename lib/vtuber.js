const Address = process.env.API_ADDRESS;

export async function getAllVtuberNames() {
  const params = {affiliation: "にじさんじ,にじさんじ卒業"};
  const query = new URLSearchParams(params);
  const res = await fetch(
    `${Address}/vtuber?${query}`,
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
    `${Address}/vtuber?${query}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  console.log(vtuberName, data);
  return data;
}