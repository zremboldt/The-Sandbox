import React, { forwardRef, CSSProperties } from "react";
import { styled } from "@mui/material";

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const ActionBase = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={className}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            "--fill": active?.fill,
            "--background": active?.background,
          } as CSSProperties
        }
      />
    );
  }
);

export const Action = styled(ActionBase)`
  --focused-outline-color: #4c9ffe;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 28px;
  cursor: pointer;
  touch-action: none;
  border-radius: 3px;
  border: none;
  outline: none;
  appearance: none;
  background-color: var(--action-background);
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      background-color: var(--action-hover);

      svg {
        fill: #6f7b88;
      }
    }
  }

  svg {
    flex: 0 0 auto;
    margin: auto;
    height: 100%;
    overflow: visible;
    fill: #919eab;
  }

  &:active {
    background-color: var(--background, rgba(0, 0, 0, 0.05));

    svg {
      fill: var(--fill, #788491);
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0),
      0 0px 0px 2px var(--focused-outline-color);
  }
`;
