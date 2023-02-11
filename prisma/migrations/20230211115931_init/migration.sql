-- CreateTable
CREATE TABLE "MovieList" (
    "id" TEXT NOT NULL,
    "movies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieList_pkey" PRIMARY KEY ("id")
);
