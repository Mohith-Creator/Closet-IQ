// -----------------------------------------------------------------------------
// Wardrobe Constants
// Single source of truth for ClosetIQ wardrobe metadata.
// -----------------------------------------------------------------------------

// =============================================================================
// Categories
// =============================================================================

export const CATEGORIES = [
  "Tops",
  "Bottoms",
  "Shoes",
  "Accessories",
  "Outerwear",
];

// =============================================================================
// Sub Categories
// =============================================================================

export const SUB_CATEGORIES = {
  Tops: [
    "Shirts",
    "T-Shirts",
    "Polos",
    "Hoodies",
    "Sweatshirts",
    "Sweaters",
    "Kurtas",
  ],

  Bottoms: [
    "Jeans",
    "Trousers",
    "Chinos",
    "Shorts",
    "Joggers",
    "Track Pants",
    "Cargo Pants",
  ],

  Shoes: [
    "Sneakers",
    "Running Shoes",
    "Boots",
    "Loafers",
    "Formal Shoes",
    "Sandals",
    "Slippers",
  ],

  Accessories: [
    "Watch",
    "Cap",
    "Hat",
    "Belt",
    "Tie",
    "Wallet",
    "Backpack",
    "Bag",
    "Sunglasses",
    "Bracelet",
    "Necklace",
    "Ring",
  ],

  Outerwear: ["Jackets", "Blazers", "Coats"],
};

// =============================================================================
// Colors
// =============================================================================

export const COLORS = [
  "Black",
  "White",
  "Grey",
  "Blue",
  "Navy",
  "Brown",
  "Beige",
  "Cream",
  "Green",
  "Olive",
  "Khaki",
  "Red",
  "Maroon",
  "Pink",
  "Yellow",
  "Orange",
  "Purple",
];

// =============================================================================
// Materials
// =============================================================================

export const MATERIALS = {
  // Tops
  Shirts: ["Cotton", "Linen", "Polyester", "Rayon", "Silk", "Flannel", "Denim"],

  "T-Shirts": ["Cotton", "Polyester", "Rayon", "Linen"],

  Polos: ["Cotton", "Polyester", "Cotton Blend"],

  Hoodies: ["Cotton", "Fleece", "Polyester"],

  // Bottoms
  Jeans: ["Denim", "Cotton", "Stretch Denim"],

  Trousers: ["Cotton", "Polyester", "Wool", "Linen"],

  // Shoes
  Sneakers: ["Leather", "Canvas", "Mesh", "Knit", "Synthetic", "Suede"],

  "Running Shoes": ["Mesh", "Synthetic", "Knit"],

  Boots: ["Leather", "Suede", "Rubber"],

  "Formal Shoes": ["Leather", "Patent Leather", "Suede"],

  // Accessories
  Watch: [
    "Stainless Steel",
    "Titanium",
    "Ceramic",
    "Leather",
    "Rubber",
    "Silicone",
    "Nylon",
  ],

  Belt: ["Leather", "Canvas", "Fabric"],

  Wallet: ["Leather", "Canvas", "Synthetic Leather"],

  Backpack: ["Canvas", "Nylon", "Polyester", "Leather"],

  Bag: ["Leather", "Canvas", "Nylon"],

  Cap: ["Cotton", "Polyester", "Wool"],

  Hat: ["Straw", "Cotton", "Wool"],

  Tie: ["Silk", "Polyester", "Cotton"],

  Sunglasses: ["Plastic", "Metal", "Acetate", "Titanium"],

  Bracelet: ["Stainless Steel", "Leather", "Silver", "Gold", "Beads"],

  Necklace: ["Gold", "Silver", "Stainless Steel"],

  Ring: ["Gold", "Silver", "Titanium", "Stainless Steel"],

  // Outerwear
  Jackets: ["Leather", "Denim", "Polyester", "Cotton"],

  Blazers: ["Wool", "Cotton", "Linen", "Polyester"],

  Coats: ["Wool", "Cashmere", "Polyester"],
};

// =============================================================================
// Occasions
// Multiple occasions can be assigned to one item.
// =============================================================================

export const OCCASIONS = {
  // Tops
  Shirts: ["Casual", "Office", "Date", "Party", "Travel"],

  "T-Shirts": ["Casual", "Date", "Travel", "Gym", "Sports", "Outdoor"],

  Polos: ["Casual", "Office", "Date", "Travel"],

  Hoodies: ["Casual", "Date", "Travel", "Gym", "Outdoor"],

  Sweatshirts: ["Casual", "Date", "Travel", "Outdoor"],

  Sweaters: ["Casual", "Office", "Date", "Travel"],

  Kurtas: ["Casual", "Festive", "Wedding"],

  // Bottoms
  Jeans: ["Casual", "Date", "Travel", "Outdoor", "Party"],

  Trousers: ["Office", "Date", "Party"],

  Chinos: ["Casual", "Office", "Date", "Travel"],

  Shorts: ["Casual", "Beach", "Travel", "Gym"],

  Joggers: ["Casual", "Gym", "Sports", "Travel"],

  "Track Pants": ["Casual", "Gym", "Sports"],

  "Cargo Pants": ["Casual", "Travel", "Outdoor"],

  // Shoes
  Sneakers: ["Casual", "Date", "Travel", "Gym", "Sports"],

  "Running Shoes": ["Gym", "Sports", "Outdoor"],

  Boots: ["Casual", "Date", "Travel", "Outdoor"],

  Loafers: ["Office", "Date", "Party"],

  "Formal Shoes": ["Office", "Date", "Wedding"],

  Sandals: ["Casual", "Beach", "Travel"],

  Slippers: ["Casual"],

  // Accessories
  Watch: ["Office", "Date"],

  Cap: ["Casual", "Sports", "Travel"],

  Hat: ["Casual", "Beach", "Travel"],

  Belt: ["Office", "Date"],

  Tie: ["Office", "Date", "Wedding"],

  Wallet: ["Casual", "Date"],

  Backpack: ["Office", "Travel"],

  Bag: ["Office", "Date", "Travel"],

  Sunglasses: ["Casual", "Date", "Travel", "Beach"],

  Bracelet: ["Casual", "Date", "Party"],

  Necklace: ["Casual", "Date", "Party", "Wedding"],

  Ring: ["Date", "Wedding"],

  // Outerwear
  Jackets: ["Casual", "Date", "Travel", "Outdoor"],

  Blazers: ["Office", "Date", "Wedding"],

  Coats: ["Date", "Travel"],
};

// =============================================================================
// Outfit Occasions
// Used while creating/saving outfits
// =============================================================================

export const OUTFIT_OCCASIONS = [
  "Casual",
  "Office",
  "Party",
  "Date",
  "Travel",
  "Wedding",
  "Gym",
];

export const HOME_OCCASIONS = ["Casual", "Office", "Gym", "Date", "Party"];

// =============================================================================
// Seasons
// =============================================================================

export const SEASONS = ["Summer", "Winter", "Rainy", "All Season"];

// =============================================================================
// Fits
// Based on Sub Category
// =============================================================================

export const FIT_TYPES = {
  // Tops
  Shirts: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Tailored Fit"],

  "T-Shirts": ["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized"],

  Polos: ["Slim Fit", "Regular Fit", "Relaxed Fit"],

  Hoodies: ["Regular Fit", "Relaxed Fit", "Oversized"],

  Sweatshirts: ["Regular Fit", "Relaxed Fit", "Oversized"],

  Sweaters: ["Slim Fit", "Regular Fit", "Relaxed Fit"],

  Kurtas: ["Regular Fit", "Straight Fit", "Relaxed Fit"],

  // Bottoms
  Jeans: [
    "Skinny",
    "Slim Fit",
    "Regular Fit",
    "Straight",
    "Relaxed Fit",
    "Loose Fit",
  ],

  Trousers: ["Slim Fit", "Regular Fit", "Straight", "Relaxed Fit", "Wide Leg"],

  Chinos: ["Slim Fit", "Regular Fit", "Straight"],

  Shorts: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Loose Fit"],

  Joggers: ["Slim Fit", "Regular Fit", "Relaxed Fit"],

  "Track Pants": ["Slim Fit", "Regular Fit", "Relaxed Fit"],

  "Cargo Pants": ["Regular Fit", "Relaxed Fit", "Loose Fit"],

  // Outerwear
  Jackets: ["Slim Fit", "Regular Fit", "Relaxed Fit"],

  Blazers: ["Slim Fit", "Regular Fit", "Tailored Fit"],

  Coats: ["Regular Fit", "Relaxed Fit", "Oversized"],

  // Shoes & Accessories don't have fit
  Sneakers: [],
  "Running Shoes": [],
  Boots: [],
  Loafers: [],
  "Formal Shoes": [],
  Sandals: [],
  Slippers: [],

  Watch: [],
  Cap: [],
  Hat: [],
  Belt: [],
  Tie: [],
  Wallet: [],
  Backpack: [],
  Bag: [],
  Sunglasses: [],
  Bracelet: [],
  Necklace: [],
  Ring: [],
};

// =============================================================================
// Sleeve Types
// Based on Sub Category
// =============================================================================

export const SLEEVE_TYPES = {
  Shirts: ["Half Sleeve", "Full Sleeve"],

  "T-Shirts": ["Sleeveless", "Half Sleeve", "Full Sleeve"],

  Polos: ["Half Sleeve", "Full Sleeve"],

  Hoodies: ["Full Sleeve"],

  Sweatshirts: ["Full Sleeve"],

  Sweaters: ["Sleeveless", "Full Sleeve"],

  Kurtas: ["Half Sleeve", "Three Quarter Sleeve", "Full Sleeve"],

  Jackets: ["Full Sleeve", "Sleeveless"],

  Blazers: ["Full Sleeve"],

  Coats: ["Full Sleeve"],
};

// AI Style Tags
// These tags help the recommendation engine understand the item's personality.

export const TAG_GROUPS = {
  // =========================
  // Tops
  // =========================
  Shirts: [
    {
      title: "Style",
      tags: ["Casual", "Formal", "Vintage"],
    },
    {
      title: "Design",
      tags: ["Solid", "Striped", "Patterned", "Printed"],
    },
  ],

  "T-Shirts": [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
    {
      title: "Design",
      tags: ["Solid", "Graphic", "Printed"],
    },
  ],

  Polos: [
    {
      title: "Style",
      tags: ["Casual", "Formal", "Vintage"],
    },
    {
      title: "Design",
      tags: ["Solid", "Striped"],
    },
  ],

  Hoodies: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  Sweatshirts: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  Sweaters: [
    {
      title: "Style",
      tags: ["Casual", "Formal", "Vintage"],
    },
    {
      title: "Design",
      tags: ["Solid", "Patterned"],
    },
  ],

  Kurtas: [
    {
      title: "Style",
      tags: ["Casual", "Formal"],
    },
    {
      title: "Design",
      tags: ["Solid", "Printed"],
    },
  ],

  // =========================
  // Bottoms
  // =========================
  Jeans: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear"],
    },
    {
      title: "Design",
      tags: ["Solid", "Faded"],
    },
  ],

  Trousers: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
    {
      title: "Design",
      tags: ["Solid"],
    },
  ],

  Chinos: [
    {
      title: "Style",
      tags: ["Casual", "Formal", "Vintage"],
    },
    {
      title: "Design",
      tags: ["Solid"],
    },
  ],

  Shorts: [
    {
      title: "Style",
      tags: ["Casual", "Sporty"],
    },
    {
      title: "Design",
      tags: ["Solid", "Printed"],
    },
  ],

  Joggers: [
    {
      title: "Style",
      tags: ["Casual", "Sporty"],
    },
  ],

  "Track Pants": [
    {
      title: "Style",
      tags: ["Sporty"],
    },
  ],

  "Cargo Pants": [
    {
      title: "Style",
      tags: ["Casual", "Streetwear"],
    },
  ],

  // =========================
  // Shoes
  // =========================
  Sneakers: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  "Running Shoes": [
    {
      title: "Style",
      tags: ["Sporty"],
    },
  ],

  Boots: [
    {
      title: "Style",
      tags: ["Casual", "Vintage"],
    },
  ],

  Loafers: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],

  "Formal Shoes": [
    {
      title: "Style",
      tags: ["Formal"],
    },
  ],

  Sandals: [
    {
      title: "Style",
      tags: ["Casual"],
    },
  ],

  Slippers: [
    {
      title: "Style",
      tags: ["Casual"],
    },
  ],

  // =========================
  // Accessories
  // =========================
  Watch: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],

  Cap: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  Hat: [
    {
      title: "Style",
      tags: ["Casual", "Vintage"],
    },
  ],

  Belt: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],

  Tie: [
    {
      title: "Style",
      tags: ["Formal"],
    },
  ],

  Wallet: [
    {
      title: "Style",
      tags: ["Casual", "Formal", "Vintage"],
    },
  ],

  Backpack: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  Bag: [
    {
      title: "Style",
      tags: ["Casual", "Formal"],
    },
  ],

  Sunglasses: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear"],
    },
  ],

  Bracelet: [
    {
      title: "Style",
      tags: ["Streetwear"],
    },
  ],

  Necklace: [
    {
      title: "Style",
      tags: ["Streetwear"],
    },
  ],

  Ring: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],

  // =========================
  // Outerwear
  // =========================
  Jackets: [
    {
      title: "Style",
      tags: ["Casual", "Streetwear", "Sporty"],
    },
  ],

  Blazers: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],

  Coats: [
    {
      title: "Style",
      tags: ["Formal", "Vintage"],
    },
  ],
};

// Status
export const ITEM_STATUS = ["active", "archived"];

// Processing Status
export const PROCESSING_STATUS = [
  "pending",
  "processing",
  "completed",
  "failed",
];
