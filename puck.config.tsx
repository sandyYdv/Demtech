import type { Config } from "@measured/puck";
import React, { useState } from "react";
import { FormComponent } from "./app/components/puck/FormComponent";

type FormField = {
  id: string;
  label: string;
  type: string;
};

type Props = {
  HeadingBlock: { title: string };
  FormBlock: { fields: FormField[] };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },

    FormBlock: {
      fields: {
        fields: {
          type: "custom",
          render: ({ value, onChange }) => {
            const [fields, setFields] = useState<FormField[]>(value ?? []);

            const addField = () => {
              const newField: FormField = {
                id: `field_${Date.now()}`,
                label: `Field ${fields.length + 1}`,
                type: "text",
              };
              const updatedFields = [...fields, newField];
              setFields(updatedFields);
              onChange(updatedFields);
            };

            const updateField = (
              index: number,
              key: keyof FormField,
              val: string
            ) => {
              const updatedFields = [...fields];
              updatedFields[index][key] = val;
              setFields(updatedFields);
              onChange(updatedFields);
            };

            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} style={{ marginBottom: "10px" }}>
                    <input
                      type="text"
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) =>
                        updateField(index, "label", e.target.value)
                      }
                    />
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(
                          index,
                          "type",
                          e.target.value as FormField["type"]
                        )
                      }>
                      <option value="text">Textbox</option>
                      <option value="radio">Radio Button</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>
                ))}
                <button type="button" onClick={addField}>
                  + Add Field
                </button>
              </div>
            );
          },
        },
      },
      defaultProps: {
        fields: [],
      },
      render: ({ fields = [] }) => <FormComponent fields={fields} />,
    },
  },
};

export default config;
