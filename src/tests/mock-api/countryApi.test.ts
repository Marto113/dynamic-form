import { describe, it, expect } from 'vitest';
import { mockFetchCountry } from '../../mock-api/countryApi';

describe('mockFetchCountry', () => {
  it('returns Bulgaria for +359 prefix', async () => {
    const result = await mockFetchCountry('+359888999');

    expect(result).toEqual({
      country: 'Bulgaria',
    });
  });

  it('returns Germany for +49 prefix', async () => {
    const result = await mockFetchCountry('+49123456');

    expect(result).toEqual({
      country: 'Germany',
    });
  });

  it('returns Unknown for unsupported prefixes', async () => {
    const result = await mockFetchCountry('+111222333');

    expect(result).toEqual({
      country: 'Unknown',
    });
  });
});