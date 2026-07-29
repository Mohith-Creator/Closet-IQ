/**
 * -----------------------------------------------------------------------------
 * ClosetIQ AI Parser
 * -----------------------------------------------------------------------------
 * Safely extracts JSON from Gemini responses.
 *
 * Handles:
 * - ```json ... ```
 * - Extra text before/after JSON
 * - Trailing commas
 * - Smart quotes
 * - Invalid control characters
 * -----------------------------------------------------------------------------
 */

/**
 * Extract the JSON object from any Gemini response.
 */
function extractJSONObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in Gemini response.");
  }

  return text.substring(start, end + 1);
}

/**
 * Clean common formatting issues.
 */
function sanitizeJSON(jsonString) {
  return (
    jsonString
      // Remove markdown
      .replace(/```json/gi, "")
      .replace(/```/g, "")

      // Smart quotes
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")

      // Remove trailing commas
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")

      // Remove invisible characters
      .replace(/[\u0000-\u001F]+/g, "")

      .trim()
  );
}

/**
 * Attempt to parse JSON.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      `Failed to parse AI JSON.\n${error.message}\n\n${jsonString}`,
    );
  }
}

/**
 * Validate root type.
 */
function validateRoot(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("AI response must be a JSON object.");
  }

  return data;
}

/**
 * Main parser.
 */
export function parseAIResponse(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Gemini returned an empty response.");
  }

  const extracted = extractJSONObject(text);

  const sanitized = sanitizeJSON(extracted);

  const parsed = parseJSON(sanitized);

  return validateRoot(parsed);
}
