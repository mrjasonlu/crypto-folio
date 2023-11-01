import React from 'react';
import { screen, render } from '@testing-library/react-native';
import List from '../List';
import { Text } from 'react-native';

describe('List', () => {
  test('should render list items', () => {
    const testItemContents = [
      {
        testAvatar: 'test avatar 1',
        testContent: 'test content 1',
        testSubContent: 'test sub content 1',
      },
      {
        testAvatar: 'test avatar 2',
        testContent: 'test content 2',
        testSubContent: 'test sub content 2',
      },
      {
        testAvatar: 'test avatar 3',
        testContent: 'test content 3',
        testSubContent: 'test sub content 3',
      },
    ];

    const testListItems = testItemContents.map(item => ({
      key: item.testContent,
      avatar: <Text>{item.testAvatar}</Text>,
      content: <Text>{item.testContent}</Text>,
      subContent: <Text>{item.testSubContent}</Text>,
    }));

    render(<List listItems={testListItems} />);

    testItemContents.forEach(item => {
      expect(screen.getByText(item.testAvatar)).toBeOnTheScreen();
      expect(screen.getByText(item.testContent)).toBeOnTheScreen();
      expect(screen.getByText(item.testSubContent)).toBeOnTheScreen();
    });
  });
});
