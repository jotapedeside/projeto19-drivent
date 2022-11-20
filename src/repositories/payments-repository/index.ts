import { PrismaClient } from "@prisma/client";
import { PaymentUpdate } from "@/protocols";

const prisma = new PrismaClient();

async function getTicketById(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: {
        select: {
          price: true,
        }
      }
    }
  });
  return ticket;
}

async function getPaymentByTicketId(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
  return payment;
}

async function updateTicketStatus(ticketId: number) {
  const ticket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    }
  });
  return ticket;
}

async function createPayment(body: PaymentUpdate, value: number) {
  const payment = await prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      value: value,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: body.cardData.number.slice(-4), //tvz mude pra 11
    }
  });
  return payment;
}

const paymentsRepository = { getTicketById, getPaymentByTicketId, updateTicketStatus, createPayment };

export default paymentsRepository;
