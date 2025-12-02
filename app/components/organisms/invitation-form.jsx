import { useState } from "react";
import CustomButton from "../atoms/custom-button";
import CustomInput from "../atoms/custom-input";
import CustomForm from "../molecules/custom-form";
import TinyMCE from "../atoms/tiny-mce";

export default function InvitationForm({invitation, handleSubmit, handleInputChange}) {
    const [type, setType] = useState('url');

    return (
        <CustomForm onSubmit={() => handleSubmit()}>
            <CustomInput
                label={'Título'}
                name={'title'}
                value={invitation.title}
                onChange={(e) => handleInputChange(e)}
            />
            <CustomInput
                label={'Elija el contenido para la Invitación'}
                type="radio"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                    {label: 'URL', value:'url'},
                    {label: 'HTML', value:'html'},
                ]}
            />
            {
                type === 'url' ? (
                    <CustomInput
                        label={'URL'}
                        name={'url'}
                        value={invitation.url}
                        onChange={(e) => handleInputChange(e)}
                    />
                ):(
                    // <CustomInput
                    //     type="textarea"
                    //     name={'html'}
                    //     label={'Contenido HTML'}
                    //     value={invitation.html}
                    //     onChange={(e) => handleInputChange(e)}
                    // />
                    <TinyMCE
                        label={'Contenido HTML'}
                        name={'html'}
                        value={invitation.html}
                        onChange={(e) => handleInputChange(e, false)}
                    />
                )
            }
            <CustomInput
                label={'Slug'}
                name={'slug'}
                value={invitation.slug}
                onChange={(e) => handleInputChange(e)}
                disabled={true}
            />
            
            <div className="w-full flex justify-center my-4">
                <CustomButton onClick={handleSubmit} text={'Guardar'} />
            </div>
        </CustomForm>
    )
}