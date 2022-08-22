import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { Game } from './Game';

const GAME_RANKS_X_PATH = `//td[@class='collection_rank']`;
const GAME_NAMES_YEARS_X_PATH = `//div[starts-with(@id,'results_objectname')]`;
const GAME_IDS_X_PATH = `//div[starts-with(@id,'results_objectname')]//a/@href`;

export const parsePage = (page: string): Game[] => {
  const dom = new DOMParser({
    errorHandler: {
      warning: () => null,
      error: () => null,
      fatalError: () => null,
    },
  }).parseFromString(page);

  // @ts-ignore
  const ranks = select(GAME_RANKS_X_PATH, dom).map((selectedValue) => selectedValue.textContent.trim());
  // @ts-ignore
  const namesYears = select(GAME_NAMES_YEARS_X_PATH, dom).map((selectedValue) => selectedValue.textContent.trim());

  const names: string[] = [];
  const years: string[] = [];

  namesYears.forEach((nameYear) => {
    const endOfNameIndex = nameYear.indexOf('\n');
    const startOfYearIndex = nameYear.indexOf('\t(');

    if (endOfNameIndex === -1 || startOfYearIndex === -1) {
      names.push(nameYear);
      years.push('');

      return;
    }

    const name = nameYear.substring(0, endOfNameIndex);
    const year = nameYear
      .substring(startOfYearIndex + 1)
      .replace('(', '')
      .replace(')', '');

    names.push(name);
    years.push(year);
  });

  const ids = select(GAME_IDS_X_PATH, dom).map(
    (selectedValue) =>
      // @ts-ignore
      selectedValue.textContent.trim().split('/')[2],
  );

  return ranks.map((rank, i) => ({
    rank: Number(rank),
    name: names[i],
    year: years[i],
    id: ids[i],
  }));
};
