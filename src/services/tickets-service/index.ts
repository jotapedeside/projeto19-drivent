import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";

async function showAllTicketsTypes() {
  const ticketsTypes = await ticketRepository.getTicketsTypes();
  if (ticketsTypes.length === 0) return [];
  return ticketsTypes;
}

async function showAllTickets(userId: number) {
  const tickets = await ticketRepository.getTickets(userId);
  if (!tickets) throw notFoundError();
  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketRepository.getUserEnrollment(userId);
  if (!enrollment) throw notFoundError();
  const newTicket = await ticketRepository.createTicket(ticketTypeId, enrollment.id);
  return newTicket;
}

const ticketsService = { showAllTicketsTypes, showAllTickets, createTicket };

export default ticketsService;
