# Frontend Docker Development Setup

## Quick Start

### Development Mode (Hot Reload)
```bash
# Start development server
docker compose up frontend-dev

# Access: http://localhost:3000
```

### Preview Production Build
```bash
# Build and preview
docker compose up frontend-preview

```

## Development Features

- Hot reload enabled
- Volume mounting for live code changes
- Port forwarding (3000 for dev, 4173 for preview)
- Environment variables configured
- Node modules cached in container