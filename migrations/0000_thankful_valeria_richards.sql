CREATE TABLE "easy_civics_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"text" text NOT NULL,
	"language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionNumber" integer NOT NULL,
	"prompt" text NOT NULL,
	"explanation" text,
	"expectedNumAnswers" integer DEFAULT 1 NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ques_lan_idx" UNIQUE("language","questionNumber")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_question_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"answerId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "qt_ans_unique_idx" UNIQUE("questionId","answerId","userId")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_question_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"tagId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_related_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"relationship_type" text
);
--> statement-breakpoint
CREATE TABLE "easy_civics_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"tagId" uuid,
	"questionId" uuid,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "easy_civics_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "easy_civics_users_clerkUserId_unique" UNIQUE("clerkUserId")
);
--> statement-breakpoint
ALTER TABLE "easy_civics_answers" ADD CONSTRAINT "easy_civics_answers_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_answerId_easy_civics_answers_id_fk" FOREIGN KEY ("answerId") REFERENCES "public"."easy_civics_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_userId_easy_civics_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."easy_civics_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_tags" ADD CONSTRAINT "easy_civics_question_tags_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_tags" ADD CONSTRAINT "easy_civics_question_tags_tagId_easy_civics_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."easy_civics_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_related_questions" ADD CONSTRAINT "easy_civics_related_questions_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_resources" ADD CONSTRAINT "easy_civics_resources_tagId_easy_civics_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."easy_civics_tags"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_resources" ADD CONSTRAINT "easy_civics_resources_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ans_qt_id_idx" ON "easy_civics_answers" USING btree ("questionId");