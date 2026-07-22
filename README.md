# clack

> *"his fingers hurt, but he clack, clack, and clacked away"*

A minimalist, strict typing test app built with React.

### Run locally
git clone https://github.com/f2k5/clack  
cd clack  
npm install  
npm run dev

---

## 🛠️ Roadmap & To-Do

### Features & Polish
- [x] Add a "Stop and Reset" button
- [x] Custom message on Results page for zero-error runs
- [ ] Add more words/sentences to `wordDB`

### Known Bugs
- [x] Disable duration buttons while test is active
- [ ] Fix brief "no focus" flash when switching test duration
- [ ] Handle infinite word streaming (prevent fast typists from reaching array end)

### Refactoring
- [ ] Migrate codebase to TypeScript
- [ ] Audit state: replace unnecessary `useState` hooks with `useRef` to optimize re-renders