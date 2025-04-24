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

const length = 6;

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
  id: d.varchar({ length }).primaryKey().default(generateId(length)),
  questionNumber: d.integer().notNull(),
  prompt: d.text().notNull(),
  explanation: d.text(),
  expectedNumAnswers: d.integer().notNull().default(1),
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
    return {
      id: d.varchar({ length }).primaryKey().default(generateId(length)),
      questionId: d
        .varchar({ length })
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }),
      text: d.text().notNull(),
      language: d.text().notNull().default("en"),
    };
  },
  (table) => [index("ans_qt_id_idx").on(table.questionId)]
);

export const tag = createTable("tags", (d) => {
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    name: d.text().notNull().unique(),
    description: d.text(),
    language: d.text().notNull().default("en"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  };
});
export const question_tag = createTable("question_tags", (d) => {
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    questionId: d
      .varchar({ length })
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    tagId: d
      .varchar({ length })
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  };
});

export const relatedQuestion = createTable("related_questions", (d) => {
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    questionId: d
      .varchar({ length })
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    relationshipType: d.text("relationship_type"),
  };
});

export const question_answer = createTable(
  "question_answers",
  (d) => {
    return {
      id: d.uuid().defaultRandom().primaryKey(),
      questionId: d
        .varchar({ length })
        .notNull()
        .references(() => question.id, { onDelete: "cascade" }),
      answerId: d
        .varchar({ length })
        .notNull()
        .references(() => answer.id, { onDelete: "cascade" }),
      userId: d
        .uuid()
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      createdAt: d
        .timestamp({ withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    };
  },
  (table) => [
    unique("qt_ans_unique_idx").on(
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
  return {
    id: d.varchar({ length }).primaryKey().default(generateId(length)),
    title: d.varchar({ length: 255 }).notNull(),
    url: d.text().notNull(),
    tagId: d
      .varchar({ length })
      .references(() => tag.id, { onDelete: "set null" }),
    questionId: d
      .varchar({ length })
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
    .varchar({ length })
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
