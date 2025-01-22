import CustomButton from "../atoms/custom-button";
import CustomInput from "../atoms/custom-input";
import CustomSelect from "../atoms/custom-select";
import TinyMCE from "../atoms/tiny-mce";
import CustomForm from "../molecules/custom-form";
import ImageGallery from "./image-gallery";
import VideoGallery from "./video-gallery";

export default function WorkForm({work, handleSubmit, handleInputChange, loading=false}) {
    return (
        <CustomForm onSubmit={() => handleSubmit()}>
            <CustomInput
                label={'Nombre *'}
                name={'name'}
                value={work.name}
                onChange={(e) => handleInputChange(e)}
            />
            <CustomInput
                type="textarea"
                name={'shortDescription'}
                label={'Descripción corta'}
                value={work.shortDescription}
                onChange={(e) => handleInputChange(e)}
            />
            <TinyMCE
                label={'Descripción'}
                name={"description"}
                value={work.description}
                onChange={(e) => handleInputChange(e, false)}
            />
            <ImageGallery images={work.images}/>
        
            <VideoGallery videos={work.videos}/>
            <div className="flex justify-between space-x-8">
                <CustomSelect
                    name={'type'}
                    label={'Tipo'}
                    value={work.type}
                    options={[
                        {value: 'work', text: 'Trabajo'},
                        {value: 'author', text: 'Autor'},
                    ]}
                />
                <CustomInput
                    label={'Slug'}
                    name={'slug'}
                    value={work.slug}
                    onChange={(e) => handleInputChange(e)}
                    disabled={true}
                />
            </div>
            <div className="flex justify-between space-x-8">
                <CustomInput
                    type="date"
                    label={'Fecha'}
                    name={'date'}
                    value={work.date}
                    onChange={(e) => handleInputChange(e)}
                />
                <div className="w-full"></div>
            </div>
            <div className="w-full flex justify-center my-4">
                <CustomButton 
                    onClick={handleSubmit} 
                    text={'Guardar'} 
                    loading={loading}
                />
            </div>
        </CustomForm>
    )
}