ALTER TABLE "subscribe" ADD COLUMN "paymentSessionId" TEXT;
CREATE UNIQUE INDEX "subscribe_paymentSessionId_key" ON "subscribe"("paymentSessionId");
