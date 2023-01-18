import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const updateUser = async (req, res)=>{
    const {email, username, phone} = req.params
    const user = await prisma.post.updateMany({
        where: {email, username, phone},
        data: {
            email: req.body,
            username: req.body,
            phone: req.body
        }
    })
    res.json(user);
}