const express = require('express')
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//routes
import userRoute from './routes/userRoute';


app.use('/users',userRoute);











export { app, prisma };

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HTTP Server Running')
} )