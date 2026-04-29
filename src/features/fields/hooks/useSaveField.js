import { useFieldStore } from "../../users/store/adminStore";

export const useSaveField = ()=> {
    
    //Recuperación de funciones para el hook
    const createFeld = useFieldStore((state)=>state.createField);
    const updateField = useFieldStore((state)=>state.updateField);

    const saveField = async (data, fieldId = null) => {
        const formData = new FormData();

        formData.append("fieldName", data.fieldName);
        formData.append("fieldType", data.fieldType);
        formData.append("capacity", data.capacity);
        formData.append("pricePerHour", data.pricePerHour);
        formData.append("description", data.description);

        if(data.photo?.length){
            formData.append("image", data.photo[0]);
        }

        if(fieldId){
            await updateField(fieldId, formData);
        } else {
            await createFeld(formData);
        }
    }

    return { saveField };
} 