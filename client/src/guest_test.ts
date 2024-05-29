import * as assert from 'assert';
import { addGuest, updateGuest, removeGuest, calculateGuestSummary } from './guest';
import { Guest } from './guest';

describe('Guest Util Functions', function() {
  const guest1: Guest = {
    id: '1',
    name: 'John Doe',
    association: 'James',
    family: true,
    bringingGuest: true,
    additionalGuestName: 'Jane Doe',
    dietaryRestrictions: 'None',
    additionalGuestDietaryRestrictions: 'Vegetarian',
  };

  const guest2: Guest = {
    id: '2',
    name: 'Alice Smith',
    association: 'Molly',
    family: false,
    bringingGuest: false,
    additionalGuestName: '',
    dietaryRestrictions: 'Vegan',
    additionalGuestDietaryRestrictions: '',
  };

  const guest3: Guest = {
    id: '3',
    name: 'Bob Brown',
    association: 'James',
    family: false,
    bringingGuest: undefined,
    additionalGuestName: '',
    dietaryRestrictions: 'None',
    additionalGuestDietaryRestrictions: '',
  };

  describe('addGuest', function() {
    // 0 recursive call: Adding to an empty list
    it('should add a guest to an empty list', function() {
      const guests: Guest[] = [];
      const updatedGuests = addGuest(guests, guest1);
      assert.deepStrictEqual(updatedGuests, [guest1]);
    });

    // 1 recursive call: Adding to a list with one guest
    it('should add a guest to a list with one guest', function() {
      const guests: Guest[] = [guest1];
      const updatedGuests = addGuest(guests, guest2);
      assert.deepStrictEqual(updatedGuests, [guest1, guest2]);
    });

    // 2+ recursive calls: Adding to a list with multiple guests
    it('should add a guest to a list with multiple guests', function() {
      const guests: Guest[] = [guest1, guest2];
      const updatedGuests = addGuest(guests, guest3);
      assert.deepStrictEqual(updatedGuests, [guest1, guest2, guest3]);
    });

    // Error case: Missing guest name
    it('should throw an error if guest does not have a name', function() {
      const guests: Guest[] = [];
        const invalidGuest: Guest = Object.assign({}, guest1, { name: '' });
        assert.throws(() => addGuest(guests, invalidGuest));

        // Error case: Missing dietary restrictions
        it('should throw an error if guest does not have dietary restrictions', function() {
            const guests: Guest[] = [];
            const invalidGuest: Guest = Object.assign({}, guest1, { dietaryRestrictions: '' });
            assert.throws(() => addGuest(guests, invalidGuest), 'Guest must have a name and dietary restrictions');
        });
    });

    describe('updateGuest', function() {
        // 1 recursive call: Updating a guest in a list with one guest
        it('should update an existing guest in a list with one guest', function() {
            const guests: Guest[] = [guest1];
            const updatedGuest: Guest = Object.assign({}, guest1, { name: 'John Smith' });
            const updatedGuests = updateGuest(guests, updatedGuest);
            assert.deepStrictEqual(updatedGuests, [updatedGuest]);
        });

        // 1 recursive call: Updating a guest in a list with one guest
        it('should update an existing guest in a list with multiple guests', function() {
            const guests: Guest[] = [guest1, guest2];
            const updatedGuest: Guest = Object.assign({}, guest1, { name: 'John Smith' });
            const updatedGuests = updateGuest(guests, updatedGuest);
            assert.deepStrictEqual(updatedGuests, [updatedGuest, guest2]);
        });

        // 2+ recursive calls: Attempting to update a non-existing guest in a list with multiple guests
        it('should not update any guest if ID does not match in a list with multiple guests', function() {
            const guests: Guest[] = [guest1, guest2];
            const nonExistingGuest: Guest = Object.assign({}, guest3, { id: 'non-existing-id' });
            const updatedGuests = updateGuest(guests, nonExistingGuest);
            assert.deepStrictEqual(updatedGuests, guests);
        });

        // Error case: Missing guest ID
        it('should throw an error if guest does not have an ID', function() {
            const guests: Guest[] = [guest1];
            const invalidGuest: Guest = Object.assign({}, guest1, { id: '' });
            assert.throws(() => updateGuest(guests, invalidGuest));
        });
    });

  describe('removeGuest', function() {
    // 1 recursive call: Removing a guest from a list with one guest
    it('should remove a guest from a list with one guest', function() {
      const guests: Guest[] = [guest1];
      const updatedGuests = removeGuest(guests, guest1.id);
      assert.deepStrictEqual(updatedGuests, []);
    });

    // 1 recursive call: Removing a guest from a list with multiple guests
    it('should remove a guest from a list with multiple guests', function() {
      const guests: Guest[] = [guest1, guest2];
      const updatedGuests = removeGuest(guests, guest1.id);
      assert.deepStrictEqual(updatedGuests, [guest2]);
    });

    // 2+ recursive calls: Attempting to remove a non-existing guest from a list with multiple guests
    it('should not remove any guest if ID does not match in a list with multiple guests', function() {
      const guests: Guest[] = [guest1, guest2];
      const updatedGuests = removeGuest(guests, 'non-existing-id');
      assert.deepStrictEqual(updatedGuests, guests);
    });
  });

  describe('calculateGuestSummary', function() {
    // 0 recursive call: Summary for an empty list
    it('should return the correct summary for an empty list', function() {
      const guests: Guest[] = [];
      const summary = calculateGuestSummary(guests);
      assert.deepStrictEqual(summary, {
        molly: { familyCount: 0, minGuests: 0, maxGuests: 0 },
        james: { familyCount: 0, minGuests: 0, maxGuests: 0 },
      });
    });

    // 1 recursive call: Summary for a list with one guest
    it('should return the correct summary for a list with one guest', function() {
      const guests: Guest[] = [guest1];
      const summary = calculateGuestSummary(guests);
      assert.deepStrictEqual(summary, {
        molly: { familyCount: 0, minGuests: 0, maxGuests: 0 },
        james: { familyCount: 1, minGuests: 2, maxGuests: 2 },
      });
    });

    // 2+ recursive calls: Summary for a list with multiple guests
    it('should return the correct summary for a list with multiple guests', function() {
      const guests: Guest[] = [guest1, guest2, guest3];
      const summary = calculateGuestSummary(guests);
      assert.deepStrictEqual(summary, {
        molly: { familyCount: 0, minGuests: 1, maxGuests: 1 },
        james: { familyCount: 1, minGuests: 3, maxGuests: 4 },
      });
    });
  });
});
});