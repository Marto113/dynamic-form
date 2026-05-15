import { describe, it, expect } from 'vitest';
import { checkVisibility } from '../../utils/checkVisibility';

describe('checkVisibility', () => {
  it('returns true when no visibility config is provided', () => {
    const result = checkVisibility({}, undefined);

    expect(result).toBe(true);
  });

  it('returns true when equals condition matches', () => {
    const values = {
      contactInfo: {
        country: 'Bulgaria',
      },
    };

    const result = checkVisibility(values, {
      dependsOn: 'contactInfo.country',
      equals: 'Bulgaria',
    });

    expect(result).toBe(true);
  });

  it('returns false when equals condition does not match', () => {
    const values = {
      contactInfo: {
        country: 'Germany',
      },
    };

    const result = checkVisibility(values, {
      dependsOn: 'contactInfo.country',
      equals: 'Bulgaria',
    });

    expect(result).toBe(false);
  });

  it('returns true when notEquals condition matches', () => {
    const values = {
      contactInfo: {
        country: 'Germany',
      },
    };

    const result = checkVisibility(values, {
      dependsOn: 'contactInfo.country',
      notEquals: 'Unknown',
    });

    expect(result).toBe(true);
  });

  it('returns false when notEquals condition fails', () => {
    const values = {
      contactInfo: {
        country: 'Unknown',
      },
    };

    const result = checkVisibility(values, {
      dependsOn: 'contactInfo.country',
      notEquals: 'Unknown',
    });

    expect(result).toBe(false);
  });
});