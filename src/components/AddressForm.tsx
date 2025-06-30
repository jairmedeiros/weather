import { useState, FormEvent } from 'react';

interface AddressFormProps {
  onAddressSubmit: (address: string) => void;
  loading: boolean;
}

const AddressForm = ({ onAddressSubmit, loading }: AddressFormProps) => {
  const [address, setAddress] = useState('');
  const [validation, setValidation] = useState<string | null>(null);

  const validateAddress = (input: string): boolean => {
    if (input.trim().length < 5) {
      setValidation('Please enter a valid address');
      return false;
    }
    
    setValidation(null);
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateAddress(address)) {
      onAddressSubmit(address);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    
    if (validation && newAddress.length > 0) {
      setValidation(null);
    }
  };

  return (
    <div className="container-fluid mb-4">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <h2 className="mb-4 h4">Enter an address to get the weather forecast</h2>
        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-bold">Address</label>
          <input
            type="text"
            className={`form-control ${validation ? 'is-invalid' : ''}`}
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter an address (e.g., 1600 Pennsylvania Ave, Washington DC)"
            required
            disabled={loading}
          />
          {validation && (
            <div id="address-error" className="invalid-feedback" role="alert">
              {validation}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={loading || !address.trim()}
        >
          {loading ? 'Loading...' : 'Get Forecast'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
