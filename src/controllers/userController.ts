import { Request, Response } from "express";
import { prisma } from "../server";
import { User } from ".prisma/client";

interface UserCreateInput {
    name: string;
    email: string;
    password: string;
  }



async function getAllUsers(req: Request, res: Response<User[]>) {
  const users: User[] = await prisma.user.findMany();
  res.json(users);
}


async function getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar usuário.');
    }
  }
  
  
async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        } as UserCreateInput, 
      });
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao criar usuário.');
    }
  }


  async function updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email, password }  as UserCreateInput,
      });
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao atualizar usuário.');
    }
  }


  async function deleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
  
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao remover usuário.');
    }
  }
  





  export { getAllUsers,
           getUserById,
           createUser,
           updateUser,
           deleteUser };