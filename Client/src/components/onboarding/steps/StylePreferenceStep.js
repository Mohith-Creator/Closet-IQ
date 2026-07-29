import React from "react";

import StyleSelectionStep from "./style/StyleSelectionStep";
import FitPreferenceStep from "./style/FitPreferenceStep";
import FavoriteColorsStep from "./style/FavoriteColorsStep";

export default function StylePreferenceStep({
  step,
  preferences,
  setPreferences,
}) {
  switch (step) {
    case 0:
      return (
        <StyleSelectionStep
          value={preferences.styles}
          onChange={(styles) =>
            setPreferences((prev) => ({
              ...prev,
              styles,
            }))
          }
        />
      );

    case 1:
      return (
        <FitPreferenceStep
          value={preferences.fitPreference}
          onChange={(fitPreference) =>
            setPreferences((prev) => ({
              ...prev,
              fitPreference,
            }))
          }
        />
      );

    case 2:
      return (
        <FavoriteColorsStep
          value={preferences.favoriteColors}
          onChange={(favoriteColors) =>
            setPreferences((prev) => ({
              ...prev,
              favoriteColors,
            }))
          }
        />
      );

    default:
      return null;
  }
}
