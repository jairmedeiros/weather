import { render, screen, fireEvent } from '@testing-library/react';
import AddressForm from '../AddressForm';

describe('AddressForm Component', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the form with input and button', () => {
    render(<AddressForm onAddressSubmit={mockSubmit} loading={false} />);
    
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Forecast/i })).toBeInTheDocument();
  });
  
  test('validates input and prevents submission for short addresses', () => {
    render(<AddressForm onAddressSubmit={mockSubmit} loading={false} />);
    
    const inputElement = screen.getByLabelText(/Address/i);
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    
    // Enter a short address
    fireEvent.change(inputElement, { target: { value: '123' } });
    fireEvent.click(buttonElement);
    
    // Expect validation error and no submission
    expect(screen.getByText(/Please enter a valid address/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('allows submission for valid addresses', () => {
    render(<AddressForm onAddressSubmit={mockSubmit} loading={false} />);
    
    const inputElement = screen.getByLabelText(/Address/i);
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    
    // Enter a valid address
    fireEvent.change(inputElement, { target: { value: '1600 Pennsylvania Ave, Washington DC' } });
    fireEvent.click(buttonElement);
    
    // Expect submission with correct value
    expect(mockSubmit).toHaveBeenCalledWith('1600 Pennsylvania Ave, Washington DC');
  });
  
  test('disables input and button when loading', () => {
    render(<AddressForm onAddressSubmit={mockSubmit} loading={true} />);
    
    const inputElement = screen.getByLabelText(/Address/i);
    const buttonElement = screen.getByRole('button', { name: /Loading/i });
    
    expect(inputElement).toBeDisabled();
    expect(buttonElement).toBeDisabled();
  });
});
