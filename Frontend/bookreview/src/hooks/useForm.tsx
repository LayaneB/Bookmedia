import { useState } from 'react'

export const useForm = (initialState: any) => {

    const [form, setForm] = useState(initialState)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target
        if (type === 'checkbox') {
            setForm({ ...form, [name]: checked })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const cleanAllFields = () => {
        setForm(initialState)
    }

    const cleanField = (form: any, field: string) => {
        setForm({ ...form, [field]: '' })
    }

    return [form, onChange, cleanAllFields, cleanField]

}