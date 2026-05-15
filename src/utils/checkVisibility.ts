import get from 'lodash/get';
import type { VisibilityConfig } from '../types/form.types';

export const checkVisibility = (
  values: unknown,
  visibility?: VisibilityConfig
) => {
  if (!visibility) {
    return true;
  }

  const dependencyValue = get(
    values,
    visibility.dependsOn
  );

  if (visibility.equals !== undefined) {
    return dependencyValue === visibility.equals;
  }

  if (visibility.notEquals !== undefined) {
    return dependencyValue !== visibility.notEquals;
  }

  return true;
};