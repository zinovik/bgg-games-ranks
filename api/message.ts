import { NowRequest, NowResponse } from '@now/node';

import { ConfigParameterNotDefinedError } from '../src/common/error/ConfigParameterNotDefinedError';
import { Main } from '../src/main/Main';
import { BGGService } from '../src/data/BGG.service';
import { RedisService } from '../src/database/Redis.service';
import { MessageService } from '../src/process/Message.service';
import { TelegramService } from '../src/messenger/Telegram.service';

export default async (_req: NowRequest, res: NowResponse): any => {
  const {
    query: { token, channelId, isDevMode },
  } = _req;

  console.log('New request');

  const configuration = {
    channelId: typeof channelId === 'string' ? channelId : process.env.CHANNEL_ID,
    isDevMode: typeof isDevMode === 'string' ? isDevMode === 'on' : process.env.IS_DEV_MODE === 'on',
  };

  const main = new Main(
    configuration,
    new BGGService(),
  );

  try {
    await main.sendMessage();
  } catch (error) {
    console.error('Unexpected error occurred: ', error.message);
  }

  res.status(200).send(
    JSON.stringify({
      result: 'success',
    }),
  );
};
