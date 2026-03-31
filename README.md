# Diecast Paddock 🏎️💨

Diecast Paddock is a high-fidelity, racing-inspired digital catalogue specifically designed for precision scaled diecast collectors (1:64, 1:43, 1:18, etc.). It provides a professional, "System Sentinel" style dashboard to log, manage, and showcase a growing precision scaled garage with speed and style.

## 🏁 The Intent

The project was born out of a need for a dedicated, visually stunning space to manage diecast collections that traditional spreadsheets or generic apps fail to inspire. Diecast Paddock aims to:
- **Celebrate the Detail**: Provide a space where every casting is treated with the importance it deserves.
- **Dynamic Organization**: Move beyond simple lists into a manufacturer-based "Garage" navigation system.
- **Cloud-Ready Persistence**: Integrate seamlessly with modern cloud storage for real-world collection management.

## 🏆 Key Achievements & Features

### 1. High-Fidelity Racing UI
- **Ambient Racing Glow**: A deep red, ambient-lit interface featuring a customized dot-matrix and striped racing pattern.
- **Premium Design Language**: Modern typography, glassmorphism, and smooth micro-animations for a high-end "racing paddock" feel.
- **Dynamic Headers**: Context-aware top navigation with custom-designed car and tire iconography.

### 2. The "Garage" Navigation
- **Manufacturer-Centric Browsing**: A visual menu system using car brand logos (Porsche, Nissan, Ferrari, etc.) to navigate your collection.
- **Deep Filtering & Sorting**: Sort by acquisition date, model alphabetics, or scale dimension. Filter by diecast manufacturer (Mini GT, Hot Wheels Premium, Inno64, etc.) or car brand.

### 3. Detailed Collection Registry
- **Multi-Image Support**: Log models with multiple high-quality angles.
- **Observation Notes**: Dedicated space for acquisition details, spec tracking, and personal thoughts on each casting.
- **Scale Profiles**: Support for all major diecast scales from 1:64 to 1:18.

### 4. Cloud Storage Integration (Vercel Blob)
- **Real-Time Uploads**: Integrated with **Vercel Blob** for persistent, cloud-hosted image storage.
- **Loading Intelligence**: Dynamic spinners and upload locks ensure data integrity while your photos are moving to the cloud.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Storage**: [Vercel Blob](https://vercel.com/storage/blob)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Add your Vercel Blob token to a `.env.local` file:
   ```env
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Open Dashboard**:
   Navigate to [http://localhost:3000](http://localhost:3000) to enter the Paddock.

---

Designed for collectors, by collectors. 🥂
