// src/types.ts
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
  