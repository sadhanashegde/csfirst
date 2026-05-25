# GitHub Repository Insights Dashboard

A production-ready full-stack application for analyzing and visualizing GitHub repository metrics with beautiful, interactive dashboards.

![GitHub Repository Insights Dashboard](https://img.shields.io/badge/GitHub-Insights-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

## 🚀 Features

### Core Functionality
- **Repository Analysis**: Paste any public GitHub repository URL to get comprehensive analytics
- **Real-time Metrics**: Stars, forks, watchers, open issues, and more
- **Contributor Analytics**: Track top contributors with visual charts
- **Commit Activity**: Visualize commit patterns over time with area charts
- **Language Distribution**: Pie chart showing programming language breakdown
- **Health Score**: Calculated repository health indicator
- **Dark Mode**: Toggle between light and dark themes

### Advanced Features
- **Rate Limit Handling**: Automatic GitHub API rate limit management
- **Caching**: In-memory caching for improved performance
- **Responsive Design**: Mobile-friendly layout
- **Loading States**: Smooth loading animations and skeletons
- **Error Handling**: Graceful error messages for invalid repositories
- **URL Validation**: Real-time validation of GitHub repository URLs

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP client for GitHub API
- **Node-cache** - In-memory caching
- **Express-rate-limit** - API rate limiting

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy for production

## 📋 Prerequisites

- Docker and Docker Compose installed
- (Optional) GitHub Personal Access Token for higher rate limits

## 🏗️ Project Structure

```
github-insights-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-insights-dashboard
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your GitHub Personal Access Token (optional but recommended):
   ```
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   PORT=5000
   GITHUB_TOKEN=your_token_here
   NODE_ENV=development
   CACHE_TTL=300
   ```

4. **Run in development**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 📡 API Endpoints

### Repository Analysis
- **POST** `/api/repo`
  - Body: `{ "url": "https://github.com/owner/repo" }`
  - Returns: Complete repository statistics including metadata, contributors, languages, and commit activity

### Contributors
- **POST** `/api/contributors`
  - Body: `{ "url": "https://github.com/owner/repo" }`
  - Returns: List of contributors with their contribution counts

### Commits
- **POST** `/api/commits`
  - Body: `{ "url": "https://github.com/owner/repo", "perPage": 100 }`
  - Returns: Recent commits and commit activity data

### Languages
- **POST** `/api/languages`
  - Body: `{ "url": "https://github.com/owner/repo" }`
  - Returns: Language distribution with percentages

### Health Check
- **GET** `/health`
  - Returns: Server status

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | 5000 | No |
| `GITHUB_TOKEN` | GitHub Personal Access Token | - | No* |
| `NODE_ENV` | Environment mode | development | No |
| `CACHE_TTL` | Cache time-to-live in seconds | 300 | No |
| `VITE_API_URL` | Frontend API URL | http://localhost:5000 | No |

*Optional but recommended for higher rate limits (60 requests/hour without token, 5000 with token)

## 🎨 Usage

1. **Open the application** at http://localhost:3000
2. **Enter a GitHub repository URL** (e.g., https://github.com/facebook/react)
3. **Click "Analyze Repository"** to fetch and visualize the data
4. **Explore the dashboard** with various charts and metrics:
   - Repository health score
   - Star, fork, and issue counts
   - Contributor rankings
   - Commit activity trends
   - Language distribution
5. **Toggle dark mode** using the button in the top-right corner

## 📊 Dashboard Metrics

### Repository Information
- Repository name and description
- Owner information with avatar
- Creation and last update dates
- Repository size
- Primary programming language
- License information
- Topics/tags

### Statistics
- ⭐ Stars count
- 🍴 Forks count
- 👀 Watchers count
- ⚠️ Open issues count

### Health Score
Calculated based on:
- Stars (max 20 points)
- Forks (max 15 points)
- Open issues (inverse, max 15 points)
- Recent activity (max 20 points)
- Contributor count (max 20 points)
- Has description (max 10 points)

### Visualizations
- **Commit Activity Chart**: Area chart showing commit trends over weeks
- **Contributor Chart**: Bar chart displaying top contributors
- **Language Chart**: Pie chart showing language distribution
- **Contributor List**: Detailed list with avatars and contribution counts

## 🔒 Security Considerations

- Rate limiting implemented (100 requests per 15 minutes per IP)
- GitHub API rate limit handling with automatic retry
- Environment variables for sensitive data
- CORS configuration for cross-origin requests
- Input validation for repository URLs

## 🐛 Troubleshooting

### Docker Issues
- **Container won't start**: Check if ports 3000 and 5000 are available
- **Build fails**: Ensure Docker has sufficient memory and disk space
- **API errors**: Verify GitHub token is valid (if using one)

### Rate Limit Errors
- Without token: 60 requests/hour
- With token: 5000 requests/hour
- Wait for rate limit reset or add a GitHub token

### Common Errors
- **Repository not found**: Verify the URL is correct and repository is public
- **Invalid URL format**: Use format `https://github.com/owner/repo`
- **CORS errors**: Ensure backend is running and accessible

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- GitHub REST API for providing repository data
- Recharts for beautiful chart components
- Tailwind CSS for utility-first styling
- Lucide for modern icon set

## 📧 Contact

For questions or support, please open an issue on GitHub.



Built with ❤️ using React, TypeScript, and Docker and windsurf
