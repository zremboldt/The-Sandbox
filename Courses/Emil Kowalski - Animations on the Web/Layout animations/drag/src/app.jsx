import { motion } from "framer-motion";
import { useRef } from "react";

export default function DragExample() {
  const boundingBox = useRef(null);

  return (
    <div className="wrap">
      <div ref={boundingBox} className="box dot-matrix">
        <motion.div
          drag
          dragConstraints={boundingBox} // this prevents the element from being dragged outside of the bounding box
          // dragMomentum={false}
          dragElastic={0.3}
          className="draggable"
        />
      </div>
    </div>
  );
}
