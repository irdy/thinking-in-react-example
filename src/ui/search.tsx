import React from "react";

interface SearchProps extends React.HTMLProps<HTMLInputElement> { }

export function Search({ placeholder = "Search...", ...inputProps }: SearchProps) {
  return <input placeholder={placeholder} {...inputProps} type="text"/>
}
