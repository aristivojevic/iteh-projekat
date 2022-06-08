import { Request, Response } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import *  as jwt from 'jsonwebtoken'

export class UserController {



    public async login(request: Request, response: Response) {
        const userRepository = appDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                username: request.body.username,
                password: request.body.password
            }
        });
        if (!user) {
            response.status(400).json({
                error: 'No such user'
            });
            return;
        }
        (request as any).user = user;
        const token = jwt.sign({ id: user.id }, process.env.TOKEN)
        response.json({
            ...user,
            token
        });
    }
    public async register(request: Request, response: Response) {
        const userRepository = appDataSource.getRepository(User);
        let user = await userRepository.findOne({
            where: {
                username: request.body.username
            }
        });
        if (user) {
            response.status(400).json({
                error: 'User already exists'
            });
            return;
        }
        const insertResult = await userRepository.insert({
            ...request.body,
            category: 'user'
        });
        const id = insertResult.identifiers[0].id;
        user = await userRepository.findOne(id);
        (request as any).user = user;
        const token = jwt.sign({ id: user.id }, process.env.TOKEN)
        response.json({
            ...user,
            token
        });
    }
    public async check(request: Request, response: Response) {
        const user = (request as any).user;
        response.json(user)
    }
}