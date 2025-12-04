# 🎮 SOLLO - App Deployment & Quick Start

## ✅ Aktueller Status

- **Web-App**: lädt erfolgreich auf `http://localhost:8080`
- **API-Server**: startet erfolgreich (Apollo GraphQL + Prisma)
- **Docker-Services**: MySQL + Prisma Graph laufen
- **Login/Registration**: UI ist implementiert und mit GraphQL verbunden

---

## 🚀 Schnell Starten

### Option 1: Deployment-Skript (Empfohlen)
```bash
cd /workspaces/SOLLO-WORLD---RETRO-V1
bash start-app.sh
```

Dies startet:
- Web-Server (`webpack-dev-server`) auf Port **8080**
- API-Server (Apollo GraphQL) auf Port **8087**
- Docker-Container (MySQL, Prisma)

### Option 2: Manuell Starten
```bash
# Terminal 1: Docker
docker-compose up -d

# Terminal 2: Web-Server
npm run dev:web

# Terminal 3: API-Server
npm run lerna:dev:server
```

---

## 📱 URLs & Endpoints

| Service | URL | Status |
|---------|-----|--------|
| **Web-App** | `http://localhost:8080` | ✅ Lädt |
| **GraphQL Playground** | `http://localhost:8087/graphql` | ✅ Bereit |
| **MySQL** | `localhost:3306` | ✅ Läuft |
| **Prisma** | `http://localhost:4466` | ✅ Läuft |

### Codespaces Public URL
In GitHub Codespaces werden die Ports automatisch weitergeleitet:
- Öffnet die **Ports**-Ansicht in VS Code
- Klickt Port `8080` und wählt **"Open in Browser"**

---

## 🔧 Features

### ✨ Account-Erstellung
```graphql
mutation CreateUser {
  createUser(data: {
    email: "user@example.com"
    password: "secure123"
    sollos: {
      create: {
        username: "SolloPlayer"
        motto: "Willkommen bei SOLLO"
      }
    }
  }) {
    id
    email
    sollos { id username }
  }
}
```

### 🎨 UI
- Moderne Login/Registration-Seite
- Deutsche Lokalisation
- Responsive Design (Mobile & Desktop)
- Error-Handling mit Benutzer-Feedback

---

## 📊 Logs & Debugging

Nach dem Start des `start-app.sh`:

```bash
# Web-Server Logs
tail -f /tmp/web-server.log

# API-Server Logs
tail -f /tmp/api-server.log

# Docker Logs
docker-compose logs -f
```

---

## 🐛 Häufige Probleme & Lösungen

### "Port bereits in Benutzung"
```bash
# Alle App-Prozesse stoppen
pkill -f "webpack-dev-server|babel-watch|npm run dev"
```

### GraphQL antwortet nicht
1. Prüfe Docker-Container: `docker ps`
2. Prüfe API-Server-Logs: `tail -f /tmp/api-server.log`
3. Stelle sicher, dass MySQL läuft: `docker-compose ps`

### Webpack kompiliert nicht
```bash
# Node-Module neu installieren
npm install --legacy-peer-deps
npm run dev:web
```

---

## 📦 Tech-Stack

- **Frontend**: React 16.14, TypeScript, Webpack
- **Backend**: Node.js, Hapi, Apollo GraphQL
- **Database**: MySQL 5.7 + Prisma ORM
- **Build**: Babel (TypeScript-transpiling), Lerna (Monorepo)

---

## 🎯 Next Steps

1. ✅ **Accounts erstellen**: Über Login-UI (http://localhost:8080)
2. ⏳ **Game-Client**: UI mit Raum-Renderer verbinden
3. ⏳ **Multiplayer-Server**: Socket.IO für Echtzeit-Spieler-Updates
4. ⏳ **Möbel & Katalog**: Integration der Möbel-Assets

---

## 🚢 Production Deployment

Für Production:
```bash
# Build
npm run build

# Starte mit PM2 oder Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

---

**✨ Die App ist nun einsatzbereit für Entwicklung und Testing!**
