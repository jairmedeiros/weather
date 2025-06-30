import React, { useState, FormEvent } from 'react';

interface AddressFormProps {
  onAddressSubmit: (address: string) => void;
}

const AddressForm = ({ onAddressSubmit }: AddressFormProps) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddressSubmit(address);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
  };

  return (
    <div className="container-fluid mb-4" style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <h2 className="mb-4 h4">Enter an address to get the weather forecast</h2>
        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-bold">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter an address"
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={!address.trim()}
        >
          Get Forecast
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
