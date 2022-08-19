import { IMock, Mock } from 'typemoq';

import { Main } from '../../../src/main/Main';
import { DataService } from '../../../src/data/DataService.interface';
import { ProcessService } from '../../../src/process/ProcessService.interface';

const CHANNEL_ID = '@testChannelId';

describe('Main', () => {
  let dataServiceMock: IMock<DataService>;

  let main: Main;

  beforeEach(() => {
    dataServiceMock = Mock.ofType<DataService>();

    const configuration = {
      channelId: CHANNEL_ID,
    };

    main = new Main(
      configuration,
      dataServiceMock.object,
    );
  });

  afterEach(() => {
    dataServiceMock.verifyAll();
  });

  it('Should process message', async () => {
    // Arrange

    // Act
    main.sendMessage();

    // Assert
    expect(true).toBeTruthy();
  });
});
