package ru.isu.taskmanager.payload.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private Integer id;
    private Integer taskId;
    private Integer userId;
    private String username;
    private String content;
    private LocalDateTime timestamp;
}