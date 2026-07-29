import axios from "axios";
import { GoogleGenAI } from "@google/genai";

import { buildPrompt } from "./aiPrompt.js";
import { parseAIResponse } from "./aiParser.js";
import { validateAIResponse } from "./aiValidator.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-2.5-flash";

const MAX_RETRIES = 2;

const REQUEST_TIMEOUT = 30000;

/**
 * Downloads the Cloudinary image.
 */
async function downloadImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: REQUEST_TIMEOUT,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Unable to download image.\n${error.message}`);
  }
}
/**
 * Converts image buffer to Base64.
 */
function imageToBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

function detectMimeType(imageUrl) {
  const url = imageUrl.toLowerCase();

  if (url.endsWith(".png")) {
    return "image/png";
  }

  if (url.endsWith(".webp")) {
    return "image/webp";
  }

  if (url.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (url.endsWith(".jpg")) {
    return "image/jpeg";
  }

  return "image/jpeg";
}
function buildContents(base64Image, mimeType) {
  return [
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },

    {
      text: buildPrompt(),
    },
  ];
}
function logStep(step, value = "") {
  console.log(`🤖 AI | ${step}`, value);
}
function getResponseText(result) {
  if (!result) {
    throw new Error("Empty Gemini response.");
  }

  if (typeof result.text === "string") {
    return result.text;
  }

  if (typeof result.text === "function") {
    return result.text();
  }

  if (result.response?.text) {
    return result.response.text();
  }

  throw new Error("Unable to read Gemini response.");
}
async function generateContent(base64Image, mimeType) {
  logStep("Sending request to Gemini");

  const result = await ai.models.generateContent({
    model: MODEL,

    contents: buildContents(base64Image, mimeType),

    config: {
      temperature: 0.15,

      topP: 0.8,

      responseMimeType: "application/json",
    },
  });

  const text = getResponseText(result);

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
/**
 * Wait for the specified number of milliseconds.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Determines whether the request should be retried.
 */
function shouldRetry(error) {
  const message = error.message?.toLowerCase() || "";

  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("503") ||
    message.includes("500")
  );
}
/**
 * Parse Gemini response and validate against ClosetIQ taxonomy.
 */
function processResponse(text) {
  logStep("Parsing AI response");

  const parsed = parseAIResponse(text);

  console.log("RAW GEMINI RESPONSE");
  console.log(parsed);

  logStep("Validating AI response");

  return validateAIResponse(parsed);
}
/**
 * Generate, parse and validate with automatic retry.
 */
async function generateAnalysis(base64Image, mimeType) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      logStep(`Attempt ${attempt}`);

      const text = await generateContent(base64Image, mimeType);

      return processResponse(text);
    } catch (error) {
      lastError = error;

      console.error(`AI Attempt ${attempt} Failed`, error.message);

      if (attempt >= MAX_RETRIES) {
        break;
      }

      if (!shouldRetry(error)) {
        break;
      }

      const wait = attempt * 1500;

      logStep(`Retrying in ${wait} ms`);

      await delay(wait);
    }
  }

  throw lastError;
}

const DEFAULT_ANALYSIS = {
  name: "Unknown Item",

  category: null,
  subCategory: null,

  primaryColor: null,
  colors: [],

  material: null,

  fit: null,

  sleeveType: null,

  pattern: null,

  occasion: [],

  season: [],

  tags: {
    styles: [],
    colors: [],
    features: [],
  },

  description: "",

  confidence: {
    overall: 0,
    category: 0,
    subCategory: 0,
    color: 0,
    material: 0,
    fit: 0,
  },
};

export async function analyzeClothing(imageUrl) {
  const start = Date.now();

  logStep("Starting analysis");

  const imageBuffer = await downloadImage(imageUrl);

  const base64Image = imageToBase64(imageBuffer);

  const mimeType = detectMimeType(imageUrl);

  const analysis = await generateAnalysis(base64Image, mimeType);

  logStep(`Completed in ${Date.now() - start} ms`);

  return analysis;
}

export async function analyzeClothingSafe(imageUrl) {
  try {
    return await analyzeClothing(imageUrl);
  } catch (error) {
    console.error("AI ERROR");
    console.error(error);

    return DEFAULT_ANALYSIS;
  }
}