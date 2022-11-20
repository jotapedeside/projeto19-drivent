import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const userId = req.userId;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const payments = await paymentsService.getPaymentByTicketId(userId, Number(ticketId));
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const body = req.body;
  try {
    const payment = await paymentsService.createPayment(body, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
