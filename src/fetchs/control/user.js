export async function LoginFetch(username, password) {
  try {
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        passwd: password,
      }),
    });

    if (!resp.ok) {
      return {
        code: 500,
        key: "Login in Error.",
        data: {},
      };
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    return {
      code: 500,
      key: "Login in Error.",
      data: {},
    };
  }
}

export async function FetchAllUser(jwt) {
  try {
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/all_user`, {
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

    return await resp.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      code: 500,
      msg: "connection response error",
      data: String(error),
    };
  }
}

export async function NewUser(jwt, data) {
  try {
    const params = {
      username: data.username ? data.username : null,
      passwd: data.passwd ? data.passwd : null,
    };
    console.log(params);
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify(params),
    });

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error when update group data:", error);
    return {
      code: 500,
      msg: "Error when update group data",
      data: String(error),
    };
  }
}

export async function EditUser(jwt, data) {
  try {
    const contact = JSON.parse(data.contact ? `${data.contact}` : "{}");
    const params = {
      id: data.id,
      username: data.username ? data.username : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      name: data.name ? data.name : null,
      contact: contact,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/auth/user_update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify(params),
      }
    );

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error when update group data:", error);
    return {
      code: 500,
      msg: "Error when update group data",
      data: String(error),
    };
  }
}

export async function DeleteUser(jwt, data) {
  try {
    const params = {
      id: data.id,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/auth/user_delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify(params),
      }
    );

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error when update group data:", error);
    return {
      code: 500,
      msg: "Error when update group data",
      data: String(error),
    };
  }
}
