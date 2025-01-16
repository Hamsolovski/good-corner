import { Arg, Authorized, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken"
import { User } from "../entities/User";
import { Response } from "express";

@InputType()
class NewUserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
class UserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => String)
  async signup(@Arg("data") userData: NewUserInput, @Ctx() {res}: {res: Response}) {
    if (!process.env.JWT_SECRET) throw new Error("Missing token env variable")


    const hashedPassword = await argon.hash(userData.password);
    const user = await User.save({
      email: userData.email,
      hashedPassword: hashedPassword,
      name: userData.name,
      roles: "USER",
    });

    const tokenContent = {
      email: user.email,
      name: user.name,
      roles: user.roles,
    }

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    const profile = {
      email: user.email,
      name: user.name,
      roles: user.roles,
    };
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: UserInput, @Ctx() {res}: {res: Response}) {
    if (!process.env.JWT_SECRET) throw new Error("Missing token env variable")

    // Identification : est-ce que j'ai un User correspondant ?
    const user = await User.findOneByOrFail({ email: userData.email });
    // Authentification : est-ce que j'ai le bon password ?
    const isValid = await argon.verify(user.hashedPassword, userData.password);
    if (!isValid) throw new Error("Wrong password");

    // Si tout est ok
    const tokenContent = {
      email: user.email,
      name: user.name
    }

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    const profile = {
      email: user.email,
      name: user.name,
    };
    return JSON.stringify(profile);
  }

  @Authorized()
  @Query(() => [User])
  async getUserAsUser() {
    const users = await User.find();
    return users;
  }

  @Authorized("ADMIN")
  @Query(() => [User])
  async getUsersAsAdmin() {
    const users = await User.find();
    return users
  }
}
