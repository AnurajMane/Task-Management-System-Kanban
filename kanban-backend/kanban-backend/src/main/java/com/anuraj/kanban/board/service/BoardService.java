package com.anuraj.kanban.board.service;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.anuraj.kanban.board.dto.BoardResponse;
import com.anuraj.kanban.board.dto.CreateBoardRequest;
import com.anuraj.kanban.board.dto.UpdateBoardRequest;
import com.anuraj.kanban.board.entity.Board;
import com.anuraj.kanban.board.repository.BoardRepository;
import com.anuraj.kanban.user.entity.User;
import com.anuraj.kanban.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	
	public BoardResponse createBoard(CreateBoardRequest request, Authentication authentication) {
		String email = authentication.getName();
		
		User user = userRepository
				.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		Board board = Board.builder()
				.name(request.getName())
				.description(request.getDescription())
				.owner(user)
				.build();
		
		Board saveBoard = boardRepository.save(board);
		
		return BoardResponse.builder()
				.id(saveBoard.getId())
				.name(saveBoard.getName())
				.description(saveBoard.getDescription())
				.build();
	}
	
	public List<BoardResponse> getMyBoards(Authentication authentication){
		String email = authentication.getName();
		
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> 
						new RuntimeException("User not found"));
		
		return boardRepository
				.findByOwner(user)
				.stream()
				.map(board -> 
						BoardResponse.builder()
							.id(board.getId())
							.name(board.getName())
							.description(board.getDescription())
							.build())
				.toList();
	}
	
	public BoardResponse getBoardById(Long boardId, Authentication authentication) {
		String email = authentication.getName();
		
		User user = userRepository
				.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		Board board = boardRepository
				.findById(boardId)
				.orElseThrow(() -> new RuntimeException("Board not found"));
		
		if(!board.getOwner().getId().equals(user.getId())) {
			throw new RuntimeException("Access denied");
		}
		
		return BoardResponse.builder()
	            .id(board.getId())
	            .name(board.getName())
	            .description(board.getDescription())
	            .build();
	}
	
	public BoardResponse updateBoard(Long boardId, UpdateBoardRequest request, Authentication authentication) {
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
	    
	    board.setName(request.getName());
	    board.setDescription(request.getDescription());
	    
	    Board updatedBoard = boardRepository.save(board);
	    
	    return BoardResponse.builder()
	            .id(updatedBoard.getId())
	            .name(updatedBoard.getName())
	            .description(
	                    updatedBoard.getDescription())
	            .build();
	}
	
	public void deleteBoard(Long boardId, Authentication authentication) {
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
	    
	    boardRepository.delete(board);
	}
}
