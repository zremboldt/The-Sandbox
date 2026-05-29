import { RootHorizontalLogo } from "../assets/root-horizontal-logo";
import "./app-header.css";

export function AppHeader() {
  return (
    <div className="app-header-container">
      <header>
        <RootHorizontalLogo />
        <button className="btn-outlined">Sign In</button>
      </header>
    </div>
  );
}
