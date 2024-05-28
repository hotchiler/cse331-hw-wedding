import React from 'react';
import { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
  onSelectGuest: (guest: Guest) => void;
}

const GuestList: React.FC<GuestListProps> = ({ guests, onSelectGuest }) => {
  const getSummary = () => {
    const mollyGuests = guests.filter(guest => guest.association === 'Molly');
    const jamesGuests = guests.filter(guest => guest.association === 'James');

    const calculateRange = (guests: Guest[]) => {
      let familyCount = 0;
      let minGuests = 0;
      let maxGuests = 0;

      guests.forEach(guest => {
        familyCount += guest.family ? 1 : 0;
        minGuests += 1;
        maxGuests += 1;

        if (guest.bringingGuest === true) {
          minGuests += 1;
          maxGuests += 1;
        } else if (guest.bringingGuest === undefined) {
          maxGuests += 1;
        }
      });

      return { familyCount, minGuests, maxGuests };
    };

    const mollyRange = calculateRange(mollyGuests);
    const jamesRange = calculateRange(jamesGuests);

    const formatRange = (min: number, max: number) => {
      return min === max ? `${min}` : `${min}-${max}`;
    };

    return (
      <div>
        <h2>Summary:</h2>
        <p>Molly's Guests: {formatRange(mollyRange.minGuests, mollyRange.maxGuests)} (Family: {mollyRange.familyCount})</p>
        <p>James's Guests: {formatRange(jamesRange.minGuests, jamesRange.maxGuests)} (Family: {jamesRange.familyCount})</p>
      </div>
    );
  };

  const getPlusOneStatus = (bringingGuest: boolean | undefined) => {
    if (bringingGuest === undefined) {
      return '+1?';
    }
    return bringingGuest ? '+1' : '0';
  };

  return (
    <div>
      <h1>Guest List</h1>
      <ul>
        {guests.map(guest => (
          <li key={guest.id}>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectGuest(guest); }} style={{ color: 'blue', textDecoration: 'underline' }}>
              {guest.name}
            </a> ({guest.association}) - {guest.family ? 'Family' : 'Friend'}
            <span> - {getPlusOneStatus(guest.bringingGuest)}</span>
          </li>
        ))}
      </ul>
      {getSummary()}
    </div>
  );
};

export default GuestList;
