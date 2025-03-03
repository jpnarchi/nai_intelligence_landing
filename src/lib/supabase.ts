import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContactForm(formData: ContactFormData) {
  try {
    console.log('Enviando datos a Supabase:', formData);
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }
      ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    console.log('Datos enviados correctamente:', data);
    return data;
  } catch (error) {
    console.error('Supabase request failed', error);
    throw error;
  }
}