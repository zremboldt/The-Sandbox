import { forwardRef } from "react";
import { ActionBase, ActionProps } from "./Action";
import { styled } from "@mui/material";

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <StyledHandle
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
        <svg viewBox="0 0 20 20" width="12">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </StyledHandle>
    );
  }
);

const StyledHandle = styled(ActionBase)`
  --focused-outline-color: #4c9ffe;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  align-self: stretch;
  cursor: pointer;
  touch-action: none;
  border-radius: 5px 0 0 5px;
  border: none;
  border-right: 1px solid var(--border);
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
