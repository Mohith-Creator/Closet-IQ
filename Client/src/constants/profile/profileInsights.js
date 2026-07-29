const getProfileInsights = (insights) => [
  {
    label: "⭐ Most Worn",
    value: insights.mostWorn?.name || "None",
  },
  {
    label: "❤️ Favorites",
    value: insights.favorites,
  },
  {
    label: "📦 Unused Items",
    value: insights.unusedItems,
  },
  {
    label: "📈 Avg Usage",
    value: insights.averageUsage,
  },
];

export default getProfileInsights;