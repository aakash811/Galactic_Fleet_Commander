# 🚀 Galactic Fleet Commander

A Mission Control Dashboard to monitor and simulate pre-launch system checks for upcoming space missions.

This project was built as part of a **UI Developer Intern assignment**, focusing on clean UI, state management, and realistic real-time simulations using modern frontend tools.

---

## ✨ Features

### 🛰 Launch Watchlist
- Displays the **first 8 upcoming launches** fetched from the SpaceX public API.
- Each mission is shown as a high-quality card with mission details and patch imagery.
- The launch board acts as a **watchlist** of upcoming missions.

### 🔄 Pre-Launch Simulation
- Each mission includes an **“Initialize Systems”** action.
- Clicking it starts a **10-second simulated countdown**.
- A dynamic **system check progress bar** reflects the launch preparation status.
- Progress transitions smoothly from **yellow → green** as completion nears.

### 📝 Mission Log Console
- A dedicated sidebar logs system events such as:
  - Fueling started
  - Trajectory calculation
  - Navigation calibration
  - Final system checks
  - Systems ready
- Logs update in real time and can be cleared.
- The console can be shown or hidden for better focus.

### 🧠 State Safety & Controls
- Countdown stops immediately when **Abort** is clicked.
- Progress resets cleanly on abort.
- Rapid clicks on “Initialize Systems” do **not** trigger overlapping timers.
- Each mission manages its own isolated state.

### 🎉 Bonus Features
- **Launch All** button triggers a celebratory confetti animation 🎊
- Logs a global message: *“🚀 We are going to Mars.”*
- **Light / Dark mode** toggle using a switch-based UI.
- Subtle animations for hover, active missions, and system readiness.

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **React**
- **shadcn/ui**
- **Tailwind CSS**
- **Framer Motion**
- **SpaceX Public API**
- **canvas-confetti**

---

## 📡 Data Source

- SpaceX API:  
  https://api.spacexdata.com/v4/launches

Only **upcoming launches** are used, sorted by launch date and limited to the first 8 missions.

---

## 🧩 Architecture Overview

### Custom Hook: `useLaunchManager`
- Handles countdown timer logic
- Controls progress state
- Prevents race conditions
- Keeps UI components clean and focused

### Component Responsibilities
- **LaunchBoard** → layout, global actions, log management
- **LaunchCard** → individual mission UI & simulation
- **LogConsole** → event logging and history
- **ThemeToggle** → theme switching

---

## ⚡ Performance Notes

This application is a **client-side interactive dashboard**.

- Animations are lightweight and GPU-accelerated.
- Effects like confetti are user-triggered only.
- No unnecessary re-renders or polling.
- Lighthouse metrics may vary due to client-side data fetching and animations, which were intentionally prioritized for UX clarity in this assignment.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone <your-repo-url>
cd galactic-fleet-commander
npm install
