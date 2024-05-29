import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { getGuests, addGuest, updateGuest, guests, Guest } from './routes';

describe('routes', function() {
  beforeEach(function() {
    // Reset guests before each test
    guests.length = 0; // Clear the array while preserving the reference
  });

  describe('getGuests', function() {
    // 0 recursive calls: Testing with an empty list of guests
    it('should return an empty list of guests initially', function() {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      getGuests(req, res);
      assert.deepStrictEqual(JSON.parse(res._getData()), []);
    });

    // 1 recursive call: Testing with a list containing one guest
    it('should return a list with one guest after adding a guest', function() {
      const guest: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      guests.push(guest);

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      getGuests(req, res);
      assert.deepStrictEqual(JSON.parse(res._getData()), [guest]);
    });

    // 2+ recursive calls: Testing with a list containing multiple guests
    it('should return a list with multiple guests after adding guests', function() {
      const guest1: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      const guest2: Guest = {
        id: '1',
        name: 'Alice Smith',
        association: 'Molly',
        family: false,
        dietaryRestrictions: 'Vegan',
        bringingGuest: false,
        additionalGuestName: '',
        additionalGuestDietaryRestrictions: '',
      };
      guests.push(guest1, guest2);

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      getGuests(req, res);
      assert.deepStrictEqual(JSON.parse(res._getData()), [guest1, guest2]);
    });
  });

  describe('addGuest', function() {
    // 0 recursive calls: Adding a new guest to an empty list
    it('should add a new guest successfully', function() {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/guests',
        body: {
          name: 'John Doe',
          association: 'James',
          family: true,
          dietaryRestrictions: 'None',
          bringingGuest: true,
          additionalGuestName: 'Jane Doe',
          additionalGuestDietaryRestrictions: 'Vegetarian',
        },
      });
      const res = httpMocks.createResponse();
      addGuest(req, res);

      assert.strictEqual(res.statusCode, 201);
      const newGuest = JSON.parse(res._getData());
      assert.strictEqual(newGuest.name, 'John Doe');
      assert.strictEqual(newGuest.association, 'James');
      assert.strictEqual(newGuest.family, true);
      assert.strictEqual(newGuest.dietaryRestrictions, 'None');
      assert.strictEqual(newGuest.bringingGuest, true);
      assert.strictEqual(newGuest.additionalGuestName, 'Jane Doe');
      assert.strictEqual(newGuest.additionalGuestDietaryRestrictions, 'Vegetarian');
    });

    // Error case: Missing required fields
    it('should return a 400 error if required fields are missing', function() {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/guests',
        body: {
          name: '',
          association: 'James',
          family: true,
        },
      });
      const res = httpMocks.createResponse();
      addGuest(req, res);

      assert.strictEqual(res.statusCode, 400);
      assert.strictEqual(res._getData(), 'Missing required fields');
    });

    // 1 recursive call: Adding a guest to a list with one guest
    it('should add a guest to a list with one guest', function() {
      const guest: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      guests.push(guest);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/guests',
        body: {
          name: 'Alice Smith',
          association: 'Molly',
          family: false,
          dietaryRestrictions: 'Vegan',
          bringingGuest: false,
          additionalGuestName: '',
          additionalGuestDietaryRestrictions: '',
        },
      });
      const res = httpMocks.createResponse();
      addGuest(req, res);

      assert.strictEqual(res.statusCode, 201);
      const newGuest = JSON.parse(res._getData());
      assert.strictEqual(newGuest.name, 'Alice Smith');
      assert.strictEqual(newGuest.association, 'Molly');
      assert.strictEqual(newGuest.family, false);
      assert.strictEqual(newGuest.dietaryRestrictions, 'Vegan');
      assert.strictEqual(newGuest.bringingGuest, false);
      assert.strictEqual(newGuest.additionalGuestName, '');
      assert.strictEqual(newGuest.additionalGuestDietaryRestrictions, '');
    });

    // 2+ recursive calls: Adding a guest to a list with multiple guests
    it('should add a guest to a list with multiple guests', function() {
      const guest1: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      const guest2: Guest = {
        id: '1',
        name: 'Alice Smith',
        association: 'Molly',
        family: false,
        dietaryRestrictions: 'Vegan',
        bringingGuest: false,
        additionalGuestName: '',
        additionalGuestDietaryRestrictions: '',
      };
      guests.push(guest1, guest2);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/guests',
        body: {
          name: 'Bob Brown',
          association: 'James',
          family: false,
          dietaryRestrictions: 'None',
          bringingGuest: undefined,
          additionalGuestName: '',
          additionalGuestDietaryRestrictions: '',
        },
      });
      const res = httpMocks.createResponse();
      addGuest(req, res);

      assert.strictEqual(res.statusCode, 201);
      const newGuest = JSON.parse(res._getData());
      assert.strictEqual(newGuest.name, 'Bob Brown');
      assert.strictEqual(newGuest.association, 'James');
      assert.strictEqual(newGuest.family, false);
      assert.strictEqual(newGuest.dietaryRestrictions, 'None');
      assert.strictEqual(newGuest.bringingGuest, undefined);
      assert.strictEqual(newGuest.additionalGuestName, '');
      assert.strictEqual(newGuest.additionalGuestDietaryRestrictions, '');
    });
  });

  describe('updateGuest', function() {
    // 1 recursive call: Updating an existing guest in a list with one guest
    it('should update an existing guest successfully', function() {
      const guest: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      guests.push(guest);

      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/guests/0',
        params: { id: '0' },
        body: {
          name: 'John Smith',
          association: 'James',
          family: true,
          dietaryRestrictions: 'Vegan',
          bringingGuest: true,
          additionalGuestName: 'Jane Smith',
          additionalGuestDietaryRestrictions: 'Vegan',
        },
      });
      const res = httpMocks.createResponse();
      updateGuest(req, res);

      assert.strictEqual(res.statusCode, 200);
      const updatedGuest = JSON.parse(res._getData());
      assert.strictEqual(updatedGuest.name, 'John Smith');
      assert.strictEqual(updatedGuest.dietaryRestrictions, 'Vegan');
      assert.strictEqual(updatedGuest.additionalGuestName, 'Jane Smith');
      assert.strictEqual(updatedGuest.additionalGuestDietaryRestrictions, 'Vegan');
    });

    // 2+ recursive calls: Updating an existing guest in a list with multiple guests
    it('should update an existing guest in a list with multiple guests', function() {
      const guest1: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      const guest2: Guest = {
        id: '1',
        name: 'Alice Smith',
        association: 'Molly',
        family: false,
        dietaryRestrictions: 'Vegan',
        bringingGuest: false,
        additionalGuestName: '',
        additionalGuestDietaryRestrictions: '',
      };
      guests.push(guest1, guest2);

      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/guests/1',
        params: { id: '1' },
        body: {
          name: 'Alice Johnson',
          association: 'Molly',
          family: false,
          dietaryRestrictions: 'Vegetarian',
          bringingGuest: false,
          additionalGuestName: '',
          additionalGuestDietaryRestrictions: '',
        },
      });
      const res = httpMocks.createResponse();
      updateGuest(req, res);

      assert.strictEqual(res.statusCode, 200);
      const updatedGuest = JSON.parse(res._getData());
      assert.strictEqual(updatedGuest.name, 'Alice Johnson');
      assert.strictEqual(updatedGuest.dietaryRestrictions, 'Vegetarian');
    });

    // Error case: Guest not found
    it('should return a 404 error if guest is not found', function() {
      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/guests/non-existing-id',
        params: { id: 'non-existing-id' },
        body: {
          name: 'John Smith',
          association: 'James',
          family: true,
        },
      });
      const res = httpMocks.createResponse();
      updateGuest(req, res);

      assert.strictEqual(res.statusCode, 404);
      assert.deepStrictEqual(JSON.parse(res._getData()), { error: 'Guest not found' });
    });

    // Error case: Invalid data format
    it('should return a 400 error if data format is invalid', function() {
      const guest: Guest = {
        id: '0',
        name: 'John Doe',
        association: 'James',
        family: true,
        dietaryRestrictions: 'None',
        bringingGuest: true,
        additionalGuestName: 'Jane Doe',
        additionalGuestDietaryRestrictions: 'Vegetarian',
      };
      guests.push(guest);

      const req = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/guests/0',
        params: { id: '0' },
        body: {
          name: '',
          association: 'James',
          family: true,
        },
      });
      const res = httpMocks.createResponse();
      updateGuest(req, res);

      assert.strictEqual(res.statusCode, 400);
      assert.strictEqual(res._getData(), 'Invalid data format');
    });
  });
});
