export const isRequired = () => ({
  isRequired: 'This field is required',
});

export const isMinLength = (length) => ({
  isMinLength: {
    message: `This field must at least be ${length} characters long`,
    length,
  },
});

export const isComparePassword = (fieldName) => ({
  isEqual: ({ fields }) => ({
    message: 'The passwords don’t match',
    value: fields[fieldName],
    validateIf: fields[fieldName].length > 0,
  }),
});

export const isRegexMatchPhoneNumber = () => ({
  isRegexMatch: ({ fields }) => ({
    message: 'The phone number invalid',
    value: fields.phone,
    regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  }),
});

export const isEmail = () => ({
  isEmail: 'Please enter a valid e-mail address',
});

export const isNumber = () => ({
  isNumber: 'You need to enter a number',
});
