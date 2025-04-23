# 🧠 Easy Civics — tRPC Procedure Checklist

## 📋 Questions

- [ ] Create a new question (with `prompt`, `explanation`, and `expectedNumAnswers`)
- [ ] Update an existing question
- [ ] Delete a question
- [ ] Get a single question (by ID, with answers, tags, resources, related questions)
- [ ] Get all questions (with optional filters like tag, search, pagination)
- [ ] Link questions as "related" (with `relationshipType`)
- [ ] Remove a related question link

## ✅ Answers

- [ ] Create an answer for a question (with `text` and `isCorrect`)
- [ ] Update an answer
- [ ] Delete an answer
- [ ] Get all answers for a question

## 📊 Question Answers (User Responses)

- [ ] Submit an answer to a question (by a user)
- [ ] Update a submitted answer (optional)
- [ ] Get submitted answers for a user (e.g., for reviewing past responses)
- [ ] Get statistics: number of correct answers per user / per question
- [ ] Check if a user has already answered a specific question

## 🏷️ Tags

- [ ] Create a new tag
- [ ] Update a tag
- [ ] Delete a tag
- [ ] Assign a tag to a question
- [ ] Remove a tag from a question
- [ ] Get all tags
- [ ] Get all questions by tag

## 🧠 Attempts (Quiz Sessions)

- [ ] Start an attempt (creates a new attempt record)
- [ ] Submit an attempt (records `completedAt` and `score`)
- [ ] Get all attempts for a user
- [ ] Get details for a specific attempt (e.g., which questions were attempted and how user performed)

## 💡 Resources

- [ ] Add a resource (linked to a tag or question)
- [ ] Update a resource
- [ ] Delete a resource
- [ ] Get all resources for a tag or question

## 🗣️ Feedback

- [ ] Submit feedback on a question
- [ ] Get all feedback (admin or reviewer use case)

## 👤 User

- [ ] Get current user by Clerk ID
- [ ] Get user progress (e.g., number of questions attempted, score stats)
- [ ] Promote user to admin (if needed for role-based permissions)
