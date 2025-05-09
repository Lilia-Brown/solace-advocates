export default function SearchBox({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="search-box">
      <h2 className="search-header">Search</h2>
      <div className="search-box-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by name, city, degree, or specialties..."
          className="search-input"
        />
      </div>
    </div>
  );
}
