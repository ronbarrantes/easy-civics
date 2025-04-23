import { sql } from "drizzle-orm";
import { index, pgTableCreator, unique } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `easy_civics_${name}`);

export const user = createTable("users", (d) => ({
  id: d.uuid().defaultRandom().primaryKey(),
  clerkUserId: d.varchar({ length: 255 }).notNull().unique(),
  role: d.varchar({ length: 20 }).default("user").notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const question = createTable("questions", (d) => ({
  id: d.serial().primaryKey(),
  prompt: d.text("prompt").notNull(),
  explanation: d.text("explanation").notNull(),
  expectedNumAnswers: d.integer().notNull(),
  language: d.text().notNull().default("en"),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const answer = createTable(
  "answers",
  (d) => {
    const length = 6;
    return {
      id: d.varchar({ length }).primaryKey().default(generateId(length)),
      questionId: d
        .uuid()
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }), // Foreign key reference
      text: d.text().notNull(),
      isCorrect: d.boolean().notNull(),
      language: d.text().notNull().default("en"),
    };
  },
  (table) => [
    index("question_id_idx").on(table.questionId), // Index on questionId
  ]
);

export const tag = createTable("tags", (d) => {
  const length = 4;
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    name: d.text("name").notNull().unique(),
    description: d.text("description"),
    language: d.text().notNull().default("en"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  };
});

export const question_tag = createTable(
  "question_tags",
  (d) => {
    const length = 6;
    return {
      id: d.varchar({ length }).primaryKey().default(generateId(length)),
      questionId: d
        .uuid()
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }),
      tagId: d
        .uuid()
        .notNull()
        .references(() => tag.id, { onDelete: "cascade" }),
    };
  },
  (table) => [
    unique("question_tag_unique_idx").on(table.questionId, table.tagId),
  ]
);

export const relatedQuestion = createTable(
  "related_questions",
  (d) => {
    const length = 6;
    return {
      id: d.varchar({ length }).primaryKey().default(generateId(length)),
      questionId: d
        .uuid()
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }), // Foreign key references
      relatedQuestionId: d
        .uuid()
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }), // Foreign key references
      relationshipType: d.text("relationship_type"),
    };
  },
  (table) => [
    index("question_id_idx").on(table.questionId), // Index on questionId
    index("related_question_id_idx").on(table.relatedQuestionId), // Index on relatedQuestionId
    unique("related_question_pair").on(
      table.questionId,
      table.relatedQuestionId
    ),
  ]
);

export const question_answer = createTable(
  "question_answers",
  (d) => ({
    id: d.uuid().defaultRandom().primaryKey(),
    questionId: d
      .uuid()
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }), // Foreign key reference
    answerId: d
      .uuid()
      .notNull()
      .references(() => answer.id, { onDelete: "cascade" }), // Foreign key reference
    userId: d
      .uuid()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Foreign key reference
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (table) => [
    unique("question_answer_unique_idx").on(
      table.questionId,
      table.answerId,
      table.userId
    ),
  ]
);

export const attempt = createTable("attempts", (d) => ({
  id: d.uuid().defaultRandom().primaryKey(),
  userId: d
    .uuid()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  score: d.integer(),
  startedAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  completedAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const resource = createTable("resources", (d) => {
  const length = 6;
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    title: d.varchar({ length: 255 }).notNull(),
    url: d.text().notNull(),
    tagId: d.uuid().references(() => tag.id, { onDelete: "set null" }),
    questionId: d
      .uuid()
      .references(() => question.id, { onDelete: "set null" }),
    language: d.text().notNull().default("en"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  };
});

export const feedback = createTable("feedback", (d) => ({
  id: d.uuid().defaultRandom().primaryKey(),
  questionId: d
    .uuid()
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
  userId: d.uuid().references(() => user.id, { onDelete: "cascade" }),
  message: d.text().notNull(),
  language: d.text().notNull().default("en"),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
