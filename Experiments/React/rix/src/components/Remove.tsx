import { styled } from "@mui/material";
import { Action, ActionProps } from "./Action";

export function Remove(props: ActionProps) {
  return (
    <StyledRemove {...props}>
      <svg width="8" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z" />
      </svg>
    </StyledRemove>
  );
}

const StyledRemove = styled(Action)`
  --focused-outline-color: var(--error);

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
