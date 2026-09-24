<template>
  <div class="comments-section">
    <h4>Комментарии ({{ comments.length }})</h4>

    <div v-if="comments.length === 0" class="no-comments">
      Пока нет комментариев. Будьте первым!
    </div>

    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div class="comment-header">
        <strong>{{ comment.username }}</strong>
        <span class="comment-date">{{ formatDate(comment.timestamp) }}</span>
      </div>
      <div class="comment-content">
        {{ comment.content }}
      </div>

      <div v-if="comment.userId === currentUserId" class="comment-actions">
        <button @click="startEdit(comment)" title="Редактировать">✏️</button>
        <button @click="removeComment(comment.id)" title="Удалить">🗑️</button>
      </div>
    </div>

    <!-- Форма добавления / редактирования -->
    <div class="add-comment">
      <textarea
        v-model="newCommentContent"
        :placeholder="editingId ? 'Измените комментарий...' : 'Напишите комментарий...'"
        rows="3"
      ></textarea>
      <div class="form-buttons">
        <button v-if="editingId" @click="cancelEdit" class="btn-cancel">
          Отмена
        </button>
        <button @click="submitComment" :disabled="!newCommentContent.trim()">
          {{ editingId ? 'Сохранить' : 'Отправить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CommentService from '@/services/CommentService';

export default {
  name: 'TaskComments',
  props: {
    taskId: {
      type: Number,
      required: true
    },
    currentUserId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const comments = ref([]);
    const newCommentContent = ref('');
    const editingId = ref(null);

    const loadComments = async () => {
      try {
        const response = await CommentService.getCommentsByTask(props.taskId);
        comments.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
      }
    };

    const submitComment = async () => {
      if (!newCommentContent.value.trim()) return;

      try {
        if (editingId.value) {
          await CommentService.updateComment(editingId.value, newCommentContent.value);
          await loadComments();
          cancelEdit();
        } else {
          await CommentService.createComment({
            taskId: props.taskId,
            userId: props.currentUserId,
            content: newCommentContent.value
          });
          await loadComments();
          newCommentContent.value = '';
        }
      } catch (error) {
        console.error('Ошибка при отправке комментария:', error);
      }
    };

    const startEdit = (comment) => {
      editingId.value = comment.id;
      newCommentContent.value = comment.content;
    };

    const cancelEdit = () => {
      editingId.value = null;
      newCommentContent.value = '';
    };

    const removeComment = async (id) => {
      if (!confirm('Вы уверены, что хотите удалить комментарий?')) return;
      try {
        await CommentService.deleteComment(id);
        comments.value = comments.value.filter(c => c.id !== id);
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    onMounted(() => {
      loadComments();
    });

    return {
      comments,
      newCommentContent,
      editingId,
      submitComment,
      startEdit,
      cancelEdit,
      removeComment,
      formatDate
    };
  }
};
</script>

<style scoped>
</style>