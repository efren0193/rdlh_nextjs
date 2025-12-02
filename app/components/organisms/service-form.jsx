import CustomForm from "@/app/components/molecules/custom-form";
import CustomInput from "@/app/components/atoms/custom-input";
import TinyMCE from "@/app/components/atoms/tiny-mce";
import ImageGallery from "./image-gallery";
import VideoGallery from "./video-gallery";
import CustomButton from "@/app/components/atoms/custom-button";    
import IconPicker from "@/app/components/atoms/icon-picker";

export default function ServiceForm({
    service, 
    handleSubmit, 
    handleInputChange, 
    handleUpload, 
    loading=false, 
    loadingImgUpdate=false,
    loadingImgDelete=false,
    onImgDelete,
}) {
    
    return (
        <CustomForm onSubmit={() => handleSubmit()}>
            <CustomInput
                label={'Nombre *'}
                name={'name'}
                value={service.name}
                onChange={(e) => handleInputChange(e)}
            />
             <IconPicker
                label={'Icono'}
                name={'icon'}
                value={service.icon}
                onChange={(e) => handleInputChange(e)}
            />
            <CustomInput
                type="textarea"
                name={'shortDescription'}
                label={'Descripción Corta *'}
                value={service.shortDescription}
                onChange={(e) => handleInputChange(e)}
            />
            <TinyMCE
                label={'Descripción'}
                name={'description'}
                value={service.description}
                onChange={(e) => handleInputChange(e, false)}
            />

            <ImageGallery 
                images={service.images} 
                onUpload={handleUpload} 
                loading={loadingImgUpdate}
                onImgDelete={onImgDelete}
                loadingDelete={loadingImgDelete}
            />

            <VideoGallery videos={service.videos}/>

            <CustomInput
                label={'Slug'}
                name={'slug'}
                value={service.slug}
                onChange={(e) => handleInputChange(e)}
                disabled={true}
            />
            
            <div className="w-full flex justify-center my-4">
                <CustomButton onClick={handleSubmit} loading={loading} text={'Guardar'} />
            </div>
        </CustomForm>
    )
}   