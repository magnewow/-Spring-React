package ru.isu.taskmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.taskmanager.model.Comment;
import ru.isu.taskmanager.model.User;
import ru.isu.taskmanager.payload.response.CommentResponse;
import ru.isu.taskmanager.repository.CommentRepository;
import ru.isu.taskmanager.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository; 

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<CommentResponse> getCommentsByTask(Integer taskId) {
        List<Comment> comments = commentRepository.findByTaskIdOrderByTimestampAsc(taskId);
        
        return comments.stream().map(comment -> {
            CommentResponse dto = new CommentResponse();
            dto.setId(comment.getId());
            dto.setTaskId(comment.getTaskId());
            dto.setUserId(comment.getUserId());
            dto.setContent(comment.getContent());
            dto.setTimestamp(comment.getTimestamp());

            User user = userRepository.findById(comment.getUserId()).orElse(null);
            if (user != null) {
                dto.setUsername(user.getUsername()); 
            } else {
                dto.setUsername("Пользователь #" + comment.getUserId());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    public Comment updateComment(Integer id, String newContent) {
        return commentRepository.findById(id).map(comment -> {
            comment.setContent(newContent);
            return commentRepository.save(comment);
        }).orElseThrow(() -> new RuntimeException("Комментарий не найден"));
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}