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
      if (state.community_posts.some((p) => p.id === action.payload.id))
        return state;

      return {
        ...state,
        community_posts: [action.payload, ...state.community_posts],
      };
    case TOOGLE_REACTION_POST_COMMUNITY:
      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (post.id !== action.payload.postId) return post;

          const likedByMe = !post.likedByMe;

          return {
            ...post,
            likedByMe,
            likesCount: likedByMe
              ? (post.likesCount || 0) + 1
              : Math.max((post.likesCount || 1) - 1, 0),
          };
        }),
      };

    case CREATE_COMMENT_POST_COMMUNITY: {
      const { postId, comment, replaceTemp } = action.payload;

      return {
        ...state,
        community_posts: state.community_posts.map((post) => {
          if (post.id !== postId) return post;

          let comments = post.comments || [];
          let commentsCount = post.commentsCount || 0;

          // 🔁 Reemplazo de comentario optimista
          if (replaceTemp) {
            comments = comments.filter((c) => c.id !== replaceTemp);
            // ❗ NO sumamos contador aquí
          } else {
            // 🆕 Comentario nuevo real-time u optimistic
            commentsCount += 1;
          }

          // ⛔ Evitar duplicados
          if (comments.some((c) => c.id === comment.id)) {
            return post;
          }

          return {
            ...post,
            comments: [...comments, comment],
            commentsCount,
          };
        }),
      };
    }

    case REMOVE_OPTIMISTIC_COMMENT:
      return {
        ...state,
        community_posts: state.community_posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (c) => c.id !== action.payload.tempId
                ),
                commentsCount:
                  post.commentsCount > 0 ? post.commentsCount - 1 : 0,
              }
            : post
        ),
      };

    default:
      return state;
  }
};
