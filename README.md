# Smash'd Burger SaaS Management Pro

A comprehensive, full-stack restaurant management ecosystem designed for high-performance burger operations. Smash'd goes beyond standard POS systems by integrating **advanced predictive analytics**, **custom-built staff optimization algorithms**, and **real-time kitchen orchestration** into a single, unified SaaS platform.

---

## Strategic Intelligence: The "AI Chef"

The platform features a sophisticated **AI Strategic Analysis** engine that functions as an automated business consultant, bridging the gap between raw data and operational decisions.

* **Predictive Operations:** Utilizing **Google Gemini 1.5/3.1 via OpenRouter**, the system analyzes historical order patterns to forecast surges, identify potential stock shortages, and project revenue trends.
* **Context-Aware Strategy:** Rather than simple data visualization, the AI provides actionable directives, such as specific stock adjustment recommendations or staffing pivots.
* **Intelligent Quota & Cache Management:** Features a built-in **Database-Backed Caching** mechanism. Insights are stored in Supabase for 30-minute intervals to optimize API costs and maintain performance, with a **Manual Force Refresh** option for real-time strategic shifts.
* **Deep Data Mining:** The engine processes product-specific sales volume, daily traffic density, and average check sizes to provide a 360-degree view of restaurant health.

---

## Workforce Optimization: The "Take-over" Engine

Managing kitchen energy and personnel is handled by a custom-developed scheduling logic designed to prevent operational bottlenecks.

* **Take-over Algorithm:** A proprietary conflict resolution logic that monitors staff overlaps, optimizes mandatory breaks, and ensures peak efficiency during high-volume periods.
* **AI-Optimized Scheduling:** Integrates real-time sales velocity with staff availability to suggest shift extensions or call for additional support dynamically.
* **Conflict Watch Panel:** A live monitoring interface that visualizes staff roles and identifies scheduling clashes before they impact service quality.

---

## Operational Modules

### Kitchen Display System (KDS)
* **Real-time Order Orchestration:** Orders are pushed instantly to the kitchen via **Supabase Realtime WebSockets**.
* **Workflow Tracking:** Orders transition through a logical lifecycle: New, In Prep, Ready, and Completed.
* **Live Performance Metrics:** Visual timers track the duration of each order in the queue, allowing chefs to prioritize high-speed delivery.

### Admin Intelligence Center
* **Advanced Analytics:** Real-time tracking of total revenue, orders per day, and average transaction values.
* **Dynamic Sales Visualization:** Interactive area charts powered by **Recharts** visualize monthly and weekly growth trends.
* **Performance Tracking:** Real-time product performance matrix with dynamic progress bars highlighting top-selling items.

### Smart Inventory & Automation
* **Automated Recipe Deduction:** Upon marking an order as "Completed," the system automatically deducts specific ingredient amounts from the inventory based on product recipes.
* **Critical Threshold Monitoring:** Automated visual alerts trigger when stock levels for essential items (Beef, Buns, etc.) fall below safe margins.
* **Restock Workflow:** Rapid-entry interface for logging new deliveries and updating stock levels instantly.

### Menu & Product Management
* **Availability Controls:** One-touch toggles to mark items as "Sold Out," providing instant visual feedback across the platform.
* **Dynamic Filtering:** High-performance category filtering and search capabilities for large menus.
* **Security & Validation:** Built-in numeric and data validation for price updates and product modifications.

---

## Technical Architecture

### Frontend
* **Framework:** Next.js 14 (App Router, Server Actions)
* **Language:** TypeScript for type-safe development
* **Styling:** Tailwind CSS with Radix UI / shadcn/ui components
* **Visuals:** Recharts for data, Framer Motion and GSAP for fluid UI interactions
* **3D Graphics:** **Spline & Three.js** for an immersive, cyberpunk-inspired landing page

### Backend & AI
* **Database:** Supabase (PostgreSQL)
* **Realtime:** WebSockets for live order and inventory updates
* **Security:** Row Level Security (RLS) for strict data isolation and access control
* **AI Models:** Google Gemini 1.5 Flash and Gemini 3.1 Lite (via OpenRouter)
* **Orchestration:** LangChain.js

---

## Setup and Installation

### 1. Repository Initialization
```bash
git clone https://github.com/EnderKaran/Smashd-Fullstack-Ordering.git
cd smashd
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
GOOGLE_API_KEY=your_google_key (optional)
```

### 3. Database Schema
Execute the SQL migrations found in `/supabase/migrations` to initialize the following tables:
* `orders`, `products`, `categories`, `inventory`, `staff_shifts`, `ai_insights`, and `settings`.

### 4. Deployment
```bash
npm run dev
```

---

## Final Project Status

* **AI Strategic Analysis:** Fully Integrated.
* **Take-over Scheduling Engine:** Fully Integrated.
* **KDS & Realtime Sync:** Fully Integrated.
* **3D Interactive Landing Page:** Fully Integrated.
* **Automated Inventory Deduction:** Fully Integrated.

**Designed with precision. Developed for the future of food technology by Ender.**
