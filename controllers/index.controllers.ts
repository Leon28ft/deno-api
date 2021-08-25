import { Request, Response } from "../deps.ts";

interface User {
  id: string;
  name: string;
}
let users: User[] = [
  {
    id: "1",
    name: "Ryan",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Successful Query",
    users,
  };
};

export const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  console.log(params.id);
  const userfound = users.find((user) => user.id === params.id);
  if (userfound) {
    response.status = 200;
    response.body = {
      message: "Found One User",
      userfound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "User Not Found",
      userfound,
    };
  }
};

export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Body is requiered",
    };
  } else {
    const values = await body.value;

    users.push({
      id: values.id,
      name: values.name,
    });

    /* console.log(values); */

    const newUser = values.name;
    response.status = 200;
    response.body = {
      message: "New User Created",
      newUser,
    };
  }
};

export const updateUser = async (
  { params, response, request }: {
    params: { id: string };
    response: Response;
    request: Request;
  },
) => {
  const userfound = users.find((user) => user.id === params.id);
  if (!userfound) {
    response.status = 404;
    response.body = {
      message: "User Not Found",
      userfound,
    };
  } else {
    const body = await request.body();
    const updateUser = await body.value;
    users = users.map((user) =>
      user.id === params.id ? { ...user, ...updateUser } : user
    );
    response.status = 200;
    response.body = {
      message: "Usuarios Actualiado",
      updateUser,
    };
  }
};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  console.log(params.id);
  users = users.filter((user) => user.id !== params.id);

  response.status = 200;
  response.body = {
    message: "User Delete",
    users,
  };
};
