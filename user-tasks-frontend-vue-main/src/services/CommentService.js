import http from "../http-common";

function getCommentsByTask(taskId) {
    return http.get(`/comments/task/${taskId}`);
}

function createComment(comment) {
    return http.post("/comments", comment);
}

function updateComment(id, content) {
    return http.put(`/comments/${id}`, { content: content });
}

function deleteComment(id) {
    return http.delete(`/comments/${id}`);
}

export default {
    getCommentsByTask,
    createComment,
    updateComment,
    deleteComment
};