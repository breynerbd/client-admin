import { create } from "zustand";

export const useUIStore = create((set) => ({
    modal: null,
    confirm: null,

    OpenModal: (tittle, message, onClose) => set(
        {
            modal: { tittle, message, onClose}
        }
    ),

    CloseModal: ()=> set({modal: null}),

    openConfirm: (tittle, message, onConfirm, onClose)=> set({
        confirm: {tittle, message, onConfirm, onCancel}
    }),

    closeConfirm: ()=> set({confirm: null})
}));