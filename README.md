# Diecast Paddock ⬢

Diecast Paddock is a digital catalogue built to support my passion for diecast cars. It provides a specialized dashboard to log, manage, and showcase a collection of precision scaled models (Mini GT, Hot Wheels Premium, Inno64, etc.) in a single high-fidelity interface.

## ◢ Purpose

This project is personal at its core. It serves as a dedicated digital garage to replace manual spreadsheets and generic trackers. The goal was to build a tool that matches the premium quality of the models it catalogues, providing a high-performance space to keep my collection organized and accessible.

## ◢ Key Features

### 1. High-Fidelity Racing Interface
- **Ambient Dashboard**: A racing-inspired dark interface with ambient red glows and technical patterns (dot-matrix and striped textures).
- **Custom Iconography**: Unique car and tire symbols integrated into the navigation system for a cohesive automotive feel.

### 2. Specialized Navigation
- **Manufacturer Garage**: A visual menu system using car brand logos to navigate through specific sub-collections.
- **Multidimensional Filters**: Dynamically sort and filter by diecast manufacturer, car brand, and scale dimension (1:18, 1:43, 1:64, etc.).

### 3. Registry & Tracking
- **Multi-Media Support**: Capability to log multiple photos and detailed observation notes for each model in the collection.
- **Detailed Profiles**: Every model is tracked by its unique identity, manufacture history, and scale specifications.

### 4. Direct Photo Storage
- **Integrated Storage**: Built-in support for real persistent image uploads.
- **Cloud-Ready**: Direct integration with cloud storage providers (Next.js & Vercel) to ensure cross-device consistency.

## ◢ Technical Specification
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS / Vanilla CSS
- **Storage Engineering**: Vercel Blob

## ◢ Setup Guide

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Add a `.env.local` file with your storage credentials:
   ```env
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```

3. **Development Mode**:
   ```bash
   npm run dev
   ```

---
Built to catalogue precision scaling. ⬢
