"use client";
import { Box, Typography, Button, Stack, styled } from "@mui/material";
import { SortableTree } from "./SortableTree";

export function SceneBuilder() {
  return (
    <>
      <Header>
        <Typography variant="h2" fontWeight="bold">
          Scene Builder
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Drag and drop elements to build your scene
        </Typography>
      </Header>
      <Main>
        <SortableTree removable />
      </Main>
    </>
  );
}

const Main = styled("main")`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled("header")`
  padding: 20px;
`;
