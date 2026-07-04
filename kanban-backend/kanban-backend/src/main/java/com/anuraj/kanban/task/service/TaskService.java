package com.anuraj.kanban.task.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anuraj.kanban.board.entity.Board;
import com.anuraj.kanban.board.repository.BoardRepository;
import com.anuraj.kanban.task.dto.CreateTaskRequest;
import com.anuraj.kanban.task.dto.MoveTaskRequest;
import com.anuraj.kanban.task.dto.TaskBoardResponse;
import com.anuraj.kanban.task.dto.TaskResponse;
import com.anuraj.kanban.task.dto.UpdateTaskRequest;
import com.anuraj.kanban.task.entity.Task;
import com.anuraj.kanban.task.enums.TaskStatus;
import com.anuraj.kanban.task.repository.TaskRepository;
import com.anuraj.kanban.user.entity.User;
import com.anuraj.kanban.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

	private final TaskRepository taskRepository;
	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	
	@Transactional
	public TaskResponse createTask(Long boardId, CreateTaskRequest request, Authentication authentication) {
		Board board = getBoardForCurrentUser(boardId, authentication);
		
		int nextPosition = (int) taskRepository.countByBoardAndStatus(board, TaskStatus.BACKLOG);
		
		Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(TaskStatus.BACKLOG)
                .position(nextPosition)
                .board(board)
                .dueDate(request.getDueDate())
                .build();

        Task savedTask = taskRepository.save(task);

        return TaskResponse.builder()
                .id(savedTask.getId())
                .title(savedTask.getTitle())
                .description(savedTask.getDescription())
                .dueDate(savedTask.getDueDate())
                .status(savedTask.getStatus())
                .position(savedTask.getPosition())
                .boardId(savedTask.getBoard().getId())
                .build();
	}
	
	private Board getBoardForCurrentUser(Long boardId, Authentication authentication) {

	    String email = authentication.getName();

	    User user = userRepository
	                    .findByEmail(email)
	                    .orElseThrow(() -> new RuntimeException("User not found"));

	    Board board = boardRepository
	                    .findById(boardId)
	                    .orElseThrow(() -> new RuntimeException("Board not found"));

	    if (!board.getOwner().getId().equals(user.getId())) {
	        throw new RuntimeException("Access denied");
	    }

	    return board;
	}
	
	private TaskResponse mapToResponse(Task task) {
		return TaskResponse.builder()
				.id(task.getId())
				.title(task.getTitle())
				.description(task.getDescription())
				.dueDate(task.getDueDate())
				.status(task.getStatus())
				.position(task.getPosition())
				.boardId(task.getBoard().getId())
				.build();
	}
	
	@Transactional(readOnly = true)
	public TaskBoardResponse getTasksForBoard(Long boardId, Authentication authentication) {
		Board board = getBoardForCurrentUser(boardId, authentication);
		return TaskBoardResponse.builder()
				.backlog(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.BACKLOG)
							.stream()
							.map(this::mapToResponse)
							.toList()
						)
				.readyForDevelopment(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.READY_FOR_DEVELOPMENT)
							.stream()
							.map(this::mapToResponse)
							.toList()
						)
				.inProgress(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.IN_PROGRESS)
                        	.stream()
                        	.map(this::mapToResponse)
                        	.toList()
                        )
				.inReview(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.IN_REVIEW)
                        	.stream()
                            .map(this::mapToResponse)
                            .toList()
                        )
				.blocked(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.BLOCKED)
                            .stream()
                            .map(this::mapToResponse)
                            .toList()
                        )
				.done(
						taskRepository.findByBoardAndStatusOrderByPositionAsc(board, TaskStatus.DONE)
                            .stream()
                            .map(this::mapToResponse)
                            .toList()
                      )
				.build();
	}
	
	private Task getTaskForCurrentUser(Long taskId, Authentication authentication) {

	    String email = authentication.getName();

	    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

	    Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

	    if (!task.getBoard().getOwner().getId().equals(user.getId())) {
	    	throw new RuntimeException("Access denied");
	    }

	    return task;
	}
	
	@Transactional
	public TaskResponse updateTask(Long taskId, UpdateTaskRequest request, Authentication authentication) {
		Task task = getTaskForCurrentUser(taskId, authentication);
		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setDueDate(request.getDueDate());
		
		Task updatedTask = taskRepository.save(task);
		
		return mapToResponse(updatedTask);
	}
	
	@Transactional
	public void deleteTask(Long taskId, Authentication authentication) {
		Task task = getTaskForCurrentUser(taskId, authentication);
		
		Board board = task.getBoard();
		TaskStatus status = task.getStatus();
		
		taskRepository.delete(task);
		
		List<Task> remaining = taskRepository.findByBoardAndStatusOrderByPositionAsc(board, status);
		
		for(int i = 0; i < remaining.size(); i++) {
			remaining.get(i).setPosition(i);
		}
		taskRepository.saveAll(remaining);
	}
	
	//If the application crashes in the middle data can become inconsistent
	@Transactional
	public TaskResponse moveTask(Long taskId, MoveTaskRequest request, Authentication authentication) {
		Task task = getTaskForCurrentUser(taskId, authentication);

	    Board board = task.getBoard();

	    TaskStatus sourceStatus = task.getStatus();

	    TaskStatus targetStatus = request.getTargetStatus();

	    int targetPosition = request.getTargetPosition();
	    
	    if(sourceStatus == targetStatus) {
	    	List<Task> tasks = taskRepository.findByBoardAndStatusOrderByPositionAsc(board, sourceStatus);
	    	
	    	tasks.remove(task);
	    	targetPosition = Math.max(0, Math.min(targetPosition, tasks.size()));
	    	tasks.add(targetPosition, task);
	    	for(int i = 0; i < tasks.size(); i++) {
	    		tasks.get(i).setPosition(i);
	    	}
	    	taskRepository.saveAll(tasks);
	    	return mapToResponse(task);
	    }
	    else {
	    	List<Task> sourceTasks = taskRepository.findByBoardAndStatusOrderByPositionAsc(board, sourceStatus);
	    	
	    	List<Task> targetTasks = taskRepository.findByBoardAndStatusOrderByPositionAsc(board, targetStatus);
	    	//if frontend sends target position as 9999 accidentally then
	    	targetPosition = Math.max(0, Math.min(targetPosition, targetTasks.size()));
	    	
	    	//first remove
	    	sourceTasks.remove(task);
	    	task.setStatus(targetStatus);
	    	taskRepository.save(task);
	    	//then update in another column
	    	targetTasks.add(targetPosition, task);
	    	
	    	//recalculate source pos
	    	for(int i = 0; i < sourceTasks.size(); i++) {
	    		sourceTasks.get(i).setPosition(i);
	    	}
	    	//recalculate target pos
	    	for(int i = 0; i < targetTasks.size(); i++) {
	    		targetTasks.get(i).setPosition(i);
	    	}
	    	taskRepository.saveAll(sourceTasks);
	    	taskRepository.saveAll(targetTasks);
	    	
	    	return mapToResponse(task);
	    }
	}
}
