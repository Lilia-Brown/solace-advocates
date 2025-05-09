## Solace Assignment Addendum

This an addendum to the original [Solace Assignment repo](https://github.com/Lilia-Brown/solace-candidate-assignment)
- All Pull Requests on original repo have been merged into this one
- Additional commits were made to `main` to allow this repo to be cloned immediately and viewed as-is with all functionality

<details><summary>Set up Information</summary>

  ## Getting Started

  Install dependencies

  ```bash
  npm i
  ```

  Run the development server:

  ```bash
  npm run dev
  ```

  ## Database set up

  The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

  1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

  ```bash
  docker compose up -d
  ```

  2. Create a `solaceassignment` database.

  3. Push migration to the database

  ```bash
  npx drizzle-kit push
  ```

  4. Seed the database

  ```bash
  curl -X POST http://localhost:3000/api/seed
  ```

</details>

### Additional Updates
- [[Feature] Adds AdvocateCard to display advocates more compactly and easier on mobile](https://github.com/Lilia-Brown/solace-advocates/commit/b0a2896c81214e69059e46db490a1f7b693c8ec2)
  - Removes table and adds cards to see more information in a compact manner on web and mobile
- [[Feature] Adds optional filtering](https://github.com/Lilia-Brown/solace-advocates/commit/0705dd35a7447f401aa6d7d28ca4b9af10c717ea)
  - Adds a filtering section to allow filtering on data with dropdowns
- [[Refactor] Breaks page.tsx into components](https://github.com/Lilia-Brown/solace-advocates/commit/a8f275b12503f0eae9ffc5b850b048c3e7cfaa06)
  - Refactors previous features for readability to possibly future reuse   

### Discussion
Thank you for taking the time to review this repository. In my initial attempt, I focused heavily on commit history and documentation, which came at the expense of overall polish. With this iteration, my goal was to present a more refined and thoughtful submission. While time constraints are always a factor, I wanted to demonstrate my commitment to delivering work I can stand behind—both as a reflection of my skills and in support of my application for this role.
