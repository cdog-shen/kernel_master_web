export async function FetchAllAccess(jwt: string) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/all_access`,
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

export async function NewAccess(
  jwt: string,
  data: {
    service_id?: number;
    group_id?: number;
    group_access?: number;
    is_enable?: number;
    comment?: string;
  }
) {
  try {
    const params = {
      service_id: data.service_id ? Number(data.service_id) : null,
      group_id: data.group_id ? Number(data.group_id) : null,
      group_access: data.group_access ? Number(data.group_access) : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      comment: data.comment ? data.comment : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/new_access`,
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
    console.error("Error when update access data:", error);
    return {
      code: 500,
      msg: "Error when update access data",
      data: String(error),
    };
  }
}

export async function EditAccess(
  jwt: string,
  data: {
    id: number;
    service_id?: number;
    group_id?: number;
    group_access?: number;
    is_enable?: number;
    comment?: string;
  }
) {
  try {
    const params = {
      id: data.id,
      service_id: data.service_id ? Number(data.service_id) : null,
      group_id: data.group_id ? Number(data.group_id) : null,
      group_access: data.group_access ? Number(data.group_access) : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      comment: data.comment ? data.comment : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/update_access`,
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
    console.error("Error when update access data:", error);
    return {
      code: 500,
      msg: "Error when update access data",
      data: String(error),
    };
  }
}

export async function DeleteAccess(jwt: string, id: number) {
  try {
    const params = {
      id: id,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/delete_access`,
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
    console.error("Error when delete access data:", error);
    return {
      code: 500,
      msg: "Error when delete access data",
      data: String(error),
    };
  }
}
