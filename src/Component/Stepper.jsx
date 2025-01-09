import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplte, setIsComplte] = useState(false);
  const stepRef = useRef([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  if (!stepsConfig.length) {
    return <></>;
  }

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef]);

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === stepsConfig.length) {
        setIsComplte(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };
  const handleprev = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const calculateWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step 
                ${currentStep > index + 1 || isComplte ? "complete" : ""} ${
                currentStep === index + 1 ? "active" : ""
              }`}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplte ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${
              margins.marginLeft + margins.marginRight
            }px )`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateWidth()}%` }}
          ></div>
        </div>
      </div>

      <div className="component">
        <ActiveComponent />
        {!isComplte && (
          <div className="btn-prev ">
            {currentStep !== 1 && (
              <button className="prev" onClick={handleprev}>
                Previous
              </button>
            )}
            <button className="btn" onClick={handleNext}>
              {currentStep === stepsConfig.length ? "Finish" : "NEXT"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Stepper;
