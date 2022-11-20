import { Router } from "express";
import { ticketSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getTickets, postTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", validateBody(ticketSchema), postTicket)
  .get("/types", getTicketsTypes);

export { ticketsRouter };
