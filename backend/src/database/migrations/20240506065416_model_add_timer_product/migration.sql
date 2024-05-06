-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimerProduct" (
    "productId" INTEGER NOT NULL,
    "timerId" INTEGER NOT NULL,

    CONSTRAINT "TimerProduct_pkey" PRIMARY KEY ("productId","timerId")
);

-- AddForeignKey
ALTER TABLE "TimerProduct" ADD CONSTRAINT "TimerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimerProduct" ADD CONSTRAINT "TimerProduct_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
