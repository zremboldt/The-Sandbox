import React, { useState, useRef } from 'react';

interface User {
  firstName: string;
  lastName: string;
}

interface Props {
  label?: string;
  isTouched?: boolean;
  maxLength?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user?: User;
}

interface SpaceShip {
  name: string;
  width?: number;
  height?: number;
}

export const TextInput: React.FC<Props> = ({ maxLength, handleChange }) => {
  const [shipSpecs, setShipSpecs] = useState<SpaceShip>({ name: '' });
  const [count, setCount] = useState<number | null | undefined>(5);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  setCount(undefined)

  return (
    <div ref={divRef}>
      <input ref={inputRef} maxLength={maxLength} />
    </div>
  )
}