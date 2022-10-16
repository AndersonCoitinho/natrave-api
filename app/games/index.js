import { PrismaClient } from "@prisma/client"
import { addDays, formatISO } from 'date-fns'
const prisma = new PrismaClient()

export const list = async ctx => {
    const currentData = ctx.request.query.gameTime

    const where = currentData ? {
        gameTime: {
            gte: currentData,
            lt: formatISO(addDays(new Date(currentData), 1))
        }
    } : {}

    try{
        const games = await prisma.game.findMany({where})
        ctx.body = games
        ctx.status = 200 
    } catch (error){
        ctx.body = error 
        ctx.status = 500
    }
}