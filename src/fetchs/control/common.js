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
