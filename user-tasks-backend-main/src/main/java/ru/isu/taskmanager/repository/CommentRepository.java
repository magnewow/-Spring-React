package ru.isu.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.isu.taskmanager.model.Comment;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByTaskIdOrderByTimestampAsc(Integer taskId);
}
