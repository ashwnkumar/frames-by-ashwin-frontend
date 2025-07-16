import { CircleAlert, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Input = ({
    className,
    name,
    id,
    label,
    placeholder,
    value,
    type = "text",
    error,
    onChange,
    onKeyDown,
    required = false,
    disabled = false,
    readOnly = false
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const newType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div
            className={`${className} flex flex-col items-start justify-center w-full`}
        >
            <div className="">
                <span className="text-md font-medium">{label} {required && <span className="text-danger text-lg font-medium">*</span>}</span>

            </div>
            <div className="relative w-full">
                <input
                    onChange={onChange}
                    name={name}
                    id={id}
                    readOnly={readOnly}
                    type={newType}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    className={`w-full border border-border rounded-md px-2 py-2 focus:outline-none focus:border-dark transition-colors disabled:bg-dark/10 disabled:cursor-not-allowed duration-200 font-normal ${error && "!border-danger"
                        } ${type === "number" &&
                        " [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        } `}
                />

                {error && (
                    <CircleAlert
                        strokeWidth={1.5}
                        stroke="red"
                        className={`absolute ${type === "password" ? "right-10" : "right-2"
                            }  top-1/2 transform -translate-y-1/2`}
                    />
                )}
                {(type === "password" && !disabled) && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff strokeWidth={1.5} />
                        ) : (
                            <Eye strokeWidth={1.5} />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <span className="text-red-500 text-sm font-medium">{error}</span>
            )}
        </div>
    );
};

export default Input;