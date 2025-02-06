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
- **UI Framework:** [Your UI framework]
- **State Management:** [Your state management solution]
- **API Integration:** [Your API solution]

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All contributors and reviewers
- Content partners and API providers

