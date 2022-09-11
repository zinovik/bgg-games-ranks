import { NowRequest, NowResponse } from '@now/node';
import { getGamesData } from '../src/get-games-data';

const DEFAULT_GAMES_AMOUNT = 100;

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const {
    query: { amount },
  } = req;

  console.log(`Request | amount: '${amount}'`);

  try {
    const games = await getGamesData(Number(amount) || DEFAULT_GAMES_AMOUNT);

    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('The games were returned');

    res.status(200).json(games);
  } catch (error) {
    console.error('Unexpected error occurred: ', error.message);
  }
};
