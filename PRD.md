**Product Requirements Document (PRD): US Citizenship Study Tool**

---

**Project Name:** US Citizenship Study Tool  
**Version:** 0.1 MVP  
**Created By:** Ron Barrantes
**Date:** April 21, 2025

---

### 1. **Overview**

A modern, interactive, and accessible tool to help users prepare for the US Citizenship Naturalization Civics Test. Unlike existing tools that rely on rote memorization, this platform focuses on contextual understanding, intuitive navigation, and visual learning.

---

### 2. **Goals & Objectives**

- Help users understand the meaning and significance behind the test questions.
- Categorize questions by topic, timeline, or geography.
- Provide short contextual history blurbs with each question.
- Visualize connections between related questions.
- Offer a fun, engaging, and user-friendly experience.

---

### 3. **Target Audience**

- US Citizenship applicants (primarily non-native English speakers)
- ESL students
- Teachers/tutors aiding with civics education

---

### 4. **Core Features (MVP)**

#### a. **Question Browser**

- Display list of the 100 official USCIS questions.
- Each question will:
  - Show the official question and answer.
  - Show a short, simplified history explanation (~2–3 paragraphs).
  - Include related tags (e.g., "Revolutionary War", "Presidents", "Geography").

#### b. **Category Navigation**

- Allow filtering/sorting questions by:
  - Subject (History, Government, Geography, Symbols, Rights & Responsibilities)
  - Time Period (Founding Era, Civil War, Modern, etc.)
  - Tag-based filtering (optional, in sidebar or dropdown)

#### c. **Basic Interactive Graph View (Placeholder)**

- Use a static placeholder for related-question graph (interactive version TBD).
- Show a basic diagram with 2–3 connections between questions as a proof-of-concept.

#### d. **Responsive UI with Modern Styling**

- Use React or Next.js
- Style using **shadcn/ui** (Tailwind + Radix components)
- Support dark mode

---

### 5. **Optional (Post-MVP or Stretch Goals)**

- **Authentication:** Save progress, history, and custom quiz sets.
- **Quizzes:** Generate dynamic quizzes based on selected categories.
- **Audio Support:** Narrate questions + answers.
- **Multi-language support**
- **Graph View:** Fully interactive visual network of related questions.

---

### 6. **Tech Stack**

- **Frontend Framework:** Next.js (preferred for easy routing + future SSR)
- **Styling/UI:** Tailwind CSS with shadcn/ui
- **State Management:** Context API or Zustand (if needed)
- **Data Source:** Local JSON or Markdown file for initial questions + explanations
- **Optional Auth:** Clerk or Auth.js (for later)

---

### 7. **Content Plan (Initial)**

- Import all 100 USCIS questions
- Write short historical/contextual blurbs for each
- Tag each with relevant subjects/timelines

---

### 8. **Competitive Analysis & Differentiation**

#### Existing Solutions:

- Most current tools (e.g., USCIS app, Citizen Now, USAHello) focus on memorization through flashcards, multiple choice quizzes, or audio playback.
- Some offer progress tracking and translations but lack depth and exploration of historical context.

#### Identified Gaps:

- Lack of visual/graphical relationships between topics/questions.
- Minimal context or storytelling that explains _why_ a question is important.
- Poor user engagement beyond rote learning (little emotional or intellectual investment).

#### Opportunities:

- Focus on **contextual learning**: make history and civics emotionally engaging and meaningful.
- Offer **interactive visual learning tools** (e.g., graph network of questions).
- Build **educator-friendly tools** for ESL teachers and community organizers.
- Serve as a **bridge resource** for learners who want more than basic flashcards but aren't ready for full civics courses.

---

### 9. **Monetization (Later Consideration)**

- Targeted ads (e.g., Google AdSense)
- Affiliate links (citizenship legal services, books, etc.)
- Premium features (progress tracking, quizzes, audio)

---

### 10. **Timeline (Rough)**

- Week 1: Set up project + load question content
- Week 2: Build browser UI + filters
- Week 3: Add contextual blurbs and simple graph
- Week 4: Polish design + mobile UX

---

### 11. **Success Metrics (MVP)**

- Time on site > 2 minutes per session
- Completion of all questions by user
- Positive feedback from testers (ESL users, educators)
- Organic search traffic for civics prep keywords

---

**Notes:**  
Start lean. Prioritize vibe and usefulness over perfect structure. Iterate once feedback starts coming in. Auth and monetization can come later.
