import {
  CREATE_COMMENT_POST_COMMUNITY,
  CREATE_POST_COMMUNITY,
  GET_POSTS_COMMUNITY,
  REMOVE_OPTIMISTIC_COMMENT,
  TOGGLE_COMMENT_LIKE_COMMUNITY,
  TOOGLE_REACTION_POST_COMMUNITY,
} from "../../types";

const CommunityReducer = (state, action) => {
  switch (action.type) {
    //esta caso obtiene el feed de la comunidad
    case GET_POSTS_COMMUNITY: {
      const { community_posts, currentPage, totalPages } = action.payload;

      return {
        ...state,
        // 🔥 Si es la página 1, reemplazamos el array. Si es página > 1, concatenamos.
        community_posts:
          currentPage === 1
            ? community_posts
            : [...state.community_posts, ...community_posts],
        currentPage,
        totalPages,
      };
    }
    //este caso se ejecuta cuando se crea un nuevo post en la comunidad
    case CREATE_POST_COMMUNITY:
      return {
        ...state,
        community_posts: [action.payload, ...state.community_posts],
      };
    // Este caso se ejecuta cuando alguien comenta un post
    case CREATE_COMMENT_POST_COMMUNITY: {
      const { postId, comment, parentId, replaceTemp } = action.payload;

      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if ((post.id || post._id) !== postId) return post;

          let updatedComments = [...(post.comments || [])];

          if (parentId) {
            updatedComments = updatedComments.map((parentComm) => {
              if ((parentComm.id || parentComm._id) !== parentId)
                return parentComm;

              let updatedReplies = [...(parentComm.replies || [])];

              if (replaceTemp) {
                updatedReplies = updatedReplies.map((r) =>
                  r.id === replaceTemp ? comment : r,
                );
              } else {
                updatedReplies.push(comment);
              }

              return { ...parentComm, replies: updatedReplies };
            });
          } else {
            if (replaceTemp) {
              updatedComments = updatedComments.map((c) =>
                c.id === replaceTemp ? comment : c,
              );
            } else {
              updatedComments.push(comment);
            }
          }

          return {
            ...post,
            comments: updatedComments,
            commentsCount: (post.commentsCount || 0) + 1,
          };
        }),
      };
    }
    //este caso es la simulacion de un comentario
    case REMOVE_OPTIMISTIC_COMMENT: {
      const { postId, tempId, parentId } = action.payload;

      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if ((post.id || post._id) !== postId) return post;

          let updatedComments = [...(post.comments || [])];

          if (parentId) {
            updatedComments = updatedComments.map((parentComm) => {
              if ((parentComm.id || parentComm._id) !== parentId)
                return parentComm;
              return {
                ...parentComm,
                replies: (parentComm.replies || []).filter(
                  (r) => r.id !== tempId,
                ),
              };
            });
          } else {
            updatedComments = updatedComments.filter((c) => c.id !== tempId);
          }

          return {
            ...post,
            comments: updatedComments,
            commentsCount: Math.max(0, (post.commentsCount || 1) - 1),
          };
        }),
      };
    }
    //este es el caso de las reacciones
    case TOOGLE_REACTION_POST_COMMUNITY: {
      const { postId, likesCount, isLikedByMe, likedByMe, userId } =
        action.payload;

      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          // Normalización de IDs a String para evitar fallos de tipo (Int vs String)
          if (String(post.id || post._id) !== String(postId)) return post;

          // Si el evento viene del socket de OTRO usuario, actualizamos solo el conteo total
          const isMyOwnAction = userId
            ? String(userId) === String(state.currentUserId)
            : true;
          const newIsLiked = isMyOwnAction
            ? (isLikedByMe ?? likedByMe ?? !post.isLikedByMe)
            : (post.isLikedByMe ?? post.likedByMe);

          return {
            ...post,
            isLikedByMe: newIsLiked,
            likedByMe: newIsLiked,
            // Si el payload trae likesCount del backend (Socket), lo usamos directamente.
            // Si no, incrementamos/decrementamos manualmente.
            likesCount:
              typeof likesCount === "number"
                ? likesCount
                : newIsLiked
                  ? post.likesCount + 1
                  : post.likesCount - 1,
          };
        }),
      };
    }
    // Nuevo caso para actualizar likes de comentarios recibidos por Sockets
    case TOGGLE_COMMENT_LIKE_COMMUNITY: {
      const { postId, commentId, likesCount, parentId } = action.payload;

      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (String(post.id || post._id) !== String(postId)) return post;

          const updatedComments = (post.comments || []).map((parentComm) => {
            // Si es una respuesta dentro de un comentario padre
            if (
              parentId &&
              String(parentComm.id || parentComm._id) === String(parentId)
            ) {
              const updatedReplies = (parentComm.replies || []).map((reply) => {
                if (String(reply.id || reply._id) === String(commentId)) {
                  return { ...reply, likesCount };
                }
                return reply;
              });
              return { ...parentComm, replies: updatedReplies };
            }

            // Si es un comentario principal
            if (String(parentComm.id || parentComm._id) === String(commentId)) {
              return { ...parentComm, likesCount };
            }

            return parentComm;
          });

          return {
            ...post,
            comments: updatedComments,
          };
        }),
      };
    }
    default:
      return state;
  }
};

export default CommunityReducer;
