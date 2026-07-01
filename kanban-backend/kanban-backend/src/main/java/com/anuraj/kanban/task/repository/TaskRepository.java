package com.anuraj.kanban.task.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuraj.kanban.board.entity.Board;
import com.anuraj.kanban.task.entity.Task;
import com.anuraj.kanban.task.enums.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	List<Task> findByBoard(Board board);
	
	List<Task> findByBoardAndStatusOrderByPositionAsc(Board board, TaskStatus status);
	
	long countByBoardAndStatus(Board board, TaskStatus status);
	
	Optional<Task> findById(Long id);
}
