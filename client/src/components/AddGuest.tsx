import React, { useState } from 'react';
import { Guest } from '../Guest';

interface AddGuestProps {
  onAddGuest: (guest: Guest) => void;
  onBack: () => void;
}

const AddGuest: React.FC<AddGuestProps> = ({ onAddGuest, onBack }: AddGuestProps): JSX.Element => {
  const [name, setName] = useState('');
  const [association, setAssociation] = useState<'James' | 'Molly' | ''>('');
  const [family, setFamily] = useState(false);
  const [bringingGuest, setBringingGuest] = useState<boolean | undefined>(undefined);
  const [additionalGuestName, setAdditionalGuestName] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [additionalGuestDietaryRestrictions, setAdditionalGuestDietaryRestrictions] = useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (association === '') {
      alert('Please select an association');
      return;
    }

    if (bringingGuest === true) {
      if (additionalGuestName.trim() === '') {
        alert('Please enter the name of the additional guest.');
        return;
      }
      if (additionalGuestDietaryRestrictions.trim() === '') {
        alert('Please enter the dietary restrictions of the additional guest.');
        return;
      }
    }

    if (dietaryRestrictions.trim() === '') {
      alert('Please enter dietary restrictions.');
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      name,
      association,
      family,
      bringingGuest,
      additionalGuestName,
      dietaryRestrictions,
      additionalGuestDietaryRestrictions,
    };
    onAddGuest(newGuest);
    setName('');
    setAssociation('');
    setFamily(false);
    setBringingGuest(undefined);
    setAdditionalGuestName('');
    setDietaryRestrictions('');
    setAdditionalGuestDietaryRestrictions('');
  };

  return (
    <div>
      <h1>Add Guest</h1>
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
          <input type="text" value={dietaryRestrictions} onChange={e => setDietaryRestrictions(e.target.value)} required />
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
              <input type="text" value={additionalGuestName} onChange={e => setAdditionalGuestName(e.target.value)} required />
            </div>
            <div>
              <label>Additional Guest Dietary Restrictions:</label>
              <input type="text" value={additionalGuestDietaryRestrictions} onChange={e => setAdditionalGuestDietaryRestrictions(e.target.value)} required />
            </div>
          </>
        )}
        <div>
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit">Add Guest</button>
        </div>
      </form>
    </div>
  );
};

export default AddGuest;
