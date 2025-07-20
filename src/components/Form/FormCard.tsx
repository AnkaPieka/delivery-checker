import React from "react";
import "../../App.css";
import Card from "../ui/Card";
import TextAreaAndLabel from "../ui/TextAreaAndLabel";

interface FormCardProps {
  rawDeliveries: string;
  rawPath: string;
  setRawDeliveries: React.Dispatch<React.SetStateAction<string>>;
  setRawPath: React.Dispatch<React.SetStateAction<string>>;
  onCheckButtonClick: () => void;
  pathError?: string;
  deliveriesError?: string;
}

const FormCard = ({
  rawDeliveries,
  rawPath,
  setRawDeliveries,
  setRawPath,
  onCheckButtonClick,
  pathError,
  deliveriesError,
}: FormCardProps) => {
  return (
    <Card
      parent="form"
      title="1. Enter your data"
      className="relative w-full md:w-[40%] "
      onButtonClick={onCheckButtonClick}
    >
      <TextAreaAndLabel
        label="List of deliveries"
        value={rawDeliveries}
        onChange={setRawDeliveries}
        id="deliveries"
        rows={4}
        placeholder="[[1, 3], [2, 5]]..."
        error={deliveriesError}
      />
      <TextAreaAndLabel
        label="Your route"
        id="route"
        rows={4}
        value={rawPath}
        onChange={setRawPath}
        placeholder="[1, 2, 3, 4, 5]..."
        error={pathError}
      />
    </Card>
  );
};

export default FormCard;
