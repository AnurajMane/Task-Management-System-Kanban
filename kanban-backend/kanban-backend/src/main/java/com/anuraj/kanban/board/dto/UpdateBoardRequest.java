package com.anuraj.kanban.board.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateBoardRequest {

	@NotBlank
	private String name;
	private String description;
}
