/** 
  This file contains the type that we will be using in the rest of the application, most notably the Guest type.
  Represents a guest at the wedding.
  @param id - The unique identifier for the guest.
  @param name - The name of the guest.
  @param association - The association of the guest to the couple.
  @param family - Whether the guest is a family member.
  @param dietaryRestrictions - Any dietary restrictions the guest may have.
  @param bringingGuest - Whether the guest is bringing a guest.
  @param additionalGuestName - The name of the guest the guest is bringing.
  @param additionalGuestDietaryRestrictions - Any dietary restrictions the guest the guest is bringing may have.
*/

export interface Guest {
    id: string;
    name: string;
    association: 'James' | 'Molly';
    family: boolean;
    dietaryRestrictions?: string;
    bringingGuest?: boolean;
    additionalGuestName?: string;
    additionalGuestDietaryRestrictions?: string;
  }
  
  /**
   * This function adds a new guest to the list of guests.
   * @param guests - The list of guests.
   * @param newGuest - The new guest to add.
   * @returns - The updated list of guests.
   */
  export const addGuest = (guests: Guest[], newGuest: Guest): Guest[] => {
    if (!newGuest.name || !newGuest.dietaryRestrictions) {
      throw new Error('Guest must have a name and dietary restrictions');
    }
    return [...guests, newGuest];
  };
  /**
   * This function updates a guest in the list of guests.
   * @param guests - The list of guests.
   * @param updatedGuest - The updated guest.
   * @returns - The updated list of guests.
   */
  export const updateGuest = (guests: Guest[], updatedGuest: Guest): Guest[] => {
    if (!updatedGuest.id) {
      throw new Error('Guest must have an ID');
    }
    return guests.map(guest => guest.id === updatedGuest.id ? updatedGuest : guest);
  };
  
  /**
   * This function removes a guest from the list of guests.
   * @param guests - The list of guests.
   * @param guestId - The ID of the guest to remove.
   * @returns - The updated list of guests.
   */
  export const removeGuest = (guests: Guest[], guestId: string): Guest[] => {
    return guests.filter(guest => guest.id !== guestId);
  };
  
  /**
   * This function calculates the number of guests for each association.
   * @param guests - The list of guests.
   * @returns - The number of guests for each association.
   */
  export const calculateGuestSummary = (guests: Guest[]) => {
    const mollyGuests = guests.filter(guest => guest.association === 'Molly');
    const jamesGuests = guests.filter(guest => guest.association === 'James');
  
    /**
     * This function calculates the range of guests for a given list of guests.
     * @param guestList - The list of guests.
     * @returns - The range of guests.
     */
    const calculateRange = (guestList: Guest[]) => {
      const familyCount = guestList.filter(guest => guest.family).length;
      const minGuests = guestList.length + guestList.filter(guest => guest.bringingGuest === true).length;
      const maxGuests = guestList.length + guestList.filter(guest => guest.bringingGuest !== false).length;
      return { familyCount, minGuests, maxGuests };
    };
  
    return {
      molly: calculateRange(mollyGuests),
      james: calculateRange(jamesGuests),
    };
  };
  