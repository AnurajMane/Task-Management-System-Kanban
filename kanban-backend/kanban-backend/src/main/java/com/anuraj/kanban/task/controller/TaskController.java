package com.anuraj.kanban.task.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuraj.kanban.task.dto.CreateTaskRequest;
import com.anuraj.kanban.task.dto.TaskBoardResponse;
import com.anuraj.kanban.task.dto.TaskResponse;
import com.anuraj.kanban.task.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/boards/{boardId}/tasks")
@RequiredArgsConstructor
public class TaskController {

	private final TaskService taskService;
	
	@PostMapping
	public ResponseEntity<TaskResponse> createTask(@PathVariable Long boardId, @Valid @RequestBody CreateTaskRequest request, Authentication authentication){
		TaskResponse response = taskService.createTask(boardId, request, authentication);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<TaskBoardResponse> getTasksForBoard(@PathVariable Long boardId, Authentication authentication){
		return ResponseEntity.ok(taskService.getTasksForBoard(boardId, authentication));
	}
}
