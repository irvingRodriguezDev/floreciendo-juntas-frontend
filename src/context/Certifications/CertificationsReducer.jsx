import {
  GET_CERTIFICATIONS_AVAILABLE,
  SEND_ENTREGABLE,
  SHOW_CERTIFICATION_DETAILS,
} from "../../types";

export default function CertificationsReducer(state, action) {
  switch (action.type) {
    case GET_CERTIFICATIONS_AVAILABLE:
      return {
        ...state,
        certifications: action.payload,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case SHOW_CERTIFICATION_DETAILS:
      return {
        ...state,
        certification: action.payload,
      };
    case SEND_ENTREGABLE:
      return {
        ...state,
        certification: {
          ...state.certification,
          modules: state.certification?.modules.map((module) =>
            module.id === action.payload.moduleId
              ? {
                  ...module,
                  status: action.payload.status, // "submitted"
                  submission: action.payload, // opcional (guardar info completa)
                }
              : module,
          ),
        },
      };

    default:
      return state;
  }
}
