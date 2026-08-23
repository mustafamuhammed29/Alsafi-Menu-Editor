# 🍽️ Alsafi Menu Editor

A modern, luxury, print-ready restaurant menu designer and visual editor built with **React 18**, **Vite**, and **Tailwind CSS**. Designed specifically for high-end dining restaurants, catering services, and food businesses requiring pixel-perfect A4 print and digital menus with rich Arabic and bilingual typography.

---

## ✨ Key Features

- 🎨 **Luxury Fine-Dining Aesthetics**: Tailored dark emerald & gold palette, intricate decorative borders, and elegant Arabic typography (Tajawal, Cairo, Amiri).
- 📄 **True A4 Print Canvas**: Visual layout calibrated exactly to physical A4 dimensions (`210mm × 297mm`) with bleed and margin safety guidelines.
- ⚡ **Real-Time Visual Editor**: Live preview of multi-page menu configurations with instant rendering of layout, typography, and color adjustments.
- 🍱 **Comprehensive Item & Category Management**:
  - Add, edit, remove, and reorder categories and menu items.
  - Multi-pricing support (e.g., Single / Double / Family portions).
  - Bilingual item naming (Arabic & English) with appetizing descriptions.
  - Dietary tags & custom badges (Spicy 🌶️, Chef's Recommendation ⭐, New, Vegetarian 🌱).
- 🖨️ **Multi-Format High-Res Exports**:
  - **PDF Export**: Generate print-ready vector/raster PDF files using `jsPDF` and `html-to-image`.
  - **Vector SVG Export**: Export high-fidelity vector SVGs for lossless scalability and vinyl/laser printing.
  - **Bulk PNG ZIP Export**: Export all menu pages bundled into a single ZIP archive via `JSZip`.
  - **Native Browser Print**: Fully configured CSS `@media print` rules for direct browser printing without UI artifacts.
- 📱 **QR Code Integration**: Embedded QR code generation for seamless digital menu linking.
- 🎛️ **Modular Control Panel**: Floating RTL administration sidebar allowing full control over margins, font scales, background textures, column layouts, and legend symbols.

---

## 🛠️ Tech Stack

| Technology | Description |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Component-driven UI architecture |
| **[Vite 6](https://vitejs.dev/)** | Next-generation fast frontend tooling |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS styling & print formatting |
| **[Lucide React](https://lucide.dev/)** | Clean, modern UI iconography |
| **[jsPDF](https://github.com/parallax/jsPDF)** | Client-side PDF generation |
| **[html-to-image](https://github.com/bubkoo/html-to-image)** | High-resolution DOM-to-Canvas rendering |
| **[JSZip](https://stuk.github.io/jszip/)** | Client-side ZIP archiving for batch page exports |
| **[QRCode](https://github.com/soldair/node-qrcode)** | Dynamic QR Code generation |

---

## 📁 Project Structure

```bash
Alsafi-Menu-Editor/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/         # Top control bar, navigation, buttons
│   │   ├── control-panel/  # Editor sidebar, settings drawers, inputs
│   │   └── menu/           # A4 Page layout, Category sections, Item rows
│   ├── context/            # MenuContext state provider (pages, settings, items)
│   ├── data/               # Default settings, sample dishes, legend icons
│   ├── utils/              # PDF exporter, SVG exporter, image optimizer, validator
│   ├── App.jsx             # Root layout & page renderer
│   ├── index.css           # Global typography, A4 print rules, custom scrollbars
│   └── main.jsx            # React application entry point
├── index.html              # HTML template with Google Fonts
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Custom theme colors and screen configurations
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mustafamuhammed29/Alsafi-Menu-Editor.git
   cd Alsafi-Menu-Editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` - Compiles and optimizes the application for production inside `dist/`.
- `npm run preview` - Runs a local web server to preview the production build.

---

## 🎯 Usage & Export Guide

1. **Edit Menu Content**: Use the left sidebar to add new dishes, modify prices, update descriptions, and rearrange categories.
2. **Customize Themes**: Adjust font sizes, header styles, background image opacity, and gold border accents in real-time.
3. **Export Menu**:
   - Click **Export PDF** from the top bar to download an ultra-high-definition PDF formatted for physical printing.
   - Click **Export SVG** for scalable vector artwork.
   - Click **Export Images (ZIP)** to obtain separate PNGs for every page.
   - Press `Ctrl + P` / `Cmd + P` for instant direct print.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
