import { create } from "zustand";
import {
  getFields as getFieldsRequest,
  createField as createFieldRequest,
  updateField as _updateFieldRequest,
  deleteField as _deleteFieldRequest,
  getAllReservations as getAllReservationsRequest,
  confirmReservation as confirmReservationRequest,
} from "../../../shared/api";

export const useFieldsStore = create((set, get) => ({
  fields: [],
  reservations: [],
  loading: false,
  error: null,

  getFields: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getFieldsRequest();

      set({
        fields: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener canchas",
        loading: false,
      });
    }
  },

  createField: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await createFieldRequest(formData);

      set({
        fields: [response.data.data, ...get().fields],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear campo",
      });
    }
  },

  deleteField: async (id) => {
    try {
      set({ loading: true, error: null });

      // Llamamos a la API
      await _deleteFieldRequest(id);

      // Actualizamos el estado para eliminar la cancha de la lista local
      set((state) => ({
        fields: state.fields.filter((field) => field._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar la cancha",
        loading: false,
      });
    }
  },

  updateField: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      const response = await _updateFieldRequest(id, formData);

      set((state) => ({
        fields: state.fields.map((field) =>
          field._id === id ? response.data.data : field
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar la cancha",
        loading: false,
      });
    }
  },

  getAllReservations: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllReservationsRequest();
      set({
        reservations: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },

  confirmReservation: async (id) => {
    try {
      set({ loading: true, error: null });
      await confirmReservationRequest(id);
      // Refrescar lista después de confirmar
      await get().getAllReservations();
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al confirmar reservación",
        loading: false,
      });
    }
  },
}));
