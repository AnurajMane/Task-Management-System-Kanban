package com.anuraj.kanban.board.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateBoardRequest {

	@NotBlank(message = "Board name is required..")
	private String name;
	
	private String description;
}
