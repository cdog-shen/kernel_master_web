export async function FetchAllSubsys(jwt: string) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/all_subsystem`,
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

export async function NewSubsys(
  jwt: string,
  data: {
    subsys_name?: string;
    url?: string;
    is_enable?: boolean;
    relate_service?: number;
    token?: string;
  }
) {
  try {
    const params = {
      subsys_name: data.subsys_name ? data.subsys_name : null,
      url: data.url ? data.url : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      relate_service: data.relate_service ? Number(data.relate_service) : null,
      token: data.token ? data.token : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/new_subsystem`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}

export async function EditSubsys(
  jwt: string,
  data: {
    id: number;
    subsys_name?: string;
    url?: string;
    is_enable?: boolean;
    relate_service?: number;
    token?: string;
  }
) {
  try {
    const params = {
      id: data.id,
      subsys_name: data.subsys_name ? data.subsys_name : null,
      url: data.url ? data.url : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      relate_service: data.relate_service ? Number(data.relate_service) : null,
      token: data.token ? data.token : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/update_subsystem`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}

export async function DeleteSubsys(jwt: string, data: { id: number }) {
  try {
    const params = {
      id: data.id,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/delete_subsystem`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}

export async function CallSubsys(jwt: string, subsys: string, data: any) {
  try {
    const params = data;

    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_call/${subsys}`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}
