package com.anuraj.kanban.board.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardResponse {

	private Long id;
	private String name;
	private String description;
}
