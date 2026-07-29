// -----------------------------------------------------------------------------
// Converts a value into an array.
// Supports:
// - undefined/null -> []
// - string/object -> [value]
// - array -> array
// -----------------------------------------------------------------------------

export const toArray = (value) => {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};
