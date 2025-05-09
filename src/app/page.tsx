"use client";

import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import FiltersSection from "@/components/FiltersSection";
import AdvocateList from "@/components/AdvocateList";
import PaginationControls from "@/components/PaginationControls";

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
  const [showFilters, setShowFilters] = useState(false);

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
        withoutCaseIncludes(advocate.yearsOfExperience.toString(), searchTerm);

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

      <SearchBox searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className="button-section">
        <button onClick={handleReset} className="search-toggle-buttons">
          Reset
        </button>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="search-toggle-buttons"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <FiltersSection
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueSpecialties={uniqueSpecialties}
          uniqueYearsOfExperience={uniqueYearsOfExperience}
          uniqueDegrees={uniqueDegrees}
          uniqueCities={uniqueCities}
        />
      )}

      <AdvocateList advocates={currentRows} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </main>
  );
}
