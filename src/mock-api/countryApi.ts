export const mockFetchCountry = async (phone: string) => {
  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1000)
  );

  if (phone.startsWith('+359')) {
    return {
      country: 'Bulgaria',
    };
  }

  if (phone.startsWith('+49')) {
    return {
      country: 'Germany',
    };
  }

  return {
    country: 'Unknown',
  };
};