import {
  GET_POSTS_COMMUNITY,
  CREATE_POST_COMMUNITY,
  CREATE_COMMENT_POST_COMMUNITY,
  REMOVE_OPTIMISTIC_COMMENT,
  TOOGLE_REACTION_POST_COMMUNITY,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS_COMMUNITY:
      return {
        ...state,
        community_posts: action.payload.community_posts,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case CREATE_POST_COMMUNITY:
      return {
        ...state,
        community_posts: [action.payload, ...state.community_posts],
      };
    case TOOGLE_REACTION_POST_COMMUNITY:
      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (post.id !== action.payload.postId) return post;

          // Si viene 'liked' en el payload (desde socket), usamos ese valor.
          // Si NO viene (clic optimista), invertimos el que ya tenemos.
          const isSocketUpdate = typeof action.payload.liked !== "undefined";
          const newLikedByMe = isSocketUpdate
            ? action.payload.liked
            : !post.likedByMe;

          // Solo sumamos/restamos si el estado realmente cambió
          if (newLikedByMe === post.likedByMe && isSocketUpdate) return post;

          return {
            ...post,
            likedByMe: newLikedByMe,
            likesCount: newLikedByMe
              ? (post.likesCount || 0) +
                (isSocketUpdate && post.likedByMe ? 0 : 1)
              : Math.max(
                  (post.likesCount || 0) -
                    (isSocketUpdate && !post.likedByMe ? 0 : 1),
                  0,
                ),
          };
        }),
      };
    case CREATE_COMMENT_POST_COMMUNITY:
      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (post.id !== action.payload.postId) return post;

          let newComments;
          if (action.payload.replaceTemp) {
            // Reemplazar comentario temporal con el real de la DB
            newComments = post.comments.map((c) =>
              c.id === action.payload.replaceTemp ? action.payload.comment : c,
            );
          } else {
            // Evitar duplicados si el socket llega antes que la respuesta de la API
            const exists = post.comments?.find(
              (c) => c.id === action.payload.comment.id,
            );
            newComments = exists
              ? post.comments
              : [...(post.comments || []), action.payload.comment];
          }

          return {
            ...post,
            comments: newComments,
            commentsCount: action.payload.replaceTemp
              ? post.commentsCount
              : (post.commentsCount || 0) + 1,
          };
        }),
      };

    case REMOVE_OPTIMISTIC_COMMENT:
      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (post.id !== action.payload.postId) return post;
          return {
            ...post,
            comments: post.comments.filter(
              (c) => c.id !== action.payload.tempId,
            ),
            commentsCount: Math.max((post.commentsCount || 1) - 1, 0),
          };
        }),
      };
    default:
      return state;
  }
};
