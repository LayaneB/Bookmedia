import { useState } from 'react';

export const useForm = (initialState: any) => {

    const [form, setForm] = useState(initialState)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, type} = event.target
        if(type === 'checkbox'){   
            setForm({...form, [name]:checked})
        } else {
            setForm({...form, [name]:value})
        }
    }

    const cleanFields = (field:string) => {
        setForm({...form, [field]:''})
    }
    const cleanAllFields = () => {
        setForm(initialState)
    }

    return [form, onChange, cleanFields, cleanAllFields]

}