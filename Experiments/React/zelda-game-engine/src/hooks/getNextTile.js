export default function getNextTile(
  directionPressed,
  { mapLayout, xPos, yPos, gridCellSize }
) {
  if (directionPressed === "right") {
    const [nextTile] = mapLayout.filter(
      (tile) => tile.yPos === yPos && tile.xPos === xPos + gridCellSize
    );
    return nextTile;
  } else if (directionPressed === "left") {
    const [nextTile] = mapLayout.filter(
      (tile) => tile.yPos === yPos && tile.xPos === xPos - gridCellSize
    );
    return nextTile;
  } else if (directionPressed === "down") {
    const [nextTile] = mapLayout.filter(
      (tile) => tile.xPos === xPos && tile.yPos === yPos + gridCellSize
    );
    return nextTile;
  } else if (directionPressed === "up") {
    const [nextTile] = mapLayout.filter(
      (tile) => tile.xPos === xPos && tile.yPos === yPos - gridCellSize
    );
    return nextTile;
  }
}
