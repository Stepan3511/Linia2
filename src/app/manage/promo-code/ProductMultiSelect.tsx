"use client";

import React from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string[];
  options: Option[];
  onChange: (values: string[]) => void;
}

const ProductMultiSelect: React.FC<Props> = ({ value, options, onChange }) => {
  // Ждём пока загрузятся options
  if (options.length === 0) return null;

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={(selected) => {
        if (!selected) return onChange([]);
        const ids = selected.map((item) => item.value);
        onChange(ids);
      }}
      className="mb-4 min-w-[250px]"
      classNamePrefix="select"
      placeholder="Поиск и выбор товаров..."
    />
  );
};

export default ProductMultiSelect;
