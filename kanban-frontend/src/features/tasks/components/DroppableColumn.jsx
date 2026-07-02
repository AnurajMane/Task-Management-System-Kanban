import { useDroppable } from "@dnd-kit/core";

function DroppableColumn({
  id,
  children,
}) {
  const { setNodeRef } =
    useDroppable({
      id,
    });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}

export default DroppableColumn;