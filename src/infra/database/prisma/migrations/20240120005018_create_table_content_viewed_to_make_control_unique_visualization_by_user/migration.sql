-- CreateTable
CREATE TABLE "contents_viewed" (
    "id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "contents_viewed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contents_viewed" ADD CONSTRAINT "contents_viewed_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents_viewed" ADD CONSTRAINT "contents_viewed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
