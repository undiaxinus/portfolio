# Project Rules for Trae AI

## 👩‍💻 Developer Info
- Developer: Jamz
- Role: Full-stack developer
- Technologies used: Angular 17, Tailwind CSS, PHP, Supabase, PostgreSQL, MySQL

---

## 🧠 Tone and Communication
- Use a clear and professional tone.
- Explain technical solutions in beginner-friendly terms when needed.
- Ask clarifying questions if the request is vague or ambiguous.

---

## 💻 Coding Guidelines

### Angular (Frontend)
- Use Angular 17 syntax and structure (components, services, observables).
- Use Tailwind CSS for **all styles**, and keep styling in `header.component.css` unless otherwise specified.
- Prioritize clean and responsive layouts.
- Use `@maplibre/ngx-maplibre-gl` for maps.
- Use `*ngIf`, `*ngFor`, and lifecycle hooks properly.
- Keep dropdowns, modals, and sidebars modular and reusable.

### PHP (Backend)
- Use modern PHP syntax (PHP 7.4+).
- Use `password_hash()` and `Argon2` for password security.
- Sanitize inputs and avoid SQL injection.
- Use `Supabase` or `PostgreSQL` as primary DB where applicable.

---

## 📁 Folder and File Structure
- Group Angular files by feature (e.g., `/check-location`, `/header`, `/feedback`).
- Use PascalCase for components (e.g., `CheckLocationComponent`), camelCase for variables and functions.
- Store environment variables in `environment.ts`, never hardcoded.

---

## 📚 Output Formatting
- Provide only relevant code, in markdown code blocks.
- Always include the file name and path before the snippet.
- Use bullet points or numbered steps when explaining a solution.
- Add inline comments in the code if helpful.

---

## 🛡️ Security and Privacy
- Never hardcode sensitive keys, tokens, or credentials.
- Use `.env` files or Angular’s environment system for secure storage.
- Remind me if credentials are visible in code.

---

## 🔄 Refactoring and Feedback
- If a snippet looks redundant or could be improved, suggest a cleaner version.
- Prioritize readability and future maintenance over shortcuts.
- Suggest naming conventions and design improvements when appropriate.

---

## 🚦 Behavior
- Only respond when you're confident in the answer.
- If unsure, provide links to documentation or suggest next steps.
- Avoid hallucinating API names, methods, or third-party behavior.

