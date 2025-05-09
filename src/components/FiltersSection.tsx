export default function FiltersSection({
  filters,
  onFilterChange,
  uniqueSpecialties,
  uniqueYearsOfExperience,
  uniqueDegrees,
  uniqueCities,
}: {
  filters: { specialties: string; yearsOfExperience: string; degree: string; city: string };
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  uniqueSpecialties: string[];
  uniqueYearsOfExperience: string[];
  uniqueDegrees: string[];
  uniqueCities: string[];
}) {
  return (
    <div className="filters-section">
          <h2 className="filters-header">Filters</h2>
          <div className="filters-container">
            <div>
              <label className="filter-title">
                Specialties
              </label>
              <select
                name="specialties"
                value={filters.specialties}
                onChange={onFilterChange}
                className="filter-select"
              >
                <option value="">All Specialties</option>
                {uniqueSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="filter-title">
                Years of Experience
              </label>
              <select
                name="yearsOfExperience"
                value={filters.yearsOfExperience}
                onChange={onFilterChange}
                className="filter-select"
              >
                <option value="">All Years</option>
                {uniqueYearsOfExperience.map((years) => (
                  <option key={years} value={years}>
                    {years}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="filter-title">
                Degree
              </label>
              <select
                name="degree"
                value={filters.degree}
                onChange={onFilterChange}
                className="filter-select"
              >
                <option value="">All Degrees</option>
                {uniqueDegrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="filter-title">
                City
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={onFilterChange}
                className="filter-select"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
  );
}
