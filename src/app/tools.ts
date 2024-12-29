export const randomText = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export const randomDate = (): Date => {
  return new Date(2024, randomInt(12), randomInt(28));
};

export const randomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};
