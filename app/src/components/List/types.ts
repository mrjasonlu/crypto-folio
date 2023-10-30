export const DividerTypes = {
  full: 'full',
  inset: 'inset',
} as const;

export type Divider = keyof typeof DividerTypes;
