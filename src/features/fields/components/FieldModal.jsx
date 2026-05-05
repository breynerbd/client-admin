import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useFieldsStore } from "../../users/store/adminStore.js";

import { Spinner } from "@material-tailwind/react";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { useSaveField } from "../hooks/useSaveField.js";

export const FieldModal = ({ isOpen, onClose, field }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    const { saveField } = useSaveField();
    const loading = useFieldsStore((state) => state.loading);

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (field) {
                reset({
                    fieldName: field.fieldName,
                    fieldType: field.fieldType,
                    capacity: field.capacity,
                    pricePerHour: field.pricePerHour,
                    description: field.description,
                    image: field.image,
                });
                setPreview(field.image);
            } else {
                reset({
                    fieldName: "",
                    fieldType: "",
                    capacity: "",
                    pricePerHour: "",
                    description: ""
                });
                setPreview(null);
            }
        }
    }, [isOpen, field, reset]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "image" && value.image && value.image.length > 0) {
                // Solo si es un archivo nuevo (objeto File)
                if (value.image[0] instanceof File) {
                    setPreview(URL.createObjectURL(value.image[0]));
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        try {
            await saveField(data, field?._id);
            showSuccess(field ? "Campo actualizado exitosamente" : "Campo creado exitosamente");
            reset();
            setPreview(null);
            onClose();
        } catch (error) {
            showError("Error al guardar el campo");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{
                        background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                    }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {field ? "Editar Campo" : "Nuevo Campo"}
                    </h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Completa la información de la cancha
                    </p>
                </div>

                {/* FORM - El form envuelve todo el contenido scrollable */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">
                    <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">

                        {/* PREVIEW */}
                        <div className="flex justify-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <span className="text-gray-400 text-xs sm:text-sm">Sin imagen</span>
                                )}
                            </div>
                        </div>

                        {/* INPUTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del campo</label>
                                <input
                                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                    placeholder="Ej. Cancha Central"
                                    {...register("fieldName", { required: "El nombre es requerido" })}
                                />
                                {errors.fieldName && <p className="text-red-600 text-xs mt-1">{errors.fieldName.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Tipo de cancha</label>
                                <select
                                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 transition"
                                    {...register("fieldType", { required: "El tipo es requerido" })}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="SINTETICA">Sintética</option>
                                    <option value="CONCRETO">Concreto</option>
                                    <option value="NATURAL">Natural</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Capacidad</label>
                                <select
                                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 transition"
                                    {...register("capacity", { required: "La capacidad es requerida" })}
                                >
                                    <option value="">Seleccione capacidad</option>
                                    <option value="FUTBOL_5">Fútbol 5</option>
                                    <option value="FUTBOL_7">Fútbol 7</option>
                                    <option value="FUTBOL_11">Fútbol 11</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Precio por hora</label>
                                <input
                                    placeholder="Q100.00"
                                    type="number"
                                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 transition"
                                    {...register("pricePerHour", { required: "Requerido", min: 1 })}
                                />
                            </div>

                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    placeholder="¡Describe tu cancha!"
                                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 transition"
                                    {...register("description", { required: "La descripción es requerida" })}
                                />
                            </div>

                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Imagen</label>
                                <input
                                    type="file"
                                    className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer"
                                    accept="image/*"
                                    {...register("image")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* FOOTER - Botones dentro del form pero fuera del div scrollable */}
                    <div className="p-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => { reset(); setPreview(null); onClose(); }}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg text-white font-medium shadow-md flex items-center justify-center min-w-[120px]"
                            style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                        >
                            {loading ? <Spinner className="h-5 w-5" /> : (field ? "Guardar cambios" : "Crear campo")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};