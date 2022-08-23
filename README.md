## Working locally

```bash
npm run start:dev
```

```bash
curl 'http://localhost:3000/api/get-games?amount=99&load'
```

```bash
npm run update
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
