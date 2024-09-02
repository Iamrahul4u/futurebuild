-- CreateTable
CREATE TABLE "Credits" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Credits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credits_id_key" ON "Credits"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Credits_userId_key" ON "Credits"("userId");

-- AddForeignKey
ALTER TABLE "Credits" ADD CONSTRAINT "Credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
