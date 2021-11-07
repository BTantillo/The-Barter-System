const inputCheck = require('../utils/inputCheck');

test('inputCheck() returns null when all properties exist', () => {
  const obj = {name: 'Fred'};

  expect(inputCheck(obj, 'name')).toBe(null);
});

test('inputCheck() returns an object when a property is missing', () => {
  const obj = {name: 'Fred', location: ''};

  expect(inputCheck(obj, 'name', 'location')).toEqual(
    expect.objectContaining({
      error: expect.stringContaining('No location specified')
    })
  );
});