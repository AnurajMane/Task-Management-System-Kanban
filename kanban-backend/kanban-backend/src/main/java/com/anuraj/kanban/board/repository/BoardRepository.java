package com.anuraj.kanban.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuraj.kanban.board.entity.Board;
import com.anuraj.kanban.user.entity.User;

public interface BoardRepository extends JpaRepository<Board, Long>{

	List<Board> findByOwner(User user);
	int countByOwner(User user);
}
