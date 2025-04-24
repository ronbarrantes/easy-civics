CREATE TABLE "easy_civics_answers" (
	"id" varchar(4) PRIMARY KEY DEFAULT '25NN' NOT NULL,
	"questionId" uuid NOT NULL,
	"text" text NOT NULL,
	"language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"score" integer,
	"startedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"completedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "easy_civics_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"userId" uuid,
	"message" text NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"explanation" text NOT NULL,
	"expectedNumAnswers" integer NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_question_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid NOT NULL,
	"answerId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "question_answer_unique_idx" UNIQUE("questionId","answerId","userId")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_question_tags" (
	"id" varchar(6) PRIMARY KEY DEFAULT 're9xkF' NOT NULL,
	"questionId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "question_tag_unique_idx" UNIQUE("questionId","tagId")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_related_questions" (
	"id" varchar(6) PRIMARY KEY DEFAULT '8Jj6tb' NOT NULL,
	"questionId" uuid NOT NULL,
	"relatedQuestionId" uuid NOT NULL,
	"relationship_type" text,
	CONSTRAINT "related_question_pair" UNIQUE("questionId","relatedQuestionId")
);
--> statement-breakpoint
CREATE TABLE "easy_civics_resources" (
	"id" varchar(4) PRIMARY KEY DEFAULT 'mNpw' NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"tagId" uuid,
	"questionId" uuid,
	"language" text DEFAULT 'en' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "easy_civics_tags" (
	"id" varchar(4) PRIMARY KEY DEFAULT '6Rpc' NOT NULL,
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
ALTER TABLE "easy_civics_attempts" ADD CONSTRAINT "easy_civics_attempts_userId_easy_civics_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."easy_civics_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_feedback" ADD CONSTRAINT "easy_civics_feedback_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_feedback" ADD CONSTRAINT "easy_civics_feedback_userId_easy_civics_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."easy_civics_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_answerId_easy_civics_answers_id_fk" FOREIGN KEY ("answerId") REFERENCES "public"."easy_civics_answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_answers" ADD CONSTRAINT "easy_civics_question_answers_userId_easy_civics_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."easy_civics_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_tags" ADD CONSTRAINT "easy_civics_question_tags_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_question_tags" ADD CONSTRAINT "easy_civics_question_tags_tagId_easy_civics_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."easy_civics_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_related_questions" ADD CONSTRAINT "easy_civics_related_questions_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_related_questions" ADD CONSTRAINT "easy_civics_related_questions_relatedQuestionId_easy_civics_questions_id_fk" FOREIGN KEY ("relatedQuestionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_resources" ADD CONSTRAINT "easy_civics_resources_tagId_easy_civics_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."easy_civics_tags"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "easy_civics_resources" ADD CONSTRAINT "easy_civics_resources_questionId_easy_civics_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."easy_civics_questions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answers_question_id_idx" ON "easy_civics_answers" USING btree ("questionId");--> statement-breakpoint
CREATE INDEX "related_questions_question_id_idx" ON "easy_civics_related_questions" USING btree ("questionId");--> statement-breakpoint
CREATE INDEX "related_questions_related_question_id_idx" ON "easy_civics_related_questions" USING btree ("relatedQuestionId");