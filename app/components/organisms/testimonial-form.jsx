import CustomButton from "../atoms/custom-button";
import CustomInput from "../atoms/custom-input";
import CustomForm from "../molecules/custom-form";

export default function TestimonialForm({testimonial, handleSubmit, handleInputChange}) {
    return (
        <CustomForm onSubmit={() => handleSubmit()}>
            <CustomInput
                label={'Autor'}
                name={'autor'}
                value={testimonial.autor}
                onChange={(e) => handleInputChange(e)}
            />
            <CustomInput
                type="textarea"
                name={'testimonio'}
                label={'Testimonio'}
                value={testimonial.testimonio}
                onChange={(e) => handleInputChange(e)}
            />
            <div className="w-full flex justify-center my-4">
                <CustomButton onClick={handleSubmit} text={'Guardar'} />
            </div>
        </CustomForm>
    )
}