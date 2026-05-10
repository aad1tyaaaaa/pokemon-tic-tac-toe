# 🎮 Pokémon 4x4 Tic-Tac-Toe

<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/151.gif" width="100" />
  <img src="https://img.shields.io/badge/VS-000000?style=for-the-badge&logo=pokemon&logoColor=white" />
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif" width="100" />
</p>

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An advanced, full-stack Pokémon-themed 4x4 Tic-Tac-Toe experience. This project combines a sophisticated **Minimax AI** with a robust **Node.js backend**, **PostgreSQL database**, and secure **JWT authentication**.

---

## ✨ Key Features

<p align="right">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif" width="60" />
</p>

- **🧠 Advanced Minimax AI**: Battle a highly optimized algorithm with alpha-beta pruning that anticipates your every move.
- **🔐 Secure Authentication**: Integrated **JWT-based login system** to protect user profiles and game history.
- **🗄️ Persistent Storage**: Full **PostgreSQL** integration to store leaderboards, user stats, and match history.
- **📊 Real-time Analysis**: Interactive dashboard visualizing the AI's decision tree and heuristic scoring.
- **🎨 Premium Retro Aesthetic**: A stunning, responsive UI inspired by classic Pokémon games.
- **📱 Mobile Optimized**: Fully responsive design for seamless gameplay on any device.

<p align="left">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif" width="60" />
</p>

---

## 🖼️ Preview

<p align="center">
  <img src="./public/interface.png" width="80%" alt="Main Interface" />
  <br />
  <em>The Ultimate Battle: Mew vs Bulbasaur</em>
</p>

<p align="center">
  <img src="./public/interface01.png" width="80%" alt="Dashboard View" />
  <br />
  <em>AI Analytics & Strategy Dashboard</em>
</p>

---

## 🛠️ Full Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Custom SVG & PokeAPI Sprites

### Backend & Security
- **Runtime**: Node.js
- **API**: Next.js Server Actions / API Routes
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Bcrypt password hashing & Protected Routes

### Database
- **Engine**: PostgreSQL
- **ORM**: Prisma / Kysely (Scalable architecture)
- **Persistence**: Game state and Global Leaderboard

<p align="right">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif" width="60" />
</p>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Instance
- pnpm (recommended)

### Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pokemon_db"
JWT_SECRET="your_ultra_secure_secret"
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aad1tyaaaaa/pokemon-tic-tac-toe.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run database migrations:
   ```bash
   npx prisma db push
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

---

## 📁 Architecture

```text
├── app/              # Frontend Pages & Layout
├── components/       # UI Components & Game Logic
├── lib/              # AI Algorithm (Minimax) & DB Config
├── server/           # Backend Logic & Auth Handlers
├── prisma/           # Database Schema
└── public/           # Assets & Sprites
```

<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/94.gif" width="80" />
</p>

---

## 🤝 Contributors

| Name | Profiles |
| :--- | :--- |
| **Aaditya Jaiswar** | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/aad1tyaaaaa) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/aadityaaaaa) |
| **Raj Gupta** | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/aad1tyaaaaa) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rajprofile) |

---

## 📄 License
Educational use only. Pokémon characters are trademarks of Nintendo.

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYzeXo5Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3Z3B3JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vsykkDCZ5H02I/giphy.gif" width="150" />
  <br />
  Made with ❤️ for the Pokémon Community
</p>
