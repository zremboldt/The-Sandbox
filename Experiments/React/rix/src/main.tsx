import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Providers } from "./providers";
import { SceneBuilder } from "./scene-builder";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <SceneBuilder />
    </Providers>
  </StrictMode>
);
