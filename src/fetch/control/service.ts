export async function FetchAllService(jwt: string) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/all_service`,
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

export async function NewService(
  jwt: string,
  data: {
    service_name?: string;
    service_point?: string;
    nick_name?: string;
    is_enable?: boolean;
  }
) {
  try {
    const params = {
      service_name: data.service_name ? data.service_name : null,
      service_point: data.service_point ? data.service_point : null,
      nick_name: data.nick_name ? data.nick_name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/new_service`,
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
    console.error("Error when update service data:", error);
    return {
      code: 500,
      msg: "Error when update service data",
      data: String(error),
    };
  }
}

export async function EditService(
  jwt: string,
  data: {
    id: string;
    service_name?: string;
    service_point?: string;
    nick_name?: string;
    is_enable?: boolean;
  }
) {
  try {
    const params = {
      id: data.id,
      service_name: data.service_name ? data.service_name : null,
      service_point: data.service_point ? data.service_point : null,
      nick_name: data.nick_name ? data.nick_name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/update_service`,
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
    console.error("Error when update service data:", error);
    return {
      code: 500,
      msg: "Error when update service data",
      data: String(error),
    };
  }
}

export async function DeleteService(jwt: string, id: string) {
  try {
    const params = {
      id: id,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/delete_service`,
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
    console.error("Error when delete service data:", error);
    return {
      code: 500,
      msg: "Error when delete service data",
      data: String(error),
    };
  }
}
