// -----------------------------------------------------------------------------
// Candidate Validation
//
// Ensures generated outfit candidates are structurally valid before scoring.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Required item fields
// -----------------------------------------------------------------------------

const REQUIRED_ITEM_FIELDS = [
  "_id",
  "category",
  "color",
  "material",
  "season",
  "occasion",
  "tags",
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const hasRequiredFields = (item) =>
  REQUIRED_ITEM_FIELDS.every(
    (field) => item[field] !== undefined && item[field] !== null,
  );

const hasValidOccasions = (value) => Array.isArray(value) && value.length > 0;

const hasValidTags = (tags) => {
  if (!tags || typeof tags !== "object") {
    return false;
  }

  return (
    Array.isArray(tags.styles) ||
    Array.isArray(tags.colors) ||
    Array.isArray(tags.features)
  );
};

const isArchived = (item) => item?.status === "archived";

// -----------------------------------------------------------------------------
// Candidate Validation
// -----------------------------------------------------------------------------

export const validateCandidate = (candidate) => {
  if (!candidate) {
    return false;
  }

  const { top, bottom, shoes, accessory } = candidate.items;

  // ---------------------------------------------------------------------------
  // Essentials
  // ---------------------------------------------------------------------------

  if (!top || !bottom || !shoes) {
    return false;
  }

  // ---------------------------------------------------------------------------
  // Archived items
  // ---------------------------------------------------------------------------

  if (
    isArchived(top) ||
    isArchived(bottom) ||
    isArchived(shoes) ||
    (accessory && isArchived(accessory))
  ) {
    return false;
  }

  // ---------------------------------------------------------------------------
  // Required fields
  // ---------------------------------------------------------------------------

  if (
    !hasRequiredFields(top) ||
    !hasRequiredFields(bottom) ||
    !hasRequiredFields(shoes)
  ) {
    return false;
  }

  // ---------------------------------------------------------------------------
  // Required arrays
  // ---------------------------------------------------------------------------

 if (
   !hasValidOccasions(top.occasion) ||
   !hasValidOccasions(bottom.occasion) ||
   !hasValidOccasions(shoes.occasion)
 ) {
   return false;
 }

 if (
   !hasValidTags(top.tags) ||
   !hasValidTags(bottom.tags) ||
   !hasValidTags(shoes.tags)
 ) {
   return false;
 }

  // ---------------------------------------------------------------------------
  // Duplicate items
  // ---------------------------------------------------------------------------

  const ids = [top._id, bottom._id, shoes._id, accessory?._id].filter(Boolean);

  if (new Set(ids).size !== ids.length) {
    return false;
  }

  return true;
};
