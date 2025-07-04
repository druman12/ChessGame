# ♟️ ChessGame

**ChessGame** is a modern, full-stack multiplayer chess platform powered by React, Javascript, and Spring Boot. It offers seamless real-time gameplay, social interaction, and powerful user customization — designed for players of all levels.

---

## 🎮 Features


### 🕹️ Gameplay
- Real-time multiplayer chess via WebSockets
- Full rule support: check, checkmate
- Advanced move validation and hint system
- Special moves: castling, en passant, pawn promotion
- PGN move history and replay
- Time control with adjustable clocks
- Resign and draw support

### 👥 User Features
- Secure user authentication (JWT-based)
- Profiles with stats and match history
- Dynamic ELO rating system
- Add friends and invite to private games
- Unlockable themes and achievements

### 🌍 Social & Spectator Features
- In-game and private messaging
- Live game spectator mode
- Global leaderboards and tournament hosting
- Game sharing (PGN or visual replay)
- Forums and discussions (planned)

### ⚙️ Technical Highlights
- WebSocket-based real-time synchronization
- Responsive Tailwind CSS UI with dark/light themes
- Mobile-first and offline-ready design
- Fully secured REST & WebSocket API
- Modular, clean codebase for scalability

---

## 🧱 Tech Stack

### Frontend
- React 18 + javascript
- Vite
- Tailwind CSS
- Redux Toolkit (state management)
- React Router (routing)
- Axios (HTTP)

### Backend
- Spring Boot 3.2
- Java 17
- MongoDB + Spring Data MongoDB
- Spring Security + JWT
- WebSocket

---

## 🚀 Getting Started

### 🧩 Prerequisites
- Node.js v16+
- Java 17+
- MongoDB
- Maven
- Git

---

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd BackEnd
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## 🔧 Configuration

### Frontend
- Environment variables are configured in `.env` file
- Tailwind CSS configuration in `tailwind.config.js`


### Backend
- Application properties in `src/main/resources/application.properties`
- MongoDB connection settings
- JWT configuration
- WebSocket endpoints
- CORS and security setup


## 📁 Project Structure


### Backend
```
BackEnd/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── controllers/    # REST controllers
│   │   │   ├── models/         # Entities and DTOs
│   │   │   ├── services/       # Game & user logic
│   │   │   ├── repositories/   # MongoDB repositories
│   │   │   ├── websocket/      # WebSocket config & handlers
│   │   │   ├── security/       # JWT, auth config
│   │   │   └── config/         # App-wide configs
│   └── resources/
│       ├── application.properties
├── test/
└── pom.xml

```

## 🔐 Security

-Password hashing with BCrypt
-JWT-based authentication
-CORS and CSRF protection
-Secure WebSocket origin validation
-XSS and SQL injection mitigation
-Rate limiting and input validation



## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write unit tests for new features
- Update documentation as needed
- Use meaningful commit messages
- Keep pull requests focused and small

## 📧 Contact

For any questions or concerns, please open an issue in the repository.

## 🔄 Updates and Roadmap

### Planned Features
- AI opponent with adjustable difficulty
- Tournament system
- Advanced analytics
- Mobile app version
- Voice chat integration
- Custom game variants
- Training mode with puzzles
- Video streaming integration 
