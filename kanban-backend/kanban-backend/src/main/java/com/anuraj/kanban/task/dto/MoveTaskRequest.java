package com.anuraj.kanban.task.dto;

import com.anuraj.kanban.task.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MoveTaskRequest {

    @NotNull
    private TaskStatus targetStatus;

    @NotNull
    private Integer targetPosition;
}