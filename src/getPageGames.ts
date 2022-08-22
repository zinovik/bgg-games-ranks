import axios from 'axios';
import { parsePage } from './parsePage';
import { Game } from './Game';

export const GAMES_PER_PAGE = 100;
const URL = 'https://boardgamegeek.com/browse/boardgame/page/';

export const getPageGames = async (pageNumber: number): Promise<Game[]> => {
  const { status, data: page } = await axios.get(`${URL}${pageNumber}`);
  console.log(`Page ${pageNumber}: ${status}`);

  return parsePage(page);
};
