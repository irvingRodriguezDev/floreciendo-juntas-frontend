import { useReducer } from "react";
import StoriesReducer from "./StoriesReducer";
import StoriesContext from "./StoriesContext";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  ADD_STORY_CONTENT,
  GET_FEED_STORIES,
  MARK_STORY_AS_VIEWED,
  MARK_ALL_STORIES_AS_VIEWED,
} from "../../types";
import { alerts } from "../../utils/Alerts";
import Swal from "sweetalert2";
import clienteAxios from "../../config/Axios";

const StoriesState = ({ children }) => {
  const initialState = {
    stories: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(StoriesReducer, initialState);

  const getFeedStories = () => {
    let url = "/stories/feed";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_FEED_STORIES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error, "hubo un problema al consultar las historias");
      });
  };

  const addStoriContent = (selectedFile, caption, mediaType) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);
    formData.append("mediaType", mediaType);
    let url = "/stories";
    alerts.loading(
      "Subiendo Contenido",
      "El contenido se esta cargando. Por favor no actualices ni abandones la pagina, hasta completar el proceso!",
    );
    clienteAxios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({
          type: ADD_STORY_CONTENT,
          payload: res.data,
        });
        alerts.success("Correcto", "¡Tu historia se publicó correctamente!");
        getFeedStories();
      })
      .catch((error) => {
        alerts.error(
          "Upps, hubo un problema",
          "No se logró subir tu historia, intenta de nuevo",
        );
        console.error(error, "hubo un error al subir tu historia");
      });
  };

  const markStoriAsViwed = async (storyId, userId) => {
    // 1. Actualización optimista en React Reducer
    dispatch({
      type: MARK_STORY_AS_VIEWED,
      payload: { storyId, userId },
    });

    // 2. (Opcional) Notificar a la API
    // MethodPost('/stories/view', { storyId }).catch(console.error);
  };

  const markAllStoriesAsViewed = async (userId) => {
    dispatch({
      type: MARK_ALL_STORIES_AS_VIEWED,
      payload: { userId },
    });

    // 2. (Opcional) Notificar a la API
    // MethodPost('/stories/view-all', { userId }).catch(console.error);
  };

  return (
    <StoriesContext.Provider
      value={{
        stories: state.stories,
        loading: state.loading,
        getFeedStories,
        addStoriContent,
        markStoriAsViwed,
        markAllStoriesAsViewed,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};

export default StoriesState;
