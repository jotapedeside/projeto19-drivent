import { PrismaClient } from "@prisma/client";
import { TicketType } from "@prisma/client";

const prisma = new PrismaClient();

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await prisma.ticketType.findMany();
  return ticketsTypes;
}

async function getTickets(userId: number) {
  const tickets = await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      }
    },
    include: {
      TicketType: true,
    }
  });
  return tickets;
}

async function getUserEnrollment(userId: number) {
  const ticket = await prisma.enrollment.findFirst({
    where: {
      userId,
    },
    include: {
      Ticket: true,
    }
  });
  return ticket;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const newTicket = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    }
  });
  return newTicket;
}

const ticketRepository = { getTicketsTypes, getTickets, getUserEnrollment, createTicket };

export default ticketRepository;
