import fs from 'fs';
import { NowRequest, NowResponse } from '@now/node';
import { getGamesData } from '../src/get-games-data';

const LOCAL_FILE_DEFAULT_GAMES_AMOUNT = 2000;
const LOCAL_FILE_NAME = './public/bgg-games-ranks.json';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const {
    query: { amount, load },
  } = req;

  try {
    const games = await getGamesData(
      Number(amount) || LOCAL_FILE_DEFAULT_GAMES_AMOUNT,
      typeof load === 'string' && load !== 'false',
    );

    fs.writeFileSync(LOCAL_FILE_NAME, JSON.stringify(games));
    console.log('The file was successfully written');

    res.status(200).end();
  } catch (error) {
    console.error('Unexpected error occurred: ', error.message);
  }
};
