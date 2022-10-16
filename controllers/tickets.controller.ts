import {Request, Response} from "express";
import moment from "moment";
const {
    getAll,
    getFilteredTickets,
    getComparisonTickets,
    getEqualsTickets,
    getFilteredOnSessionTickets,
    addTicket
} = require('../repositories/tickets.repository.js')

const getAllTickets = (response: any): Promise<any> => {
    return response.rows.map((ticket: any) => {
        const changedBuyDate = moment(ticket.buy_date).format('DD-MM-YYYY ; HH:MM:SS')

        delete ticket.buy_date

        return Object.assign(ticket, { buy_date: changedBuyDate })
    })
}

class TicketsController {
    async getTickets(req: Request, res: Response) {
        try {
            const filter = req.query

            if (filter.user_id) {
                await getFilteredTickets(filter.user_id).then(async (response: any) => {
                    const tickets = await getAllTickets(response)

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .json(tickets)
                })
            }
            if (filter.session_id) {
                await getFilteredOnSessionTickets(filter.session_id).then(async (response: any) => {
                    const tickets = await getAllTickets(response)

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .json(tickets)
                })
            }

            if (filter.comparison) {
                await getComparisonTickets(filter.comparison).then(async (response: any) => {
                    const tickets = await getAllTickets(response)

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .json(tickets)
                })
            }

            if (filter.equals) {
                // get tickets without filters
                await getEqualsTickets(filter.equals).then(async (response: any) => {
                    const tickets = await getAllTickets(response)

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .json(tickets)
                })
            }
            else {
                // get tickets without filters
                await getAll().then((response: any) => {
                    const tickets = getAllTickets(response)

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .json(tickets)
                })
            }

        } catch (error: any) {
            return res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async addTicket(req: Request, res: Response) {
        try {
            const body = req.body
            console.log(body)

            await addTicket(body)

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Успешно'
                })
        } catch (error: any) {
            console.log(error)
            return res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }
}

module.exports = new TicketsController()