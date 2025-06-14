```markdown
# 🏠 UniHomes

**UniHomes** is a modern real estate platform designed to help students and working professionals find and reserve affordable housing. Built with **Next.js**, styled using **Tailwind CSS** and **shadcn/ui**, and powered by **Supabase** as a backend-as-a-service solution. Deployed seamlessly on **Vercel** for optimal performance and scalability.

---

## 🚀 Live Demo

🔗 [https://unihomes.vercel.app](https://unihomes.vercel.app)

---

## 🧩 Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | Next.js (App Router)       |
| Styling      | Tailwind CSS + shadcn/ui   |
| State/Utils  | Zustand, React Hook Form   |
| Backend      | Supabase (PostgreSQL, Auth, Storage) |
| Deployment   | Vercel                     |

---

## ✨ Features

- 🏘 **Browse Listings**  
  Filter and search dorms, condos, and apartments by location, price, and amenities.

- 📦 **Reservation System**  
  Users can reserve rooms with added booking fees and track the status of their reservations.

- 💬 **In-Platform Messaging**  
  Seamless communication between property managers and tenants.

- 📈 **Boosted Listings**  
  Property owners can promote listings for extended visibility (revenue stream).

- ⚙️ **Role-Based Access**  
  - **Proprietors**: Create and manage properties, units, and bookings  
  - **Customers**: Browse and reserve publicly listed units

- 🧾 **Dashboard**  
  Proprietors manage properties, track revenue, and monitor reservations.

- 🗂 **Amenity System**  
  Filter by amenities across units and properties using Supabase relationships.

---

## 📦 Project Structure

```

app/
├── (routes)/            # Pages and layouts
├── dashboard/           # Authenticated routes
components/              # Reusable UI components
lib/                     # Supabase client, helpers
hooks/                   # Custom hooks (auth, data-fetching)
types/                   # TypeScript interfaces
store/                   # Zustand state

````

---

## 🛠 Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> You can find these in your [Supabase Project Settings](https://app.supabase.com)

---

### 3. Run locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔐 Authentication

* Uses Supabase Auth (email + password)
* Session managed via Supabase client
* Protected routes with role-based access using middleware

---

## 🧪 Data Model Highlights

* `users`: Supabase auth users
* `properties`: Created by proprietors
* `units`: Linked to properties
* `reservations`: Linked to units and customers
* `amenities`: Many-to-many with units and properties

---

## 📈 Monetization Features

* 💵 **Listing Boosts**: Extended visibility for a fee
* 💳 **Reservation Fees**: Platform fee applied on each reservation

---

## 📤 Deployment

Frontend is deployed via [Vercel](https://vercel.com)

```bash
# To deploy manually
vercel deploy
```

---

## 📅 Upcoming Features

* [ ] Google Maps integration for location previews
* [ ] Notification system for new messages/reservations
* [ ] Admin dashboard for global oversight
* [ ] Stripe integration for online payments

---

## 📄 License

---

## 🤝 Contributing

We welcome contributions! Please open an issue or submit a PR.

---

## 📬 Contact

For questions or support:
📧 rgacorda.the2nd@gmail.com

```
