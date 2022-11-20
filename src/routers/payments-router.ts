import { Router } from "express";
import { paymentSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentsRouter };
