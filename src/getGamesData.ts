import { getPageGames, GAMES_PER_PAGE } from './getPageGames';
import { BGGGamesRanksData } from './BGGGamesRanksData';
// @ts-ignore
import bggGamesRanksFile from '../public/bgg-games-ranks.json';

export const getGamesData = async (amount: number, load: boolean): Promise<BGGGamesRanksData> => {
  if (!load && bggGamesRanksFile.games.length >= amount) {
    console.log('The games were returned from the local file');
    return bggGamesRanksFile;
  }

  const pagesAmount = Math.ceil(amount / GAMES_PER_PAGE);

  const gamesByPages = await Promise.all(new Array(pagesAmount).fill(null).map((_, i) => getPageGames(i + 1)));

  const games = gamesByPages.reduce((acc, pageGames) => [...acc, ...pageGames], []);

  console.log('The loaded games were returned');
  return {
    games: games.slice(0, amount),
    date: new Date().toISOString(),
  };
};
