-- CreateTable
CREATE TABLE "payout_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountHolderName" TEXT,
    "country" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "payoutMethod" TEXT NOT NULL DEFAULT 'BANK',
    "bankName" TEXT,
    "routingNumber" TEXT,
    "accountNumber" TEXT,
    "paypalEmail" TEXT,
    "taxResidency" TEXT,
    "businessType" TEXT NOT NULL DEFAULT 'INDIVIDUAL',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payout_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payout_account_userId_key" ON "payout_account"("userId");

-- AddForeignKey
ALTER TABLE "payout_account" ADD CONSTRAINT "payout_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
