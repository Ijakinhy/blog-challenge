-- CreateTable
CREATE TABLE "blog_challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_image" TEXT,
    "own_id" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "blog_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "joined_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "username" TEXT,
    "profile_image" TEXT,
    "user_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
