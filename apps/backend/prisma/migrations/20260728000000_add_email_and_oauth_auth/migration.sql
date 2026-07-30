ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;

CREATE TABLE "oauth_account" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "oauth_account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "email_auth_token" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "pendingUser" JSONB,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "email_auth_token_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "oauth_account_provider_providerUserId_key" ON "oauth_account"("provider", "providerUserId");
CREATE INDEX "oauth_account_userId_idx" ON "oauth_account"("userId");
CREATE UNIQUE INDEX "email_auth_token_tokenHash_key" ON "email_auth_token"("tokenHash");
CREATE INDEX "email_auth_token_email_purpose_idx" ON "email_auth_token"("email", "purpose");

ALTER TABLE "oauth_account"
ADD CONSTRAINT "oauth_account_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
