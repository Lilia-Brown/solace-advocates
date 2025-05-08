import { useState } from "react";
import { formatPhoneNumber } from "@/utils/format";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export default function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedSpecialties = isExpanded
    ? advocate.specialties
    : advocate.specialties.slice(0, 1);

  return (
    <div className="advocate-card">
      <div className="advocate-name">{`${advocate.firstName} ${advocate.lastName}`}</div>
      <div className="advocate-city">{advocate.city}</div>
      <a
        href={`tel:${advocate.phoneNumber}`}
        className="advocate-phone text-blue-600 hover:underline"
      >
        {formatPhoneNumber(advocate.phoneNumber.toString())}
      </a>
      <hr className="advocate-divider" />
      <div className="advocate-details">
        <div>
          <strong>Degree:</strong> {advocate.degree}
        </div>
        <div>
          {advocate.specialties.length === 0 ? (
            <div className="specialities-empty">None</div>
          ) : (
            <div>
              <div className="advocate-specialities">
                <div className="advocate-specialities-header">Specialties:</div>
                {advocate.specialties.length > 1 && (
                  <button
                    className="font-primary-semibold"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Less ^" : "More ⌵"}
                  </button>
                )}
              </div>
              <ul className="advocate-specialities-list">
                {displayedSpecialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <strong>Years of Experience:</strong> {advocate.yearsOfExperience}
        </div>
      </div>
    </div>
  );
}
