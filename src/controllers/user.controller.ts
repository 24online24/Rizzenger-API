import type { RouterContext } from "../deps.ts";
import { Bson } from "../deps.ts";
import { UserCollection } from "../models/user.model.ts";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../schema/user.schema.ts";

const createUserController = async ({
  request,
  response,
}: RouterContext<string>) => {
  try {
    const { name, email, password, avatar }: CreateUserInput = await request
      .body()
      .value;
    const userExists = await UserCollection.findOne({ name });
    if (userExists) {
      response.status = 409;
      response.body = {
        status: "fail",
        message: "User already exists",
      };
      return;
    }

    const created_at = new Date();

    const userId: string | Bson.ObjectId = await UserCollection.insertOne({
      name,
      email,
      password,
      created_at,
      avatar,
    });

    if (!userId) {
      response.status = 500;
      response.body = { status: "error", message: "Error creating user" };
      return;
    }

    const user = await UserCollection.findOne({ _id: userId });

    response.status = 201;
    response.body = {
      status: "success",
      data: { user },
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const updateUserController = async ({
  params,
  request,
  response,
}: RouterContext<string>) => {
  try {
    const payload: UpdateUserInput["body"] = await request.body().value;

    const updatedInfo = await UserCollection.updateOne(
      { _id: new Bson.ObjectId(params.userId) },
      { $set: { ...payload, updatedAt: new Date() } },
      { ignoreUndefined: true },
    );

    if (!updatedInfo.matchedCount) {
      response.status = 404;
      response.body = {
        status: "fail",
        meassage: "No user with that Id exists",
      };
      return;
    }

    const updatedUser = await UserCollection.findOne({
      _id: updatedInfo.upsertedId,
    });

    response.status = 200;
    response.body = {
      status: "success",
      data: { user: updatedUser },
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const findUserController = async ({
  params,
  response,
}: RouterContext<string>) => {
  try {
    const user = await UserCollection.findOne({
      _id: new Bson.ObjectId(params.userId),
    });

    if (!user) {
      response.status = 404;
      response.body = {
        status: "success",
        message: "No user with that Id exists",
      };
      return;
    }

    response.status = 200;
    response.body = {
      status: "success",
      data: { user },
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const findAllUsersController = async (
  { request, response }: RouterContext<string>,
) => {
  try {
    const page = request.url.searchParams.get("page");
    const limit = request.url.searchParams.get("limit");
    const intPage = page ? parseInt(page) : 1;
    const intlimit = limit ? parseInt(limit) : 10;
    const skip = (intPage - 1) * intlimit;
    const pipeline = [
      { $match: {} },
      { $skip: skip },
      {
        $limit: intlimit,
      },
    ];

    const cursor = UserCollection.aggregate(pipeline);
    const cursorUsers = cursor.map((user: any) => user);
    const users = await cursorUsers;

    response.status = 200;
    response.body = {
      status: "success",
      results: users.length,
      data: { users },
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.meassage };
    return;
  }
};

const deleteUserController = async ({
  params,
  response,
}: RouterContext<string>) => {
  try {
    const numberOfUsers = await UserCollection.deleteOne({
      _id: new Bson.ObjectId(params.userId),
    });

    if (!numberOfUsers) {
      response.status = 404;
      response.body = {
        status: "success",
        message: "No user with that Id exists",
      };
      return;
    }

    response.status = 204;
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.meassage };
  }
};

export default {
  createUserController,
  updateUserController,
  findUserController,
  findAllUsersController,
  deleteUserController,
};
