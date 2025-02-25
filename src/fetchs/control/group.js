export async function FetchAllGroup(jwt) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/all_group`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
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
    console.error("Error fetching user data:", error);
    return {
      code: 500,
      msg: "connection response error",
      data: String(error),
    };
  }
}

export async function NewGroup(jwt, data) {
  try {
    const user_id_arr = JSON.parse(data.user_ids ? `[${data.user_ids}]` : "[]");
    const params = {
      name: data.name ? data.name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      user_ids: user_id_arr,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/new_group`,
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

export async function EditGroup(jwt, data) {
  try {
    const user_id_arr = JSON.parse(data.user_ids ? `[${data.user_ids}]` : "[]");
    const params = {
      id: data.id,
      name: data.name ? data.name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      user_ids: user_id_arr,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/update_group`,
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

export async function DeleteGroup(jwt, id) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/delete_group`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify({ id: id }),
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
    console.error("Error when delete group data:", error);
    return {
      code: 500,
      msg: "Error when delete group data",
      data: String(error),
    };
  }
}
