import AddressForm from "./components/AddressForm";

const App = () => {
  const handleAddressSubmit = async (address: string) => {
    console.log("Address submitted:", address);
  };


  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white p-4 text-center shadow-sm">
        <h1 className="m-0 fw-bold">Weather Forecast App</h1>
      </header>

      <main className="flex-grow-1 p-4 d-flex flex-column gap-4">
        <AddressForm onAddressSubmit={handleAddressSubmit} />
      </main>
    </div>
  );
}

export default App;
