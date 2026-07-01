package com.anuraj.kanban.task.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuraj.kanban.task.dto.MoveTaskRequest;
import com.anuraj.kanban.task.dto.TaskResponse;
import com.anuraj.kanban.task.dto.UpdateTaskRequest;
import com.anuraj.kanban.task.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskManagementController {

	private final TaskService taskService;
	
	@PutMapping("/{taskId}")
	public ResponseEntity<TaskResponse> updateTask(@PathVariable Long taskId, @Valid @RequestBody UpdateTaskRequest request, Authentication authentication){
		return ResponseEntity.ok(taskService.updateTask(taskId, request, authentication));
	}
	
	@DeleteMapping("/{taskId}")
	public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, Authentication authentication){
		taskService.deleteTask(taskId, authentication);
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping("/{taskId}/move")
	public ResponseEntity<TaskResponse> moveTask(@PathVariable Long taskId, @RequestBody MoveTaskRequest request, Authentication authentication){
		return ResponseEntity.ok(taskService.moveTask(taskId, request, authentication));
	}
}
