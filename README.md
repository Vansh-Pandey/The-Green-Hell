# 🎃 Haunted Mansion - Interactive Horror Website

<div align="center">

![Haunted Mansion](https://img.shields.io/badge/Haunted-Mansion-green?style=for-the-badge&logo=ghost)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)

**An immersive, interactive horror-themed website featuring 3D animations, parallax effects, and spine-chilling experiences.**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 👻 About The Project

Welcome to the **Haunted Mansion** - a fully interactive horror website that combines cutting-edge web technologies to create an unforgettable supernatural experience. Explore cursed spirits, play haunting games, and dare to uncover the dark secrets hidden within.

### ✨ Key Features

- 🌙 **Parallax Hero Section** - Multi-layered scrolling effects that bring the haunted mansion to life 
- 🎮 **Memory Card Game** - Test your memory while breaking the mansion's curse
- 🤖 **AI Chatbot** - Interactive 3D chatbot to guide you through the haunted experience
- 📜 **Halloween Story Frame** - Animated story reveal with creepy effects
- 🎨 **Creators Showcase** - 3D carousel featuring the team behind the horror
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎭 **Smooth Animations** - Powered by Framer Motion for buttery-smooth transitions
- 🌫️ **Atmospheric Effects** - Fog, smoke, and eerie glows throughout

---

## 🛠️ Built With

This project leverages modern web technologies:

- **[React 18+](https://react.dev/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library

---

## 🚀 Getting Started

Follow these steps to run the Haunted Mansion locally on your machine.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

Check your versions:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vansh-Pandey/The-Green-Hell.git
   cd The-Green-Hell
   ```

2. **Install dependencies**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   
   Using npm:
   ```bash
   npm run dev
   ```
   
   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)


---

## 🎮 Features Breakdown

### 1. **Hero Section with Parallax**
Multi-layered parallax scrolling creates depth and immersion as you scroll through the haunted mansion entrance.

### 2. **Spirit Carousel**
- 3D rotating carousel showcasing 4 cursed spirits
- Click any spirit card to reveal their dark tale and curse
- Smooth animations and eerie visual effects
- Modal with detailed backstories

**Spirits Featured:**
- 🧙‍♀️ **Ganji Chudail** - The Bald Witch
- 👶 **Munjiya** - The Vengeful Child
- 💀 **Bhoot** - The Skeletal Specter
- 👰 **Bhootni** - The Weeping Woman

### 3. **Memory Card Game**
Break the curse by matching pairs of haunted symbols. Features:
- Flip card animations
- Score tracking
- Victory celebration effects
- Reset functionality

### 4. **Interactive Chatbot**
A floating 3D chatbot that provides guidance and adds interactivity to the experience.

### 5. **Responsive Design**
Fully optimized for all screen sizes:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

---

## 🎨 Customization

### Changing Colors

The project uses a green horror theme. To customize colors, edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'horror-green': '#22c55e',
        'horror-dark': '#0a0a0a',
        // Add your custom colors
      }
    }
  }
}
```

### Adding New Spirits

To add more spirits to the carousel, edit `src/components/SpiritCarousel.tsx`:

```typescript
const spirits: SpiritProps[] = [
  // ... existing spirits
  {
    name: 'Your Spirit Name',
    title: 'The Spirit Title',
    image: 'your-image-url',
    bio: 'The dark tale...',
    curse: 'The curse description...',
  },
];
```

### Custom Fonts

The project uses the **Nosifer** font for horror-themed text. To add more fonts:

1. Import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

2. Use in components:
```typescript
style={{ fontFamily: 'Your Font, cursive' }}
```

---

## 🐛 Troubleshooting

### Issue: Modal appears behind other elements

**Solution:** The SpiritCarousel component uses React Portal. If you still face issues, ensure no parent components have:
- `overflow: hidden`
- `transform` properties
- High `z-index` values

### Issue: Animations are laggy

**Solution:** 
- Disable browser extensions
- Clear browser cache
- Ensure hardware acceleration is enabled
- Check if your device meets minimum requirements

### Issue: Images not loading

**Solution:**
- Check your internet connection
- Verify image URLs are accessible
- Check browser console for CORS errors

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---



## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) - For horror-themed images
- [Framer Motion](https://www.framer.com/motion/) - For amazing animation capabilities
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [Lucide Icons](https://lucide.dev/) - For beautiful icons
- Google Fonts - For the Nosifer horror font


---

## 🎃 Happy Haunting!

<div align="center">

**If you dare to enter, give this repo a ⭐**

*"Those who enter this mansion... are never the same again."*

</div>