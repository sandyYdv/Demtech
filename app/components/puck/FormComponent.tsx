"use client";

import React from "react";

interface FormFields {
  id: string;
  label: string;
  type: string;
}

export const FormComponent: React.FC<{ fields: FormFields[] }> = ({
  fields,
}) => {
  return (
    <form
      className="puck-form"
      style={{ padding: 20, border: "1px solid #ccc", borderRadius: "8px" }}>
      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            padding: 10,
            margin: 5,
          }}>
          <label>{field.label}</label>
          {field.type === "text" && <input type="text" />}
          {field.type === "radio" && (
            <>
              <input type="radio" name={field.id} /> Option 1
              <input type="radio" name={field.id} /> Option 2
            </>
          )}
          {field.type === "checkbox" && <input type="checkbox" />}
        </div>
      ))}
    </form>
  );
};
