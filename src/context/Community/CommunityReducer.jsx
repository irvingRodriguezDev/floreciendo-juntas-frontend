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
      // 1. Verificamos si el post ya existe en el estado (por ID)
      const exists = state.community_posts.some(
        (p) => p.id === action.payload.id,
      );

      // 2. Si ya existe, no hacemos nada, devolvemos el estado actual
      if (exists) return state;

      // 3. Si es nuevo, lo agregamos arriba
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
          const { comment, replaceTemp } = action.payload;

          if (replaceTemp) {
            // 1. REEMPLAZO: El usuario actual ve su comentario temporal convertirse en real
            newComments = (post.comments || []).map((c) =>
              c.id === replaceTemp ? comment : c,
            );
          } else {
            // 2. SOCKET / OTROS: Verificamos si ya existe por ID
            const exists = post.comments?.some((c) => c.id === comment.id);
            if (exists) return post;

            // 3. ORDEN: Insertamos al principio (o al final, según tu diseño)
            // Usualmente: [nuevo, ...viejos]
            newComments = [comment, ...(post.comments || [])];
          }

          return {
            ...post,
            comments: newComments,
            // Solo aumentamos el contador si no es un reemplazo de uno que ya sumamos
            commentsCount: replaceTemp
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
