import React from 'react';
import { screen, render } from '@testing-library/react-native';
import Header from '../Header';

describe('Header', () => {
  test('should render the title', () => {
    const testTitle = 'test title';
    render(<Header showLogo title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeOnTheScreen();
  });
});
