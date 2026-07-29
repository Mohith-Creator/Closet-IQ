const getHomeStats = (stats) => [
  {
    icon: "cube-outline",
    value: stats.items,
    label: "Items",
  },
  {
    icon: "shirt-outline",
    value: stats.outfits,
    label: "Outfits",
  },
  {
    icon: "heart-outline",
    value: stats.favorites,
    label: "Favorites",
  },
  {
    icon: "analytics-outline",
    value: `${stats.utilization}%`,
    label: "Usage",
  },
];

export default getHomeStats;