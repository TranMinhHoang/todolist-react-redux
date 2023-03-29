import { Chip } from "@mui/material";
import { memo } from "react";
import listPriority from "./listPriority";

function Todo({ name, completed, priority }) {
  console.log('abc')
    const _priority = listPriority.find(item => item.title === priority)
  return (
    <div className="flex justify-between items-center">
      <span className={completed ? 'text-[#999] line-through' : ''}>{name}</span>
      <Chip
        variant="filled"
        label={priority}
        size="small"
        sx={{
          borderColor: _priority?.borderColor,
          border: "1px solid",
          backgroundColor: _priority.backgroundColor,
          color: _priority.color,
        }}
        className={completed ? 'opacity-60 line-through' : ''}
      />
    </div>
  );
}

export default memo(Todo);
