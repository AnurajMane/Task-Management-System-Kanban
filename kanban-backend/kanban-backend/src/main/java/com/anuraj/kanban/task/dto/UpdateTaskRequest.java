package com.anuraj.kanban.task.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateTaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    
    private LocalDate dueDate;
}