import HeightStep from "./measurements/HeightStep";
import ShoeSizeStep from "./measurements/ShoeSizeStep";
import BodyTypeStep from "./measurements/BodyTypeStep";

export default function MeasurementsStep({
  step,
  measurements,
  setMeasurements,
}) {
  switch (step) {
    case 0:
      return (
        <HeightStep
          value={measurements.height}
          unit={measurements.heightUnit}
          onChange={(height) =>
            setMeasurements((prev) => ({
              ...prev,
              height,
            }))
          }
          onUnitChange={(heightUnit) =>
            setMeasurements((prev) => ({
              ...prev,
              heightUnit,
            }))
          }
        />
      );

    case 1:
      return (
        <ShoeSizeStep
          value={measurements.shoeSize}
          unit={measurements.shoeSizeUnit}
          onChange={(shoeSize) =>
            setMeasurements((prev) => ({
              ...prev,
              shoeSize,
            }))
          }
          onUnitChange={(shoeSizeUnit) =>
            setMeasurements((prev) => ({
              ...prev,
              shoeSizeUnit,
            }))
          }
        />
      );

    case 2:
      return (
        <BodyTypeStep
          value={measurements.bodyType}
          onChange={(bodyType) =>
            setMeasurements((prev) => ({
              ...prev,
              bodyType,
            }))
          }
        />
      );

    default:
      return null;
  }
}
