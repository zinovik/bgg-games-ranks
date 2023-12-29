# DEPRECATED!

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
  games: {
    rank: number;
    name: string;
    year: string;
    id: string;
  }[];
}
