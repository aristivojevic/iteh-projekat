import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import { UserController } from "./controller/UserController";
import { AdminRoutes, Routes } from "./routes";
import { appDataSource } from "./dataSource";
import * as jwt from "jsonwebtoken";
import { User } from "./entity/User";

appDataSource
  .initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors());

    const userController = new UserController();
    app.post("/login", userController.login);
    app.post("/register", userController.register);

    // authorization middleware
    app.use(async (request, response, next) => {
      const authorization = request.headers.authorization;

      if (!authorization) {
        response.sendStatus(400);
        return;
      }

      // Bearer nekitokenslkdjfhshkjdfhjkd

      const splited = authorization.split(" ");

      if (splited.length != 2 || splited[0] !== "Bearer") {
        response.sendStatus(400);
        return;
      }

      try {
        const value = jwt.verify(
          splited[1],
          process.env.TOKEN || "token123"
        ) as { id: number };

        const user = await appDataSource.getRepository(User).findOne({
          where: {
            id: value.id,
          },
        });

        if (!user) {
          response.sendStatus(401);
          return;
        }

        (request as any).user = user;

        next();
      } catch (error) {
        response.sendStatus(401);
      }
    });

    app.get("/check", userController.check);

    for (let route of Routes) {
      app[route.method](route.url, route.handler);
    }

    // da li je admin
    app.use((request, response, next) => {
      const user = (request as any).user;
      if (user.category !== "admin") {
        response.sendStatus(403);
        return;
      }
      next();
    });

    for (let route of AdminRoutes) {
      app[route.method](route.url, route.handler);
    }

    app.listen(8080, () => {
      console.log("Server is listening pa to mi reci");
    });
  })
  .catch((error) =>
    console.log({
      error: error,
    })
  );
