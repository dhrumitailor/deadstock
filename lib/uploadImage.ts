// lib/uploadImage.ts
import { supabase } from './supabase'

export const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

    return data.publicUrl
}