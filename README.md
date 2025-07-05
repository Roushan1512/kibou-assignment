# Kibou Systems Assignment

A B2B Tender management platform made with NextJs, ExpressJs, and Supabase PostgreSQL.

To start the server :

Clone the respository
```bash
git clone https://github.com/Roushan1512/kibou-assignment
cd kibou-assignment
```
Enter frontend/backend directory
```bash
cd clientside // cd serverside
```
Install Dependencies for both servers (command same for both)
```bash
npm install
```
Run servers (command same for both)
```bash
npm run dev
```

Environment Variables used:

Frontend:
```bash
NEXT_PUBLIC_BackendURL=//the backend API URL
```
Backend:
```bash
PORT=//8000
SupaURL=//Supabase Project URL
SupaServiceKey=//Supabase Project Secret key
JWT_Secret=//for jwt verification
```

Database Tables:

users (userId, email, password, userName, companyId)

companies (companyId, companyName, description)

tenders (tenderId, title, description, deadline, budget, companyId, userId)

applications (appId, tenderId, companyId, proposal)

images (companyId, imgURL)
