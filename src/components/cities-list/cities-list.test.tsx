import MemorizedCitiesList from './cities-list.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: MemorizedCitiesList', () => {
  it('should render correctly', () => {
    const preparedComponent = <MemorizedCitiesList />;

    render(preparedComponent);

    expect(screen.getByTestId('locations__list')).toBeInTheDocument();
  });
});
