## Working locally

```bash
npm run start:dev
```

```bash
curl 'http://localhost:3000/api/get-games?amount=101'
```

Interface:

```typescript
interface BGGGamesRanksData {
  date: string;
  games: Game[];
}

interface Game {
  rank: number;
  name: string;
  year: string;
  id: string;
}
```

Static file (faster but a little bit outdated) can be find here: https://raw.githubusercontent.com/zinovik/bgg-games-ranks-data/main/bgg-games-ranks.json
