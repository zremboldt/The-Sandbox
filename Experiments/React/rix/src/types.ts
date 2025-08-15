import type { MutableRefObject } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

// TODO: Just temporarily satisfying the types here. Will need to revisit.
export interface TreeItem {
  id: UniqueIdentifier;
  type: string;
  children: TreeItem[];
  collapsed?: boolean;
  variant?: string;
  text?: string;
  alt?: string;
  width?: string;
  color?: string;
  spacing?: number;
  key?: string;
  label?: string;
  variable?: string;
  validationRules?: object[];
  src?: string;
  formId?: string;
  align?: string;
  scope?: string;
  name?: string;
  display_name?: string;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
