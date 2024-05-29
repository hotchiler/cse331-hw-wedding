import React from 'react';
import { Guest } from '../Guest';
import { calculateGuestSummary } from '../Guest';

// Define the props interface for GuestList component
interface GuestListProps {
  guests: Guest[]; // Array of Guest objects
  onSelectGuest: (guest: Guest) => void; // Callback function for selecting a guest
}

// GuestList component
const GuestList: React.FC<GuestListProps> = ({ guests, onSelectGuest }): JSX.Element => {
  const summary = calculateGuestSummary(guests); // Calculate guest summary

  // Function to get the plus one status
  const getPlusOneStatus = (bringingGuest: boolean | undefined): string => {
    if (bringingGuest === undefined) {
      return '+1?'; // Return '+1?' if bringingGuest is undefined
    }
    return bringingGuest ? '+1' : '0'; // Return '+1' if bringingGuest is true, '0' otherwise
  };

  return (
    <div>
      <h1>Guest List</h1>
      <ul>
        {guests.map(guest => (
          <li key={guest.id}>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectGuest(guest); }} style={{ color: 'blue', textDecoration: 'underline' }}>
              {guest.name}
            </a> | {guest.family ? 'Family' : 'Friend'} of {guest.association} 
            <span> | {getPlusOneStatus(guest.bringingGuest)}</span>
          </li>
        ))}
      </ul>
      <div>
        <h2>Summary:</h2>
        <p>Molly's Guests: {summary.molly.minGuests === summary.molly.maxGuests ? summary.molly.minGuests : `${summary.molly.minGuests}-${summary.molly.maxGuests}`} (Family: {summary.molly.familyCount})</p>
        <p>James's Guests: {summary.james.minGuests === summary.james.maxGuests ? summary.james.minGuests : `${summary.james.minGuests}-${summary.james.maxGuests}`} (Family: {summary.james.familyCount})</p>
      </div>
    </div>
  );
};

export default GuestList;