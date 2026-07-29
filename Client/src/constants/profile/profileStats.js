const getProfileStats = (stats) => [
  {
    value: stats.items,
    label: "Items",
    icon: "shirt-outline",
    type: "ion",
  },
  {
    value: stats.outfits,
    label: "Outfits",
    icon: "hanger",
    type: "mc",
  },
  {
    value: stats.favorites,
    label: "Favorites",
    icon: "heart-outline",
    type: "ion",
  },
  {
    value: `${stats.utilization}%`,
    label: "Utilization",
    icon: "analytics-outline",
    type: "ion",
  },
];

export default getProfileStats;