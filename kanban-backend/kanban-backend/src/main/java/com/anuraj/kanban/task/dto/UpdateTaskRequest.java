package com.anuraj.kanban.task.dto;

import java.time.LocalDate;

import com.anuraj.kanban.task.model.TaskPriority;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateTaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    
    private LocalDate dueDate;
    
    private TaskPriority priority;
}