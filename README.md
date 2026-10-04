# IrriGo — AgriPulse Intelligence Platform

> **AI-Powered Agricultural Intelligence for Indian Smallholder Farmers**  
> *Smarter Farming. Less Water. Cleaner Energy. Higher Yields. Climate Shield.*

---

## Overview

**IrriGo** is a comprehensive, farmer-first agricultural intelligence platform designed to empower smallholders across India with actionable, data-driven decisions. By combining IoT sensor metrics, hyper-local weather intelligence, solar pump optimization, and predictive crop health advisory, IrriGo bridges the gap between traditional farming and modern sustainable agriculture.

---

## Key Features

### 1. Smart Precision Irrigation
- **Moisture & Evapotranspiration Monitoring**: Real-time soil matrix monitoring (0–30cm & 30–60cm depth).
- **Water Saving Recommendations**: Automated irrigation schedules that reduce water usage by up to **40%**.

### 2. Solar Pump & Clean Energy Optimization
- **Solar Generation Forecasting**: Real-time grid vs. solar availability tracking.
- **Off-Grid Pump Management**: Automated pump timing to maximize solar energy utilization and eliminate energy waste.

### 3. Climate Shield & Risk Mitigation
- **Hyper-Local Weather Alerts**: Early warning alerts for frost, heavy rainfall, pest outbreaks, and heat stress.
- **Actionable Advisory**: Vernacular mitigation steps tailored to specific crop stages.

### 4. AgriVault Post-Harvest Storage Intelligence
- **Micro-Warehouse Monitoring**: Real-time temperature, humidity, and storage degradation monitoring.
- **Spoilage Prevention**: Early spoilage alerts for harvested produce.

### 5. Multi-Lingual Vernacular Support
- Full localization supporting **English**, **Tamil (தமிழ்)**, and **Hindi (हिंदी)**.

### 6. Interactive Farm Simulator
- **Scenario Testing**: Test different soil moisture levels, solar irradiance, and pest risks to see real-time AI recommendations and yield impact.

---

## Tech Stack & Architecture

- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom Glassmorphism System (`#FAFFFC` Light Theme Palette)
- **Icons**: Lucide React
- **Animations**: Framer Motion & 60 FPS HTML5 Canvas Engine
- **Routing**: React Router v7

---

## UI/UX Design System

- **Clean Light Aesthetic**: 90% white/off-white (`#FAFFFC`) background with 10% soft light-green accents (`#10B981` / `#059669`).
- **Professional Navigation**:
  - Public flow: Landing Page $\rightarrow$ Standalone Sign In / Sign Up.
  - Dedicated Farmer & Admin Portals featuring a left sidebar layout for streamlined navigation.
- **Zero Emoji Constraint**: Clean, crisp SVG icons and typography throughout the application.

---

## Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:SATHYA182007/IrriGo.git
cd IrriGo

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```text
IrriGo/
├── public/
│   └── videos/            # High-performance looping agricultural WebM assets
├── src/
│   ├── animations/        # Framer Motion animation variants
│   ├── components/        # Reusable UI components (AIFarmBackground, WordTransition, etc.)
│   ├── context/           # React Context (Auth, Language, Farm, Demo)
│   ├── i18n/              # Centralized Tamil, Hindi, and English translations
│   ├── layouts/            # Public Layout, Farmer Left Sidebar, Admin Left Sidebar
│   ├── pages/             # Landing Page, Auth Page, Simulator, Farmer & Admin Portals
│   ├── services/          # Recommendation Decision Engine & Mock IoT Service
│   └── types/             # Full TypeScript interfaces
├── package.json
└── README.md
```

---

## License

Designed and built for Indian Smallholder Agriculture Empowerment. All rights reserved.
