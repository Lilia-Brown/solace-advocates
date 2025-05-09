"use client";

import AdvocateCard from "@/components/AdvocateCard";
import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export default function Home() {
  const ROWS_PER_PAGE = 9;
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    specialties: "",
    yearsOfExperience: "",
    degree: "",
    city: "",
  });
  const [showFilters, setShowFilters] = useState(false); // Toggle for filters section

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = filteredAdvocates.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAdvocates.length / ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilters({
      specialties: "",
      yearsOfExperience: "",
      degree: "",
      city: "",
    });
  };

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    const filteredAdvocates = advocates.filter((advocate) => {
      const withoutCaseIncludes = (source: string, search: string): boolean => {
        return source.toLowerCase().includes(search.toLowerCase());
      };

      const matchesSearchTerm =
        !searchTerm ||
        withoutCaseIncludes(advocate.firstName, searchTerm) ||
        withoutCaseIncludes(advocate.lastName, searchTerm) ||
        withoutCaseIncludes(advocate.city, searchTerm) ||
        withoutCaseIncludes(advocate.degree, searchTerm) ||
        advocate.specialties.some((s) => withoutCaseIncludes(s, searchTerm)) ||
        withoutCaseIncludes(advocate.yearsOfExperience.toString(), searchTerm)

      const matchesSpecialties =
        !filters.specialties ||
        advocate.specialties.includes(filters.specialties);
      const matchesYearsOfExperience =
        !filters.yearsOfExperience ||
        advocate.yearsOfExperience.toString() === filters.yearsOfExperience;
      const matchesDegree =
        !filters.degree || advocate.degree === filters.degree;
      const matchesCity = !filters.city || advocate.city === filters.city;

      return (
        matchesSearchTerm &&
        matchesSpecialties &&
        matchesYearsOfExperience &&
        matchesDegree &&
        matchesCity
      );
    });

    setFilteredAdvocates(filteredAdvocates);
    setCurrentPage(1);
  }, [searchTerm, filters, advocates]);

  const getUniqueSortedValues = <T,>(array: T[], keyExtractor: (item: T) => string | string[]): string[] => {
    return Array.from(new Set(array.flatMap(keyExtractor))).sort((a, b) => a.localeCompare(b));
  };

  const uniqueSpecialties = getUniqueSortedValues(advocates, (advocate) => advocate.specialties);
  const uniqueYearsOfExperience = getUniqueSortedValues(advocates, (advocate) =>
    advocate.yearsOfExperience.toString()
  );
  const uniqueDegrees = getUniqueSortedValues(advocates, (advocate) => advocate.degree);
  const uniqueCities = getUniqueSortedValues(advocates, (advocate) => advocate.city);

  return (
    <main className="main">
      <h1 className="page-header">Solace Advocates</h1>

      {/* Search Section */}
      <div className="search-box">
        <h2 className="search-header">Search</h2>
        <p className="search-subheader">
          Searching for: <span>{searchTerm}</span>
        </p>
        <div className="search-box-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, city, degree, or specialties..."
            className="search-input"
          />
        </div>
      </div>

      {/* Toggle Filters and Reset Buttons */}
      <div className="button-section">
        <button
          onClick={handleReset}
          className="search-toggle-buttons"
        >
          Reset
        </button>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="search-toggle-buttons"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
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
                onChange={handleFilterChange}
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
                onChange={handleFilterChange}
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
                onChange={handleFilterChange}
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
                onChange={handleFilterChange}
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
      )}

      {/* Advocate Cards */}
      <div className="search-results">
        {currentRows.length === 0 ? (
          <p className="search-empty">No advocates found.</p>
        ) : (
          currentRows.map((advocate) => (
            <AdvocateCard
              key={`${advocate.firstName}-${advocate.lastName}`}
              advocate={advocate}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
