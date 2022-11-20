import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentUpdate } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await findTicket(userId, ticketId);
  const payment = await paymentsRepository.getPaymentByTicketId(ticketId);
  return payment;
}

async function createPayment(body: PaymentUpdate, userId: number) {
  const ticketData = await findTicket(userId, body.ticketId);
  const update = await paymentsRepository.updateTicketStatus(body.ticketId);
  if (!update) throw notFoundError();
  const payment = await paymentsRepository.createPayment(body, ticketData);
  await paymentsRepository.updateTicketStatus(body.ticketId);
  return payment;
}

async function findTicket(userId: number, ticketId: number) {
  const ticket = await paymentsRepository.getTicketById(ticketId);
  if(!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  return ticket.TicketType.price;
}

const paymentsService = { getPaymentByTicketId, createPayment };

export default paymentsService;
