import React, { useState } from 'react';
import { Guest } from '../types';

interface GuestDetailsProps {
  guest: Guest;
  onUpdateGuest: (guest: Guest) => void;
  onBack: () => void; // Add a prop for the back button handler
}

const GuestDetails: React.FC<GuestDetailsProps> = ({ guest, onUpdateGuest, onBack }) => {
  const [name, setName] = useState(guest.name);
  const [association, setAssociation] = useState(guest.association);
  const [family, setFamily] = useState(guest.family);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(guest.dietaryRestrictions || '');
  const [bringingGuest, setBringingGuest] = useState<boolean | undefined>(guest.bringingGuest);
  const [additionalGuestName, setAdditionalGuestName] = useState(guest.additionalGuestName || '');
  const [additionalGuestDietaryRestrictions, setAdditionalGuestDietaryRestrictions] = useState(guest.additionalGuestDietaryRestrictions || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedGuest: Guest = {
      ...guest,
      name,
      association,
      family,
      dietaryRestrictions,
      bringingGuest,
      additionalGuestName,
      additionalGuestDietaryRestrictions,
    };
    onUpdateGuest(updatedGuest);
  };

  return (
    <div>
      <h1>Guest Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Association:</label>
          <div>
            <label>
              <input
                type="radio"
                value="James"
                checked={association === 'James'}
                onChange={() => setAssociation('James')}
              />
              James
            </label>
            <label>
              <input
                type="radio"
                value="Molly"
                checked={association === 'Molly'}
                onChange={() => setAssociation('Molly')}
              />
              Molly
            </label>
          </div>
        </div>
        <div>
          <label>Family:</label>
          <input type="checkbox" checked={family} onChange={e => setFamily(e.target.checked)} />
        </div>
        <div>
          <label>Dietary Restrictions:</label>
          <input type="text" value={dietaryRestrictions} onChange={e => setDietaryRestrictions(e.target.value)} />
        </div>
        <div>
          <label>Bringing a Guest:</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={bringingGuest === true}
                onChange={() => setBringingGuest(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={bringingGuest === false}
                onChange={() => setBringingGuest(false)}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                value="unsure"
                checked={bringingGuest === undefined}
                onChange={() => setBringingGuest(undefined)}
              />
              Unsure
            </label>
          </div>
        </div>
        {bringingGuest === true && (
          <>
            <div>
              <label>Additional Guest Name:</label>
              <input type="text" value={additionalGuestName} onChange={e => setAdditionalGuestName(e.target.value)} />
            </div>
            <div>
              <label>Additional Guest Dietary Restrictions:</label>
              <input type="text" value={additionalGuestDietaryRestrictions} onChange={e => setAdditionalGuestDietaryRestrictions(e.target.value)} />
            </div>
          </>
        )}
        <div>
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit">Update Guest</button>
        </div>
      </form>
    </div>
  );
};

export default GuestDetails;
