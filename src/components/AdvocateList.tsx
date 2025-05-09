import AdvocateCard from "@/components/AdvocateCard";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export default function AdvocateList({ advocates }: { advocates: Advocate[] }) {
  return (
    <div className="search-results">
      {advocates.length === 0 ? (
        <p className="search-empty">No advocates found.</p>
      ) : (
        advocates.map((advocate) => (
          <AdvocateCard
            key={`${advocate.firstName}-${advocate.lastName}`}
            advocate={advocate}
          />
        ))
      )}
    </div>
  );
}
