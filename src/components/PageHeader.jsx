import React from "react";
import Button from "./form/Button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PageHeader = ({ title, desc, buttons = [], backTo }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 justify-between p-4">
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center">
          {backTo && (
            <ChevronLeft
              size={32}
              strokeWidth={1.5}
              className="cursor-pointer"
              onClick={() => navigate(backTo)}
            />
          )}
          <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        </div>
        {desc && <h4 className="text-lg md:text-xl text-gray-600">{desc}</h4>}
      </div>

      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-2 md:gap-4 self-end">
          {buttons.map((button, index) => (
            <Button
              key={index}
              label={button.label}
              navTo={button.navTo}
              onClick={button.onClick}
              variant={button.variant}
              className={button.className}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
