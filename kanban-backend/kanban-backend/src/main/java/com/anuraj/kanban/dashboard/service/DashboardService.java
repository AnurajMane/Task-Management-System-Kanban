package com.anuraj.kanban.dashboard.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.anuraj.kanban.board.repository.BoardRepository;
import com.anuraj.kanban.dashboard.dto.DashboardStatsResponse;
import com.anuraj.kanban.task.enums.TaskStatus;
import com.anuraj.kanban.task.repository.TaskRepository;
import com.anuraj.kanban.user.entity.User;
import com.anuraj.kanban.user.repository.UserRepository;

@Service
public class DashboardService {

    private final BoardRepository boardRepository;
    private final TaskRepository taskRepository;

    private final UserRepository userRepository;
    
    public DashboardService(
            BoardRepository boardRepository,
            TaskRepository taskRepository,
            UserRepository userRepository
    ) {
        this.boardRepository = boardRepository;
        this.taskRepository = taskRepository;
		this.userRepository = userRepository;
    }

    public DashboardStatsResponse getStats(
            Authentication authentication
    ) {

    	String email = authentication.getName();

    	User user = userRepository
    	        .findByEmail(email)
    	        .orElseThrow(
    	                () -> new RuntimeException("User not found")
    	        );
        int totalBoards =
                boardRepository.countByOwner(user);

        int totalTasks =
                taskRepository.countByBoardOwner(user);

        int completedTasks =
                taskRepository.countByBoardOwnerAndStatus(
                        user,
                        TaskStatus.DONE
                );

        int pendingTasks =
                totalTasks - completedTasks;
        
        System.out.println("USER = " + user.getEmail());

//        totalBoards =
//                boardRepository.countByOwner(user);

        System.out.println("TOTAL BOARDS = " + totalBoards);

        return new DashboardStatsResponse(
                totalBoards,
                totalTasks,
                completedTasks,
                pendingTasks
        );
    }
}