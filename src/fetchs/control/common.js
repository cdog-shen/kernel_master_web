export async function BingDaily() {
  try {
    const resp = await fetch(
      "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
    );
    console.log(await resp.json());

    if (!resp.ok) {
      return {
        code: 500,
        msg: "ImageArchive response error",
        data: await resp.text(),
      };
    }
    const data = await resp.json();
    const url = `https://cn.bing.com${data.images[0].url}`;
    return {
      code: 200,
      msg: "Bing daily image fetch success",
      data: url,
    };
  } catch (error) {
    console.error("Error fetching bing daily image:", error);
    return {
      code: 500,
      msg: "ImageArchive connection error",
      data: String(error),
    };
  }
}

export async function FetchUsi(uid, jwt) {
  try {
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/me/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    });

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    const data = await resp.json();
    return {
      code: 200,
      msg: "usi require success",
      data: data,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      code: 500,
      msg: "connection response error",
      data: String(error),
    };
  }
}
