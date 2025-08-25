# 🚀 Diplomski Project

This repository contains a .NET 8 Web API project with Entity Framework Core and PostgreSQL.  
Follow the instructions below to set up and run the project locally from a fresh clone.

---

## 1. Prerequisites

Make sure the following tools are installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL 17](https://www.postgresql.org/download/)  
  (install with default user `postgres` or create a custom user)
- [DBeaver](https://dbeaver.io/) or pgAdmin (optional, for inspecting the database)
- Git

---

## 2. Clone the Repository

```bash
git clone <repo-url>
cd <repo-root>
```

---

## 3. Database Setup

1. Ensure PostgreSQL is running locally.
2. Create a new database (if not already existing):

   ```sql
   CREATE DATABASE db_name;
   ```

3. The connection string is configured in **`WebAPI/appsettings.Development.json`**:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Port=5432;Database=db_name;Username=postgres;Password=yourpassword"
   }
   ```

   > You can change the database name if you want a fresh setup (e.g. `diplomski_dev`). Database needs to be created before appyling migrations

---

## 4. Apply Migrations

Migrations live in the **`Repository`** project, while the startup project is **`WebAPI`**.

From the solution root, run:

```bash
dotnet restore
dotnet build

dotnet ef migrations add SyncModel --project .\Repository\Repository.csproj --startup-project .\WebAPI\WebAPI.csproj --context AppDbContext -v

dotnet ef database update --project .\Repository\Repository.csproj --startup-project .\WebAPI\WebAPI.csproj --context AppDbContext
```

This will:

- Create the database schema
- Apply all migrations
- Seed the initial **Admin** user:

  - **Email:** `admin@admin.com`  
  - **Password:** `lozinka1234`  

---

## 5. Run the API 

```bash
cd .\WebApi\
dotnet run --launch-profile https
```

The API will be available at:

- http://localhost:5000  
- https://localhost:5001  

---

## 6. Verify the Database

Open **DBeaver** or **pgAdmin**:

1. Connect to `dbname`.
2. Check the `Users` table under schema `public`.
3. You should see the seeded Admin user.

---

## 7. Run the Frontend 

Open **Frontend folder in cmd**:

```bash
npm i 
npm run

```

The API will be available at:

- https://localhost:3000  

## 8. Adding a New Migration (for Developers)

When you change entity models, generate a new migration:

```bash
dotnet ef migrations add <MigrationName>   --project ./Repository/Repository.csproj   --startup-project ./WebAPI/WebAPI.csproj   --context AppDbContext
```

Then apply the migration to the database:

```bash
dotnet ef database update   --project ./Repository/Repository.csproj   --startup-project ./WebAPI/WebAPI.csproj   --context AppDbContext
```

Commit and push the new migration files located in `Repository/Migrations/`.

---

✅ After following these steps, anyone can clone the repository, apply migrations, and run the Web API with a working PostgreSQL database.
