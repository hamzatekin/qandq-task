import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';
import { SearchInput } from '.';

jest.useFakeTimers();

describe('SearchInput', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should render the SearchInput component', () => {
    const fn = jest.fn();
    render(<SearchInput onItemChanged={fn} />);

    const element = screen.getByTestId('search-input');

    expect(element).toBeInTheDocument();
  });
});
