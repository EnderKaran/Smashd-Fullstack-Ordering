```markdown
# Smash'd Burger SaaS Management Pro

A modern, full-stack restaurant management system built for speed, efficiency, and scale. Designed specifically for burger joints and fast-casual restaurants, this SaaS platform unifies kitchen operations, inventory tracking, and menu management into one seamless experience.

##  Features

###  Admin Dashboard
* **Real-time Analytics:** Track total revenue, daily orders, and average check sizes.
* **Visual Sales Trends:** Interactive area charts (powered by Recharts) showing daily/weekly sales momentum.
* **Top Sellers:** Dynamic progress bars highlighting the most popular menu items.

###  Kitchen Display System (KDS)
* **Real-time Order Feed:** Orders appear instantly via Supabase Realtime subscriptions.
* **Live Timers:** Visual tracking of how long each order has been in the queue.
* **One-Touch Workflow:** Bump orders from "New" -> "In Prep" -> "Ready" -> "Completed" with automated UI state changes.
* **Archive View:** Switch to history mode to view completed orders.

### Smart Inventory & Automation
* **Real-time Tracking:** Monitor current stock levels for ingredients (Meat, Buns, Veggies, etc.).
* **Critical Alerts:** Automatic visual warnings when items fall below their designated critical thresholds.
* **Auto-Deduction (Workflow):** When a chef marks a burger order as "Completed", the system automatically deducts the exact recipe amounts (e.g., 1 Bun, 0.15kg Beef) from the inventory in the background.
* **Quick Restock:** Fast-action buttons to instantly add new deliveries to current stock.

### Menu Management
* **Dynamic Product Grid:** Manage all products with image URLs, prices, and categories.
* **Quick Availability Toggle:** 1-click "Eye" icon to instantly mark an item as "Sold Out" (grayscale UI feedback).
* **Category Filtering:** Case-insensitive, high-performance filtering using React `useMemo`.
* **Safe Updates:** Built-in numeric validations for price updates.

### Restaurant Settings
* **Master Controls:** Update restaurant name, tax rates, and operating hours.
* **Emergency Panic Button:** 1-click "Pause Orders" toggle for when the kitchen is overwhelmed.

---

## Tech Stack

**Frontend:**
* [Next.js 14](https://nextjs.org/) (App Router)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Radix UI / shadcn/ui](https://ui.shadcn.com/) (Accessible components, Dialogs, Dropdowns)
* [Recharts](https://recharts.org/) (Data visualization)
* [Lucide React](https://lucide.dev/) (Icons)
* [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

**Backend & Database:**
* [Supabase](https://supabase.com/) (PostgreSQL database)
* **Supabase Auth** (Secure user authentication)
* **Supabase Realtime** (WebSockets for live order updates)
* **Row Level Security (RLS)** (Strict data access policies)

---

## Getting Started

### Prerequisites
Make sure you have Node.js installed and a Supabase account created.

### 1. Clone the repository
```bash
git clone [https://github.com/EnderKaran/Smashd-Fullstack-Ordering.git](https://github.com/EnderKaran/Smashd-Fullstack-Ordering.git)
cd smashd
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of your project and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Ensure your Supabase project has the following tables set up with their respective RLS policies:
* `products` (id, name, description, price, category_id, image_url, is_available)
* `categories` (id, name)
* `orders` (id, items, status, total_price, created_at)
* `inventory` (id, item_name, category, current_stock, critical_level, unit)
* `settings` (id, restaurant_name, tax_rate, opening_time, closing_time, is_accepting_orders)

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔮 Upcoming Features (Roadmap)
- [ ] **Interactive 3D Landing Page:** Immersive customer-facing presentation using Three.js/Spline.
- [ ] **QR Code Table Ordering:** Generate unique QR codes for tables allowing direct customer orders.
- [ ] **Customer Rewards System:** Gamified loyalty program for frequent customers.

---

*Designed and developed by Ender.*
```
