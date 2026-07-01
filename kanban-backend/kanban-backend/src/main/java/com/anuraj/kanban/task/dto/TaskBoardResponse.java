package com.anuraj.kanban.task.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskBoardResponse {

    private List<TaskResponse> backlog;
    private List<TaskResponse> readyForDevelopment;
    private List<TaskResponse> inProgress;
    private List<TaskResponse> inReview;
    private List<TaskResponse> blocked;
    private List<TaskResponse> done;

}
