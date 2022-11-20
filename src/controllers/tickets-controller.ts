import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketsService.showAllTicketsTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const tickets = await ticketsService.showAllTickets(userId);
    res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticketTypeId = req.body.ticketTypeId;

  try {
    const newTicket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
