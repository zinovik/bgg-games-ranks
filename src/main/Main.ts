import { MainInterface } from './Main.interface';
import { Configuration } from './Configuration.interface';
import { DataService } from '../data/DataService.interface';

export class Main implements MainInterface {
  constructor(
    private readonly configuration: Configuration,
    private readonly dataService: DataService,
  ) {
    this.configuration = configuration;
    this.dataService = dataService;
  }

  async sendMessage(): Promise<void> {
    console.log(`New message`);

    const newData = await this.dataService.getData();

    console.log(`${message}\n${message.length}`);
  }
}
