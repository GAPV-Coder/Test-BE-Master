CREATE TABLE "Users" (
  "user_id" int PRIMARY KEY,
  "nickname" varchar(255) NOT NULL,
  "email" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "Authors" (
  "author_id" int PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "biography" varchar NOT NULL
);

CREATE TABLE "Collaborators" (
  "collaborator_id" int PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "role" varchar(20) NOT NULL,
  "video_id" int
);

CREATE TABLE "Videos" (
  "video_id" int PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "dateOfPublication" datetime,
  "duration" int NOT NULL,
  "author_id" int
);

CREATE TABLE "Comments" (
  "comment_id" int PRIMARY KEY,
  "content" varchar(255) NOT NULL,
  "dateOfPublication" datetime,
  "user_id" int,
  "video_id" int
);

CREATE TABLE "Reviews" (
  "review_id" int PRIMARY KEY,
  "score" int NOT NULL,
  "comment" varchar NOT NULL,
  "user_id" int,
  "video_id" int
);

ALTER TABLE "Collaborators" ADD FOREIGN KEY ("video_id") REFERENCES "Videos" ("video_id");

ALTER TABLE "Videos" ADD FOREIGN KEY ("author_id") REFERENCES "Authors" ("author_id");

ALTER TABLE "Comments" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Comments" ADD FOREIGN KEY ("video_id") REFERENCES "Videos" ("video_id");

ALTER TABLE "Reviews" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Reviews" ADD FOREIGN KEY ("video_id") REFERENCES "Videos" ("video_id");
