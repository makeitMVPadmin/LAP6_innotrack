# 🎯 InnoTrack

InnoTrack is a collaborative platform designed to help new tech graduates and career-transitioners stay updated with curated, high-quality industry content. By providing personalized content feeds, goal tracking, and bookmarking features, InnoTrack makes professional development more manageable and engaging.

## 🌟 Key Features

- **Curated Content Feed**: Daily updates of 5-7 high-quality industry articles across key tech areas
- **Personalized Experience**: Interest-based content tailoring
- **Bookmarking System**: Save and organize valuable content
- **Goal Setting**: Personalized professional development tracking
- **Tech Category Focus**: Coverage across Software Development, Data Science, AI, and more

## 🎯 Target Users

- Recent tech graduates
- Career-transitioners moving into tech
- Early career tech professionals
- Aspiring developers and tech enthusiasts

## 🏗️ Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Package Manager:** npm
- **UI Framework:** ShadCN UI, Tailwind
- **API Integration:** Firebase

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

### Installation

1. **Clone the repository:**
   ```sh
   git clone git@github.com:makeitMVPadmin/LAP6_innotrack.git
   ```

2. **Navigate to project directory:**
   ```sh
   cd LAP6_innotrack
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Set up environment variables:**
   ```sh
   cp .env.example .env
   ```
   Configure the `.env` file with your settings

5. **Start development server:**
   ```sh
   npm run dev
   ```
   Access the application at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
LAP6_innotrack/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   ├── functions/      # Useful functions
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── utils/        # Utility functions
│   └── App.jsx       # Root component
├── public/           # Public static files
└── config/          # Configuration files
```

## 👥 Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Creating a New Feature

1. **Start from develop branch:**
   ```sh
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit:**
   ```sh
   git add .
   git commit -m "feat: your descriptive message"
   ```

3. **Push and create PR:**
   ```sh
   git push origin feature/your-feature-name
   ```
   Create a Pull Request targeting the `develop` branch

### Best Practices

- Follow atomic commit patterns
- Use conventional commit messages
- Write tests for new features
- Update documentation as needed
- Request code reviews early

## 🔐 Environment Variables

```env
VITE_API_URL=your_api_url
VITE_AUTH_DOMAIN=your_auth_domain
VITE_CONTENT_API=your_content_api
```

## 🤝 Contributors

### Designers
- <a href="https://www.linkedin.com/in/mjsotillo/">Maria Jose Sotillo</a>
- <a href="https://www.linkedin.com/in/nicuxdesigner/">Nicole Calvo</a>
  
### Developers
- <a href="https://www.linkedin.com/in/darylwanji/">Daryl Wanji</a>
- <a href="https://www.linkedin.com/in/dbslapitan/">Dirk Brandon Lapitan</a>
- <a href="https://www.linkedin.com/in/nyajal-wal/">Nyajal Wal</a>
- <a href="https://www.linkedin.com/in/placidakat/">Placid Akat</a>
- <a href="https://www.linkedin.com/in/elizabethmerylsnyder/">Elizabeth Snyder</a>
- <a href="https://www.linkedin.com/in/huanli1008/">Huan Li</a>
  
### Project Manager
- <a href="https://www.linkedin.com/in/timothy-wallace-dev/">Tim Wallace</a>
  
### Team Lead
- <a href="https://www.linkedin.com/in/hilarykhc/">Hilary Chen</a>

## 📸 Screenshots 
![FireShot Capture 021 - Innotrack -  innotrack web app](https://github.com/user-attachments/assets/267f85ce-e181-483c-99e0-7f68fb2880bd)
![FireShot Capture 022 - Innotrack -  innotrack web app](https://github.com/user-attachments/assets/569ccbfc-a806-42e2-8bf8-261a6c11ba5f)


## 🙏 Acknowledgments

- All contributors and reviewers
- Content partners and API providers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

