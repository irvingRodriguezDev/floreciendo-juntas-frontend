import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  GET_REACTIONS_SUMMARY_MULTIPLE,
  SET_POSTS,
  SET_SOCKET,
  UPDATE_REACTIONS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...(post.comments || []), action.payload.comment],
              }
            : post
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.comments.some((c) => c.id === action.payload) // si tiene el comentario a eliminar
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== action.payload
                ),
              }
            : post
        ),
      };
    case UPDATE_REACTIONS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, reactions: action.payload.reactions }
            : post
        ),
      };
    case GET_REACTIONS_SUMMARY_MULTIPLE:
      return {
        ...state,
        posts: state.posts.map((post) => ({
          ...post,
          reactionsSummary: action.payload[post.id] || {},
          userReaction: post.userReaction || null, // opcional si manejas reacción del usuario
        })),
      };
    default:
      return state;
  }
};
