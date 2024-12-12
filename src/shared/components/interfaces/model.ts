export type Model = {
  name: string;
};

export type ModelList = Model[];

export const modelListBuilder = (): Model[] => {
  return [
    {
      name: 'test',
    },
    {
      name: 'lol',
    },
    {
      name: 'betha',
    },
    {
      name: 'better',
    },
  ];
};
