package com.anuraj.kanban.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuraj.kanban.board.dto.BoardResponse;
import com.anuraj.kanban.board.dto.CreateBoardRequest;
import com.anuraj.kanban.board.dto.UpdateBoardRequest;
import com.anuraj.kanban.board.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	
	@PostMapping
	public ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody CreateBoardRequest request, Authentication authentication){
		BoardResponse response = boardService.createBoard(request, authentication);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List<BoardResponse>> getMyBoards(Authentication authentication){
		return ResponseEntity.ok(boardService.getMyBoards(authentication));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BoardResponse> getBoardById(@PathVariable Long id, Authentication authentication){
		return ResponseEntity.ok(boardService.getBoardById(id, authentication));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<BoardResponse> updateBoard(@PathVariable Long id, @Valid @RequestBody UpdateBoardRequest request, Authentication authentication){
		return ResponseEntity.ok(boardService.updateBoard(id, request, authentication));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBoard(@PathVariable Long id, Authentication authentication){
		boardService.deleteBoard(id, authentication);
		return ResponseEntity.noContent().build();
	}
}
