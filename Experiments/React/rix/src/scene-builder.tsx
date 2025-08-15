"use client";
import { Typography, styled } from "@mui/material";
import { SortableTree } from "./SortableTree";

export function SceneBuilder() {
  return (
    <>
      <Header>
        <Typography variant="h3" fontWeight="bold">
          Rix Scene Builder
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Drag and drop elements to build your scene
        </Typography>
      </Header>
      <Main>
        <SortableTree removable collapsible indicator />
      </Main>
    </>
  );
}

const Main = styled("main")`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

const Header = styled("header")`
  padding: 20px;
`;
